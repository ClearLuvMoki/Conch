import {DataSource} from "typeorm";
import {DataBase} from "@/src/main/database";
import MainLogger from "@/src/main/logger";
import {WikiEntity} from "@/src/main/database/Wiki/wiki.entity";
import {IpcResults, IpcResultsCode} from "@/types/ipc";
import {ipcMain} from "electron";
import IpcChannels from "@/src/common/IpcChannels";
import {nanoid} from "nanoid";
import to from "await-to-js";
import {validate} from "class-validator";

class WikiService {
    dataSource: DataSource;

    constructor() {
        this.dataSource = new DataBase("index").dataSource;
    }

    private async databaseInit() {
        return new Promise((resolve, reject) => {
            try {
                if (!this.dataSource.isInitialized) {
                    this.dataSource.initialize();
                    resolve("初始化成功!");
                } else {
                    resolve("已经初始化成功!")
                }
            } catch (e) {
                reject(e)
                MainLogger.error(`WikiDatabase 初始化失败: ${JSON.stringify(e)}`)
            }
        })
    }

    public async addWikiByUserId(userId: string, wikiData: WikiEntity): Promise<IpcResults<any, string>> {
        return new Promise(async (resolve) => {
            try {
                if (!userId) {
                    return resolve({
                        code: IpcResultsCode.error,
                        errMsg: "不存在该用户!"
                    })
                }

                const data = new WikiEntity();
                data.userId = userId;
                data.title = wikiData?.title;
                data.description = wikiData?.description;
                data.wikiId = nanoid();

                console.log(data, 'data')

                const [validateErr, validateRes] = await to(validate(data));
                console.log(validateRes, 'validateRes')
                if (validateErr) {
                    return resolve({
                        code: IpcResultsCode.error,
                        errMsg: JSON.stringify(validateErr)
                    })
                }
                if (validateRes?.length > 0) {
                    const err = validateRes[0];
                    const errMessage = Object.values(err.constraints)?.[0] || "未知错误!";
                    return resolve({
                        code: IpcResultsCode.error,
                        errMsg: errMessage
                    })
                }

                this.dataSource.manager.save(data)
                    .then(() => {
                        return resolve({
                            code: IpcResultsCode.success,
                        })
                    })
                    .catch((err) => {
                        return resolve({
                            code: IpcResultsCode.error,
                            errMsg: JSON.stringify(err)
                        })
                    })
                    .finally(() => {
                        this.dataSource.destroy()
                    })


            } catch (e) {
                return resolve({
                    code: IpcResultsCode.error,
                    errMsg: JSON.stringify(e)
                })
            }
        })
    }


    public async getAllWikisByUserId(userId: string): Promise<IpcResults<WikiEntity[], string>> {
        return new Promise(async (resolve) => {
            try {
                await this.databaseInit();
                this.dataSource
                    .createQueryBuilder(WikiEntity, "wiki")
                    .where("userId = :userId", {userId})
                    .getMany()
                    .then((data) => {
                        return resolve({
                            code: IpcResultsCode.success,
                            data
                        })
                    })
                    .catch((err) => {
                        return resolve({
                            code: IpcResultsCode.error,
                            errMsg: JSON.stringify(err)
                        })
                    })
            } catch (e) {
                return resolve({
                    code: IpcResultsCode.error,
                    errMsg: JSON.stringify(e)
                })
            }
        })
    }

    public init() {
        this.databaseInit();
        ipcMain.handle(IpcChannels.wiki.get_all_wiki_user, (_, {userId}) => {
            return this.getAllWikisByUserId(userId);
        })
        ipcMain.handle(IpcChannels.wiki.add_wiki_user, (_, {userId, wikiData}) => {
            console.log(wikiData, userId)
            return this.addWikiByUserId(userId, wikiData);
        })
    }
}

const WikiDatabase = new WikiService();
export default WikiDatabase;
