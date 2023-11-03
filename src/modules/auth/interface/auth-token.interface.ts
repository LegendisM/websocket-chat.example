export enum AuthTokenType {
    Access = "access",
    Refresh = "refresh",
}

export interface IAuthTokenPayload {
    id: string;
    username: string;
}