import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'user'
})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: '28' })
    username: string;

    @Column()
    password: string;
}