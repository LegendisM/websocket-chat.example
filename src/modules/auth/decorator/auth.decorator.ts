import { UseGuards, applyDecorators } from "@nestjs/common"
import { ApiBearerAuth } from "@nestjs/swagger";
import { AccessTokenGuard } from "../guard/access-token.guard";

export const Auth = () => {
    return applyDecorators(
        ApiBearerAuth(),
        UseGuards(AccessTokenGuard),
    );
}