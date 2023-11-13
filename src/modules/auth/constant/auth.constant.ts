import { JwtSignOptions } from "@nestjs/jwt";
import { AuthTokenType } from "../interface/auth-token.interface";

export const AUTH_ACCOUNT_USERNAME_PREFIX = "guest";

export const AUTH_TOKENS_OPTIONS: Record<AuthTokenType, Pick<JwtSignOptions, 'expiresIn'>> = {
    access: { expiresIn: '1d' },
    refresh: { expiresIn: '7d' },
};