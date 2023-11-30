import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Auth One-Time-Password")
@Controller({
    path: '/auth/otp',
    version: '1',
})
export class AuthOtpController {
    constructor(

    ) { }

    // TODO: start
    // TODO: resend
    // TODO: verify
}