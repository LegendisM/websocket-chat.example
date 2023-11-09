import bcrypt from "bcrypt";
import { ConflictException, Injectable } from "@nestjs/common";
import { AuthSigninDto } from "../dto/auth-signin.dto";
import { AuthSignupDto } from "../dto/auth-signup.dto";
import { UserService } from "src/modules/user/user.service";
import { AuthTokenType, IAuthToken } from "../interface/auth-token.interface";
import { AuthTokenService } from "./auth-token.service";

@Injectable()
export class AuthCredentialService {
    constructor(
        private userService: UserService,
        private authTokenService: AuthTokenService,
    ) { }

    async signup({ username, email, password }: AuthSignupDto) {
        const exist = await this.userService.findOne([{ username }, { email }]);

        if (!exist) {
            // TODO: fix this section - its has been copy in another section, its must be move an a single auth-account service manager for dry rule
            // ! auth-account.service.ts -> create (with username(optional), email(optional), password(optional)), isExist(...args optional)
            const user = await this.userService.create({
                username,
                password: (await bcrypt.hash(password, 6)),
            });
            
            return await this.authTokenService.generate({
                id: user.id,
                username: user.username
            });
        } else {
            throw new ConflictException('auth.information-already-used');
        }
    }

    async signin({ username, password }: AuthSigninDto) { }
}