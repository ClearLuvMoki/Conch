import {DataSource} from "typeorm";
import {DataBase} from "@/src/main/database";
import MainLogger from "../../logger";
import {validate} from "class-validator";
import to from "await-to-js";
import {ipcMain} from "electron";
import IpcChannels from "@/src/common/IpcChannels";
import {IpcResults, IpcResultsCode} from "@/types/ipc";
import {UserEntity} from "@/src/main/database/User/user.entity";


class UserService {
    dataSource: DataSource;

    constructor() {
        this.dataSource = new DataBase("user").dataSource;
    }

    public async databaseInit() {
        return new Promise((resolve, reject) => {
            try {
                if (!this.dataSource.isInitialized) {
                    this.dataSource.initialize();
                    resolve("初始化成功!");
                } else {
                    console.log()
                    resolve("已经初始化成功!")
                }
            } catch (e) {
                console.log("初始化失败!", e)
                reject(e)
            }
        })
    }

    public async getInfo() {
        this.databaseInit()
            .then((res) => {
                MainLogger.info(res)
            })
            .catch((e) => {
                MainLogger.error(JSON.stringify(e))
            })
    }

    public async addUser(user: UserEntity): Promise<IpcResults<any, string>> {
        return new Promise(async (resolve) => {
            try {
                await this.databaseInit();
                const data = new UserEntity();
                data.nickName = user?.nickName;
                data.password = user?.password;
                const [validateErr, validateRes] = await to(validate(data));
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
                const [findErr, findUsers] = await to(
                    this.dataSource
                        .createQueryBuilder(UserEntity, "user")
                        .getMany()
                );
                if (findErr) {
                    return resolve({
                        code: IpcResultsCode.error,
                        errMsg: JSON.stringify(findErr)
                    })
                }
                if (findUsers?.length > 3) {
                    return resolve({
                        code: IpcResultsCode.error,
                        errMsg: "本地账号数最多只能新建三个!"
                    })
                }

                const [saveUserErr, saveUserRes] = await to(this.dataSource.manager.save(data));
                if (saveUserErr) {
                    return resolve({
                        code: IpcResultsCode.error,
                        errMsg: JSON.stringify(saveUserErr)
                    })
                }
                return resolve({
                    code: IpcResultsCode.success,
                    data: JSON.stringify(saveUserRes)
                })
                this.dataSource.destroy()
            } catch (e) {
                MainLogger.error(JSON.stringify(e))
                return resolve({
                    code: IpcResultsCode.error,
                    errMsg: JSON.stringify(e)
                })
            }
        })
    }

    public async findAllAccounts() {
        return new Promise(async (resolve) => {
            const [findErr, findUsers] = await to(
                this.dataSource
                    .createQueryBuilder(UserEntity, "user")
                    .getMany()
            );
            if (findErr) {
                return resolve({
                    code: IpcResultsCode.error,
                    errMsg: JSON.stringify(findErr)
                })
            }
            return resolve({
                code: IpcResultsCode.success,
                data: findUsers || []
            })

        })
    }


    public init() {
        this.databaseInit();
        ipcMain.handle(IpcChannels.user.add_user, (_, user) => {
            return this.addUser(user);
        });
        ipcMain.handle(IpcChannels.user.find_all_user, (_) => {
            return this.findAllAccounts();
        })
    }
}

const UserDatabase = new UserService();
export default UserDatabase;
