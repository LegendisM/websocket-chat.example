import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber, IsString, IsUUID, Length } from "class-validator";

export class BaseUserDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsString()
    @Length(1, 32)
    username: string;

    @ApiProperty()
    @IsString()
    @Length(4, 28)
    password: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsPhoneNumber('IR')
    phone: string;
}