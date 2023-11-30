import { IntersectionType, PartialType, PickType } from "@nestjs/swagger";
import { BaseUserDto } from "./base-user.dto";

export class CreateUserDto extends IntersectionType(
    PickType(BaseUserDto, ['username']),
    PickType(PartialType(BaseUserDto), ['password', 'email', 'phone']),
) { }