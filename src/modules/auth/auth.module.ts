import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controller/auth.controller";
import { UserModule } from "../user/user.module";
import { AuthTokenService } from "./service/auth-token.service";
import { AuthConnectionController } from "./controller/auth-connection.controller";
import { AuthOtpController } from "./controller/auth-otp.controller";
import { AuthCredentialService } from "./service/auth-credential.service";
import { AuthConnectionService } from "./service/auth-connection.service";
import { AuthOtpService } from "./service/auth-otp.service";

@Module({
    imports: [
        JwtModule.register({}),
        UserModule,
    ],
    controllers: [AuthController, AuthConnectionController, AuthOtpController],
    providers: [AuthTokenService, AuthCredentialService, AuthConnectionService, AuthOtpService],
    exports: [AuthTokenService],
})
export class AuthModule { }