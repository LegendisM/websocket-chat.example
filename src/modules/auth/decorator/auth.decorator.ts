import { UseGuards, applyDecorators } from "@nestjs/common"
import { JwtAuthGuard } from "../guard/jwt.guard";
import { ApiBearerAuth } from "@nestjs/swagger";

export const Auth = () => {
    return applyDecorators(
        ApiBearerAuth(),
        UseGuards(JwtAuthGuard),
    );
}