import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller({
    path: '/auth',
    version: '1',
})
export class AuthController {
    constructor() { }

    // ! default
    // TODO: signup-default
    // TODO: signin-default
}