import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthTokenService {
    constructor(
        private jwtService: JwtService,
    ) { }

    // TODO: generate(type:access,refresh[],payload:IAuthTokenPayload)
    // TODO: validate(type:access,refresh,token:string)
}