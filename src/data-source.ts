import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/user";
import { UserInfo } from './entity/userInfo';

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "test",
    password: "Costa912",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User, UserInfo],
    migrations: [],
    subscribers: [],
    options: {
        encrypt: false
    }
});