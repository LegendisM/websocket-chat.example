import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { DatabaseSource } from "src/database/interface/database.interface";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity, DatabaseSource.Primary) private userRepository: Repository<UserEntity>,
    ) { }
}