import { Exclude } from "class-transformer";
import { RoleEntity } from "./../../policy/entity/role.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AuthConnectionEntity } from "src/modules/auth/entity/auth-connection.entity";

@Entity({
    name: 'user',
})
export class UserEntity {
    static readonly modelName = "UserEntity";

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: '32', unique: true })
    username: string;

    @Column({ nullable: true })
    @Exclude()
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

    @OneToMany(() => AuthConnectionEntity, (authConnection) => authConnection.user)
    connections: AuthConnectionEntity[];
}