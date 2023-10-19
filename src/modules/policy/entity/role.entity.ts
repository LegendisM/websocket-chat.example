import { UserEntity } from "./../../user/entity/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PermissionEntity } from "./permission.entity";

@Entity({
    name: 'role',
})
export class RoleEntity {
    static readonly modelName = "RoleEntity";

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => PermissionEntity, (permission) => permission.roles, { eager: true })
    @JoinTable()
    permissions: PermissionEntity[];

    @ManyToMany(() => UserEntity, (user) => user.roles)
    users: UserEntity[];
}