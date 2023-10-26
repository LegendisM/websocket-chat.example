import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID, Length } from "class-validator";

export class BaseUserDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsString()
    @Length(1, 16)
    username: string;

    @ApiProperty()
    @IsString()
    @Length(4, 12)
    password: string;
}