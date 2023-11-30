import { IntersectionType } from "@nestjs/swagger";
import { BaseConnectionDto } from "./base-connection.dto";

export class CreateConnectionDto extends IntersectionType(BaseConnectionDto) { }