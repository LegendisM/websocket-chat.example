import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";

export class FindUsersDto extends IntersectionType(PaginationDto) {
    @ApiProperty({
        required: false,
        description: 'Filter by username',
    })
    @IsString()
    @IsOptional()
    username: string;
}