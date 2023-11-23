import { PickType } from "@nestjs/swagger";
import { BaseUserDto } from "src/modules/user/dto/base-user.dto";

export class SigninCredentialDto extends PickType(BaseUserDto, ['username', 'password']) { }