import { Injectable } from "@nestjs/common";
import { UserEntity } from "../user/entity/user.entity";
import { AbilityBuilder, createMongoAbility } from "@casl/ability";
import { PolicyAbility } from "./interface/policy.interface";

@Injectable()
export class PolicyFactory {
    createUserAbility(user: UserEntity) {
        const { can, build } = new AbilityBuilder<PolicyAbility>(createMongoAbility);

        for (const { permissions } of user.roles) {
            for (const { action, subject } of permissions) {
                can(action, subject as any);
            }
        }

        return build();
    }
}