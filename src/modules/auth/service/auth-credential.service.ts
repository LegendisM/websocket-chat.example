import { Injectable } from "@nestjs/common";
import { AuthTokenService } from "./auth-token.service";
import { AuthAccountService } from "./auth-account.service";
import { IAuthToken } from "../interface/auth-token.interface";
import { CredentialSigninDto } from "../dto/signin-credential.dto";
import { CredentialSignupDto } from "../dto/signup-credential.dto";

@Injectable()
export class AuthCredentialService {
    constructor(
        private authAccountService: AuthAccountService,
        private authTokenService: AuthTokenService,
    ) { }

    async signup({ username, email, password }: CredentialSignupDto): Promise<IAuthToken[]> {
        const user = await this.authAccountService.create({ username, email, password });

        return await this.authTokenService.generate({
            id: user.id,
            username: user.username,
        });
    }

    async signin({ username, password }: CredentialSigninDto) {
        const user = await this.authAccountService.validate({ username, password });

        return await this.authTokenService.generate({
            id: user.id,
            username: user.username,
        });
    }
}