import { Body, Controller, Post } from "@nestjs/common";
import { ApiConflictResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthCredentialService } from "../service/auth-credential.service";
import { CredentialSignupDto } from "../dto/signup-credential.dto";
import { CredentialSigninDto } from "../dto/signin-credential.dto";

@ApiTags("Auth Credential")
@Controller({
    path: '/auth/credential',
    version: '1',
})
export class AuthCredentialController {
    constructor(
        private authCredentialService: AuthCredentialService,
    ) { }

    @Post('/signup')
    @ApiOkResponse({
        description: 'Successfully signup & receive tokens.',
    })
    @ApiConflictResponse({
        description: 'Already used information.',
    })
    async signup(@Body() signupDto: CredentialSignupDto) {
        return await this.authCredentialService.signup(signupDto);
    }

    @Post('/signin')
    @ApiOkResponse({
        description: 'Successfully signin & receive tokens.',
    })
    @ApiConflictResponse({
        description: 'Invalid account information.',
    })
    async signin(@Body() signinDto: CredentialSigninDto) {
        return await this.authCredentialService.signin(signinDto);
    }
}