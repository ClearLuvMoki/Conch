import {DataSource} from "typeorm";
import {DataBase} from "@/src/main/database";
import MainLogger from "../../logger";
import {UserModel} from "./user.model";

class UserService {
    dataSource: DataSource;

    constructor() {
        this.dataSource = new DataBase("user").dataSource;
    }

    public async init() {
        return new Promise((resolve, reject) => {
            try {
                if (!this.dataSource.isInitialized) {
                    this.dataSource.initialize();
                    resolve("初始化成功!");
                }else {
                    resolve("已经初始化成功!")
                }
            } catch (e) {
                console.log("初始化失败!", e)
                reject(e)
            }
        })
    }

    public async getInfo() {
        this.init()
            .then((res) => {
                MainLogger.info(res)
            })
            .catch((e) => {
                MainLogger.error(JSON.stringify(e))
            })
    }

    public async addUser() {
        await this.dataSource.initialize();
        await this.init()
        const info = new UserModel();
        info.id = "121212";
        info.name = "232323";
        this.dataSource.manager.save(info)
            .then((res) => {
                MainLogger.info(JSON.stringify(res))
            })
            .catch((e) => {
                console.log(e, 'eeeeee')
                MainLogger.error(JSON.stringify(e))
            })
            .finally(() => {
                this.dataSource.destroy()
            })
    }
}

const UserDatabase = new UserService();
export default UserDatabase;
