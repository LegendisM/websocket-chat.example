export enum AuthConnectionProvider {
    Google = "google",
    Meta = "meta",
    Spotify = "spotify",
}

export interface IAuthConnectionCallbackInfo {
    provider: AuthConnectionProvider;
    providerId: string;
    email?: string;
    picture?: string;
}