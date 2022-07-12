import { CacheInterceptor, ExecutionContext, Injectable } from '@nestjs/common';
import { RequestWithIp } from '../interfaces';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(ctx: ExecutionContext): string | undefined {
    const request = ctx.switchToHttp().getRequest<RequestWithIp>();
    const { city } = request.params;
    return city ? request.url : `${request.url}_${request.clientIp}`;
  }
}
