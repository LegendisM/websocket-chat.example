import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Auth Connection")
@Controller({
    path: '/auth/connection',
    version: '1',
})
export class AuthConnectionController {
    constructor(

    ) { }

    // TODO: google-enter
    // TODO: google-callback

    // TODO: facebook-enter
    // TODO: facebook-callback
}