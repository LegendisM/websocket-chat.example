import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";

@ApiTags("Auth")
@Controller({
    path: '/auth',
    version: '1',
})
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    // TODO: signup

    // TODO: signin
}