import { IntersectionType } from "@nestjs/swagger";
import { BaseAccountDto } from "./base-account.dto";

export class ValidateAccountDto extends IntersectionType(BaseAccountDto) { }