import {DataSource} from "typeorm";
import {DataBase} from "@/src/main/database";
import MainLogger from "@/src/main/logger";

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

    public init() {
        this.databaseInit();

    }
}

const WikiDatabase = new WikiService();
export default WikiDatabase;
