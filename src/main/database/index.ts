import {join} from "path";
import {DataSource} from "typeorm";
import {BetterSqlite3ConnectionOptions} from "typeorm/driver/better-sqlite3/BetterSqlite3ConnectionOptions";
import {app} from "electron";
import {UserModel} from "./User/user.model";


export class DataBase {
    dataSource: DataSource;

    //初始化数据库文件
    constructor(database: string) {
        let basePath = join(
            app.getPath("appData"),
            app.getName(),
            `./ConchDatabase/${database}.db`
        );
        let options: BetterSqlite3ConnectionOptions = {
            type: "better-sqlite3",
            entities: [UserModel],
            database: basePath,
            synchronize: true,
            logging: ["error"],
        };
        this.dataSource = new DataSource(options);
    }

}
