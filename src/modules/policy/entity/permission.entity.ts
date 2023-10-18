import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { PolicyAction, PolicySubject } from "../interface/policy.interface";
import { RoleEntity } from "./role.entity";

@Entity({
    name: 'permission',
})
export class PermissionEntity {
    static readonly modelName = "PermissionEntity";

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ enum: PolicyAction })
    action: PolicyAction;

    @Column()
    subject: PolicySubject;

    @ManyToMany(() => RoleEntity, (role) => role.permissions)
    roles: RoleEntity[];
}