import { IntersectionType } from "@nestjs/swagger";
import { BaseAccountDto } from "./base-account.dto";

export class CreateAccountDto extends IntersectionType(BaseAccountDto) { }