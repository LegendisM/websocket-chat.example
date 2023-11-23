import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserEntity } from "src/modules/user/entity/user.entity";
import { IAuthTokenPayload } from "../interface/auth-token.interface";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token') {
    constructor(
        private configService: ConfigService,
        private userService: UserService,
    ) {
        super({
            secretOrKey: configService.get<string>('REFRESH_TOKEN_SECRET'),
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