import _ from "lodash";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { DatabaseSource } from "src/database/interface/database.interface";
import { Like, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { IPagination } from "src/common/interface/pagination.interface";
import { UpdateUserDto } from "./dto/update-user.dto";
import { FindUsersDto } from "./dto/find-user.dto";
import { FindFilterOption } from "src/common/type/typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity, DatabaseSource.Primary) private userRepository: Repository<UserEntity>,
    ) { }

    async create(createDto: CreateUserDto): Promise<UserEntity> {
        const user = await this.userRepository.create(createDto);
        
        return await this.userRepository.save(user);
    }

    async findAll({ username, limit, page }: FindUsersDto, mergeCondition: boolean = false): Promise<IPagination<UserEntity>> {
        let where: FindFilterOption<UserEntity> = [
            (username) ?
                { username: Like(username) }
                : null,
        ].filter(condition => !!condition);
        where = mergeCondition ? [where.reduce((previous, current) => _.merge(previous, current))] : where;

        const users = await this.userRepository.find({
            where,
            skip: (page - 1) * limit,
            take: limit,
        });
        const usersCount = await this.userRepository.count({ where });

        return {
            items: users,
            limit: limit,
            page: page,
            total: Math.ceil(usersCount / limit),
        };
    }

    async findOne(filter: FindFilterOption<UserEntity>, exception: boolean = false): Promise<UserEntity> {
        const user = await this.userRepository.findOne({ where: filter });

        if (exception && !user) {
            throw new NotFoundException('user.invalid-user');
        }

        return user;
    }

    async findById(id: string, exception: boolean = false): Promise<UserEntity> {
        const user = await this.userRepository.findOneBy({ id });

        if (exception && !user) {
            throw new NotFoundException('user.invalid-user');
        }

        return user;
    }

    async update(id: string, updateDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.findById(id, true);

        Object.assign(user, updateDto);

        return await this.userRepository.save(user);
    }

    async remove(id: string): Promise<UserEntity> {
        const user = await this.findById(id);

        return await this.userRepository.remove(user);
    }
}