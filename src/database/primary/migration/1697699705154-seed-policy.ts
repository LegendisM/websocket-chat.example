import { PermissionEntity } from "./../../../modules/policy/entity/permission.entity";
import { RoleEntity } from "./../../../modules/policy/entity/role.entity"
import { POLICY_PERMISSIONS_SEED, POLICY_ROLES_SEED } from "./../../../modules/policy/seed/policy.seed";
import { In, MigrationInterface, QueryRunner } from "typeorm"

export class SeedPolicy1697699705154 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const roleRepository = queryRunner.connection.getRepository(RoleEntity);
        const permissionRepository = queryRunner.connection.getRepository(PermissionEntity);
        const permissions = await permissionRepository.save(POLICY_PERMISSIONS_SEED);

        for (const { name, permissions: rolePermissions } of POLICY_ROLES_SEED) {
            const role = await roleRepository.save({ name });
            await roleRepository.createQueryBuilder()
                .relation(RoleEntity, "permissions")
                .of(role)
                .add(permissions.filter((permission) => rolePermissions.includes(permission.name)));
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const roleRepository = queryRunner.connection.getRepository(RoleEntity);
        const permissionRepository = queryRunner.connection.getRepository(PermissionEntity);
        await roleRepository.delete({ name: In(POLICY_ROLES_SEED.map(role => role.name)) });
        await permissionRepository.delete({ name: In(POLICY_PERMISSIONS_SEED.map(permission => permission.name)) });
    }

}