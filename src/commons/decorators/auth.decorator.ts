import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadRefreshToken } from 'types/jwt-payload-refresh-token.type';
import { JwtPayload } from 'types/jwt-payload.type';

export const Auth = createParamDecorator(
  (_: undefined | keyof JwtPayloadRefreshToken, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (_) {
      return request.user[_];
    }

    const user = request.user as JwtPayload;
    return user;
  },
);
