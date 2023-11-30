import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuthConnectionProvider } from "../interface/auth-connection.interface";
import { UserEntity } from "src/modules/user/entity/user.entity";

@Entity({
    name: 'auth_connection',
})
export class AuthConnectionEntity {
    static readonly modelName = "AuthConnectionEntity";

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ enum: AuthConnectionProvider })
    provider: AuthConnectionProvider;

    @Column()
    providerId: string;

    @ManyToOne(() => UserEntity, (user) => user.connections, { onDelete: 'CASCADE' })
    user: UserEntity;

    @Column({ nullable: true })
    userId: string;
}