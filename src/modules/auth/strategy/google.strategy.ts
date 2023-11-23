import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { AuthConnectionProvider, IAuthConnectionCallbackInfo } from "../interface/auth-connection.interface";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private configService: ConfigService,
    ) {
        super({
            clientID: configService.get<string>('OAUTH_GOOGLE_CLIENT_ID'),
            clientSecret: configService.get<string>('OAUTH_GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.get<string>('OAUTH_GOOGLE_CALLBACK_URL'),
            scope: ['profile', 'email'],
        });
    }

    async validate(_accessToken: string, _refreshToken: string, { id, emails, photos }: Profile, done: VerifyCallback) {
        const callbackInfo: IAuthConnectionCallbackInfo = {
            provider: AuthConnectionProvider.Google,
            providerId: id,
            email: emails[0].value,
            picture: photos[0].value,
        };

        done(null, callbackInfo);
    }
}