import { DynamicModule, Module } from "@nestjs/common";
import { PolicyFactory } from "./policy.factory";
import { PolicyService } from "./service/policy.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleEntity } from "./entity/role.entity";
import { DatabaseSource } from "src/database/interface/database.interface";
import { PermissionEntity } from "./entity/permission.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([RoleEntity, PermissionEntity], DatabaseSource.Primary),
    ],
    providers: [PolicyFactory, PolicyService],
    exports: [PolicyService],
})
export class PolicyModule { }