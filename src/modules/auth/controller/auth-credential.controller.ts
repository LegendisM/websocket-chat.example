import { Body, Controller, Post } from "@nestjs/common";
import { ApiConflictResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthCredentialService } from "../service/auth-credential.service";
import { SignupCredentialDto } from "../dto/signup-credential.dto";
import { SigninCredentialDto } from "../dto/signin-credential.dto";

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
    async signup(@Body() signupDto: SignupCredentialDto) {
        return await this.authCredentialService.signup(signupDto);
    }

    @Post('/signin')
    @ApiOkResponse({
        description: 'Successfully signin & receive tokens.',
    })
    @ApiConflictResponse({
        description: 'Invalid account information.',
    })
    async signin(@Body() signinDto: SigninCredentialDto) {
        return await this.authCredentialService.signin(signinDto);
    }
}