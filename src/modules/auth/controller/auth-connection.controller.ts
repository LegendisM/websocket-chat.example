import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GoogleOAuthGuard } from "../guard/google-oauth.guard";
import { Request } from "express";
import { IAuthConnectionCallbackInfo } from "../interface/auth-connection.interface";

@ApiTags("Auth Connection")
@Controller({
    path: '/auth/connection',
    version: '1',
})
export class AuthConnectionController {
    constructor() { }

    @Get('/google')
    @UseGuards(GoogleOAuthGuard)
    async googleAuth() { }

    @Get('/google/callback')
    @UseGuards(GoogleOAuthGuard)
    async googleCallback(@Req() req: Request) {
        const callbackInfo: IAuthConnectionCallbackInfo = req.user as IAuthConnectionCallbackInfo;
        return callbackInfo;
    }
}