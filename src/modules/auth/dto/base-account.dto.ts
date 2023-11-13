import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "src/modules/user/dto/create-user.dto";

export class BaseAccountDto extends PartialType(CreateUserDto) { }