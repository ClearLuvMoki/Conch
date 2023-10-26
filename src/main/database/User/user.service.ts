import {DataSource} from "typeorm";
import {DataBase} from "@/src/main/database";
import MainLogger from "../../logger";

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
                }
            } catch (e) {
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
        await this.init();
        this.dataSource.manager.save({
            name: "1212"
        })
            .then((res) => {
                MainLogger.info(res)
            })
            .catch((e) => {
                MainLogger.error(JSON.stringify(e))
            })
    }
}

const UserDatabase = new UserService();
export default UserDatabase;
