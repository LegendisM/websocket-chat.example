import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthCredentialController } from "./controller/auth-credential.controller";
import { UserModule } from "../user/user.module";
import { AuthTokenService } from "./service/auth-token.service";
import { AuthConnectionController } from "./controller/auth-connection.controller";
import { AuthOtpController } from "./controller/auth-otp.controller";
import { AuthCredentialService } from "./service/auth-credential.service";
import { AuthConnectionService } from "./service/auth-connection.service";
import { AuthOtpService } from "./service/auth-otp.service";
import { AuthAccountService } from "./service/auth-account.service";
import { AccessTokenStrategy } from "./strategy/access-token.strategy";
import { RefreshTokenStrategy } from "./strategy/refresh-token.strategy";
import { GoogleStrategy } from "./strategy/google.strategy";
import { AuthConnectionEntity } from "./entity/auth-connection.entity";
import { AuthConnectionProviderService } from "./service/auth-connection-provider.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseSource } from "src/database/interface/database.interface";

@Module({
    imports: [
        TypeOrmModule.forFeature([AuthConnectionEntity], DatabaseSource.Primary),
        JwtModule.register({}),
        UserModule,
    ],
    controllers: [
        AuthCredentialController,
        AuthConnectionController,
        AuthOtpController,
    ],
    providers: [
        AuthTokenService,
        AuthAccountService,
        AuthCredentialService,
        AuthConnectionService,
        AuthConnectionProviderService,
        AuthOtpService,
        AccessTokenStrategy,
        RefreshTokenStrategy,
        GoogleStrategy,
    ],
    exports: [AuthTokenService],
})
export class AuthModule { }