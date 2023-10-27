import {DataSource} from "typeorm";
import {DataBase} from "@/src/main/database";
import MainLogger from "../../logger";
import {validate} from "class-validator";
import to from "await-to-js";
import {ipcMain} from "electron";
import IpcChannels from "@/src/common/IpcChannels";
import {IpcResults, IpcResultsCode} from "@/types/ipc";
import {UserEntity} from "@/src/main/database/User/user.entity";
import {UserDto} from "@/src/main/database/User/user.dto";


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

    public async addUser(user: UserDto): Promise<IpcResults<any, string>> {
        return new Promise(async (resolve) => {
            try {
                await this.databaseInit();
                const data = new UserDto();
                data.nickName = user?.nickName;
                data.password = user?.password;
                const [validateErr, validateRes] = await to(validate(data));
                if (validateErr) {
                    return resolve({
                        code: IpcResultsCode.error,
                        errMsg: JSON.stringify(validateErr)
                    })
                }
                console.log(data, validateErr, validateRes)
                if (validateRes?.length > 0) {
                    const err = validateRes[0];
                    const errMessage = Object.values(err.constraints)?.[0] || "未知错误!";
                    return resolve({
                        code: IpcResultsCode.error,
                        errMsg: errMessage
                    })
                }

                const $user = new UserEntity();
                $user.nickName = data?.nickName;
                $user.password = data?.password;
                const [saveUserErr, saveUserRes] = await to(this.dataSource.manager.save($user));
                if (saveUserErr) {
                    console.log(saveUserErr, 'saveUserErr')
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


    public init() {
        this.databaseInit();
        ipcMain.handle(IpcChannels.user.add_user, (_, user) => {
            return this.addUser(user);
        })
    }
}

const UserDatabase = new UserService();
export default UserDatabase;
