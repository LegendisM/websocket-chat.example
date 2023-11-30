import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GoogleOAuthGuard } from "../guard/google-oauth.guard";
import { Request } from "express";
import { IAuthConnectionCallbackInfo } from "../interface/auth-connection.interface";
import { AuthConnectionProviderService } from "../service/auth-connection-provider.service";

@ApiTags("Auth Connection")
@Controller({
    path: '/auth/connection',
    version: '1',
})
export class AuthConnectionController {
    constructor(
        private authConnectionProviderService: AuthConnectionProviderService,
    ) { }

    @Get('/google')
    @UseGuards(GoogleOAuthGuard)
    async googleAuth() { }

    @Get('/google/callback')
    @UseGuards(GoogleOAuthGuard)
    async googleCallback(@Req() req: Request) {
        return await this.authConnectionProviderService.process(req.user as IAuthConnectionCallbackInfo);
    }
}