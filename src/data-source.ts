import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Certificate } from "./entity/Certificate"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Certificate],
    migrations: [],
    subscribers: [],
})
