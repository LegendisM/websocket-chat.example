import { PickType } from "@nestjs/swagger";
import { BaseUserDto } from "src/modules/user/dto/base-user.dto";

export class CredentialSignupDto extends PickType(BaseUserDto, ['username', 'email', 'password']) { }