import { PermissionEntity } from "../entity/permission.entity";
import { RoleEntity } from "../entity/role.entity";
import { PolicyAction } from "../interface/policy.interface";

export const POLICY_PERMISSIONS_SEED: Omit<PermissionEntity, 'id' | 'roles'>[] = [
    {
        name: "Administrator",
        action: PolicyAction.Manage,
        subject: "all",
    },
];

export const POLICY_ROLES_SEED: (Pick<RoleEntity, 'name'> & { permissions: string[] })[] = [
    {
        name: "Administrator",
        permissions: ["Administrator"],
    },
];