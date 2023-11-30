import { Injectable, OnModuleInit } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthTokenType, IAuthToken, IAuthTokenPayload } from "../interface/auth-token.interface";
import { AUTH_TOKENS_OPTIONS } from "../constant/auth.constant";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthTokenService implements OnModuleInit {
    #secrets: Record<AuthTokenType, string> = { access: '', refresh: '' };

    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    onModuleInit() {
        this.#secrets.access = this.configService.get("ACCESS_TOKEN_SECRET");
        this.#secrets.refresh = this.configService.get("REFRESH_TOKEN_SECRET");
    }

    async create(types: AuthTokenType[], payload: IAuthTokenPayload): Promise<IAuthToken[]> {
        let tokens: IAuthToken[] = [];

        for (const type of types) {
            const token = await this.jwtService.signAsync(payload, { secret: this.#secrets[type], ...AUTH_TOKENS_OPTIONS[type] });
            tokens.push({
                type,
                value: token,
            });
        }

        return tokens;
    }

    async generate(payload: IAuthTokenPayload): Promise<IAuthToken[]> {
        return await this.create([AuthTokenType.Access, AuthTokenType.Refresh], payload);
    }

    async validate({ type, value }: IAuthToken): Promise<IAuthTokenPayload> {
        return this.jwtService.verifyAsync<IAuthTokenPayload>(value, { secret: this.#secrets[type], ...AUTH_TOKENS_OPTIONS[type] });
    }
}