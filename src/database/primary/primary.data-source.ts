import { readFileSync } from "fs";
import { parse } from "dotenv";
import { DataSource } from "typeorm";
import { UserEntity } from "./../../modules/user/entity/user.entity";
import { RoleEntity } from "./../../modules/policy/entity/role.entity";
import { PermissionEntity } from "./../../modules/policy/entity/permission.entity";

const config = parse(readFileSync('.env'));

export const PrimaryDataSource = new DataSource({
    type: 'postgres',
    host: config.PRIMARY_DB_HOST,
    port: +config.PRIMARY_DB_PORT,
    database: config.PRIMARY_DB_NAME,
    username: config.PRIMARY_DB_USERNAME,
    password: config.PRIMARY_DB_PASSWORD,
    entities: [RoleEntity, PermissionEntity, UserEntity],
    synchronize: config.NODE_ENV == "development",
    migrations: [`${__dirname}/migration/*{.ts,.js}`],
});