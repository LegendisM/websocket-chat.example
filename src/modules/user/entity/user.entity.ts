import { RoleEntity } from "src/modules/policy/entity/role.entity";
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

    @Column()
    password: string;

    @ManyToMany(() => RoleEntity, (role) => role.users, { eager: true })
    @JoinTable()
    roles: RoleEntity[];
}