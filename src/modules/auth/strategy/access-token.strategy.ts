import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserEntity } from "src/modules/user/entity/user.entity";
import { UserService } from "src/modules/user/user.service";
import { IAuthTokenPayload } from "../interface/auth-token.interface";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access-token') {
    constructor(
        private configService: ConfigService,
        private userService: UserService,
    ) {
        super({
            secretOrKey: configService.get<string>("ACCESS_TOKEN_SECRET"),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
        });
    }

    async validate(payload: IAuthTokenPayload): Promise<UserEntity> {
        const user = await this.userService.findById(payload.id);

        if (!user) {
            throw new UnauthorizedException('auth.unauthorized');
        }

        return user;
    }
}