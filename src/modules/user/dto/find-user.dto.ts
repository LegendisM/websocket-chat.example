import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class FindUsersDto extends IntersectionType(PaginationDto) {
    @ApiProperty({
        required: false,
        description: 'Filter by username',
    })
    @IsString()
    @IsOptional()
    username: string;

    @ApiProperty({
        required: false,
        description: 'Filter by email',
    })
    @IsEmail()
    @IsOptional()
    email: string

    @ApiProperty({
        required: false,
        description: 'Filter by phone-number',
    })
    @IsPhoneNumber('IR')
    @IsOptional()
    phone: string;
}