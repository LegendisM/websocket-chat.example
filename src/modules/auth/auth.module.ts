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

@Module({
    imports: [
        JwtModule.register({}),
        UserModule,
    ],
    controllers: [AuthCredentialController, AuthConnectionController, AuthOtpController],
    providers: [AuthTokenService, AuthAccountService, AuthCredentialService, AuthConnectionService, AuthOtpService],
    exports: [AuthTokenService],
})
export class AuthModule { }