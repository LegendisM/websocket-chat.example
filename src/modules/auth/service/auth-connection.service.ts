import _ from "lodash";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthConnectionEntity } from "../entity/auth-connection.entity";
import { DatabaseSource } from "src/database/interface/database.interface";
import { Repository } from "typeorm";
import { CreateConnectionDto } from "../dto/create-connection.dto";
import { FindFilterOption } from "src/common/type/typeorm";

@Injectable()
export class AuthConnectionService {
    constructor(
        @InjectRepository(AuthConnectionEntity, DatabaseSource.Primary) private authConnectionRepository: Repository<AuthConnectionEntity>,
    ) { }

    async create(createDto: CreateConnectionDto): Promise<AuthConnectionEntity> {
        const connection = await this.authConnectionRepository.create(createDto);

        return await this.authConnectionRepository.save(connection);
    }

    async findOne(filter: FindFilterOption<AuthConnectionEntity>, exception: boolean = false): Promise<AuthConnectionEntity> {
        const connection = await this.authConnectionRepository.findOne({ where: filter });

        if (exception && !connection) {
            throw new NotFoundException('auth.invalid-connection');
        }

        return connection;
    }

    async findById(id: string, exception: boolean = false): Promise<AuthConnectionEntity> {
        const connection = await this.authConnectionRepository.findOneBy({ id });

        if (exception && !connection) {
            throw new NotFoundException('auth.invalid-connection');
        }

        return connection;
    }

    async findByUser(userId: string): Promise<AuthConnectionEntity[]> {
        return await this.authConnectionRepository.findBy({ user: { id: userId } });
    }

    async remove(id: string): Promise<AuthConnectionEntity> {
        const connection = await this.findById(id);

        return await this.authConnectionRepository.remove(connection);
    }
}