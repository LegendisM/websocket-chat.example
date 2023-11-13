import _ from "lodash";
import bcrypt from "bcrypt";
import { ConflictException, Injectable } from "@nestjs/common";
import { UserService } from "src/modules/user/user.service";
import { CreateAccountDto } from "../dto/create-account.dto";
import { AUTH_ACCOUNT_USERNAME_PREFIX } from "../constant/auth.constant";
import { UserEntity } from "src/modules/user/entity/user.entity";
import { ValidateAccountDto } from "../dto/validate-account.dto";

@Injectable()
export class AuthAccountService {
    constructor(
        private userService: UserService,
    ) { }

    async create(createDto: CreateAccountDto): Promise<UserEntity> {
        let { username, password, email, phone } = createDto;

        if (!username) {
            username = `${AUTH_ACCOUNT_USERNAME_PREFIX}${email.replace('@', '') ?? phone.replace('+', '')}${_.random(1, 9999)}`;
        } else {
            const user = await this.userService.findOne({ username });

            if (user) throw new ConflictException('auth.username-already-used');
        }

        if (password) {
            password = await bcrypt.hash(password, 6);
        }

        if (email) {
            const user = await this.userService.findOne({ email });

            if (user) throw new ConflictException('auth.email-already-used');
        }

        if (phone) {
            const user = await this.userService.findOne({ phone });

            if (user) throw new ConflictException('auth.phone-already-used');
        }

        return await this.userService.create({ username, password, email, phone });
    }

    async validate(validateDto: ValidateAccountDto): Promise<UserEntity> {
        const user = await this.userService.findOne({ ..._.omit(validateDto, ['password']) }, true);

        const { password } = validateDto;
        if (password) {
            const compared = user.password ? (await bcrypt.compare(password, user.password)) : false;

            if (!compared) throw new ConflictException('auth.invalid-password');
        }

        return user;
    }
}