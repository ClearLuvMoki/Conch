import {DataSource} from "typeorm";
import {DataBase} from "@/src/main/database";
import MainLogger from "@/src/main/logger";
import {WikiEntity} from "@/src/main/database/Wiki/wiki.entity";
import {IpcResults, IpcResultsCode} from "@/types/ipc";
import {ipcMain} from "electron";
import IpcChannels from "@/src/common/IpcChannels";

class WikiService {
    dataSource: DataSource;

    constructor() {
        this.dataSource = new DataBase("wiki").dataSource;
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
        ipcMain.handle(IpcChannels.wiki.get_all_wiki_user, (_, { userId }) => {
            return this.getAllWikisByUserId(userId);
        })
    }
}

const WikiDatabase = new WikiService();
export default WikiDatabase;
