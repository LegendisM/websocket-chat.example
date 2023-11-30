import md5 from "md5";
import { Injectable } from "@nestjs/common";
import { AuthConnectionService } from "./auth-connection.service";
import { AuthTokenService } from "./auth-token.service";
import { IAuthToken } from "../interface/auth-token.interface";
import { IAuthConnectionCallbackInfo } from "../interface/auth-connection.interface";
import { AuthAccountService } from "./auth-account.service";
import { UserEntity } from "src/modules/user/entity/user.entity";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class AuthConnectionProviderService {
    constructor(
        private userService: UserService,
        private authAccountService: AuthAccountService,
        private authTokenService: AuthTokenService,
        private authConnectionService: AuthConnectionService,
    ) { }

    async process({ provider, providerId }: IAuthConnectionCallbackInfo): Promise<IAuthToken[]> {
        let connection = await this.authConnectionService.findOne({ provider, providerId });
        let user: UserEntity;

        if (!connection) {
            user = await this.authAccountService.create({ username: md5(`${provider}_${providerId}`) });
            connection = await this.authConnectionService.create({ provider, providerId, userId: user.id });
        } else {
            user = await this.userService.findById(connection.userId, true);
        }

        return await this.authTokenService.generate({
            id: user.id,
            username: user.username,
        });
    }
}