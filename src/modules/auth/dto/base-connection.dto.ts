import { ApiProperty } from "@nestjs/swagger";
import { AuthConnectionProvider } from "../interface/auth-connection.interface";
import { IsEnum, IsString, IsUUID } from "class-validator";

export class BaseConnectionDto {
    @ApiProperty({
        enum: AuthConnectionProvider,
    })
    @IsEnum(AuthConnectionProvider)
    provider: AuthConnectionProvider;

    @ApiProperty()
    @IsString()
    providerId: string;

    @ApiProperty({
        description: 'UUID of user',
    })
    @IsUUID()
    userId: string;
}