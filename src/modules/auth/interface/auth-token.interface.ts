export enum AuthTokenType {
    Access = "access",
    Refresh = "refresh",
}

export interface IAuthToken {
    type: AuthTokenType;
    value: string;
}

export interface IAuthTokenPayload {
    id: string;
    username: string;
}