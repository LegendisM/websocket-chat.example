import { InferSubjects, PureAbility } from "@casl/ability";
import { UserEntity } from "src/modules/user/entity/user.entity";
import { RoleEntity } from "../entity/role.entity";
import { PermissionEntity } from "../entity/permission.entity";

export type PolicySubject = InferSubjects<typeof UserEntity | typeof RoleEntity | typeof PermissionEntity | "all", true>;

export enum PolicyAction {
    Create = "create",
    Read = "read",
    Update = "update",
    Delete = "delete",
    Manage = "manage",
}

export type PolicyAbility = PureAbility<[PolicyAction, PolicySubject]>;
