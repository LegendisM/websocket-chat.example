import { RoleEntity } from "./../../policy/entity/role.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'user',
})
export class UserEntity {
    static readonly modelName = "UserEntity";

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: '28' })
    username: string;

    @Column({ nullable: true })
    password?: string;

    @Column({ nullable: true })
    email?: string;

    @Column({ nullable: true })
    phone?: string;

    @Column({ nullable: true })
    avatar?: string;

    @ManyToMany(() => RoleEntity, (role) => role.users, { eager: true })
    @JoinTable()
    roles: RoleEntity[];
}