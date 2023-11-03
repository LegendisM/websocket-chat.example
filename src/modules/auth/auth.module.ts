import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controller/auth.controller";
import { UserModule } from "../user/user.module";
import { OAuthController } from "./controller/auth-connection.controller";
import { AuthTokenService } from "./service/auth-token.service";

@Module({
    imports: [
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: '7d',
                },
            }),
            inject: [ConfigService],
        }),
        UserModule,
    ],
    controllers: [AuthController, OAuthController],
    providers: [AuthTokenService],
    exports: [AuthTokenService],
})
export class AuthModule { }