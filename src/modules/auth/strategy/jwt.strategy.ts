import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserEntity } from "src/modules/user/entity/user.entity";
import { IJwtPayload } from "../interface/jwt.interface";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private configService: ConfigService,
        private userService: UserService,
    ) {
        super({
            secretOrKey: configService.get<string>('JWT_SECRET'),
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate({ id }: IJwtPayload): Promise<UserEntity> {
        const user = await this.userService.findById(id);
        if (!user) {
            throw new UnauthorizedException('auth.unauthorized');
        }
        return user;
    }
}