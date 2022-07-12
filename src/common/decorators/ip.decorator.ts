import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithIp } from '../interfaces';

export const RealIp = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithIp>();
    return request.clientIp;
  },
);
