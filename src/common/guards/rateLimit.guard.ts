import { ThrottlerGuard } from '@nestjs/throttler';
import { Injectable } from '@nestjs/common';
import { RequestWithIp } from '../interfaces';

@Injectable()
export class RateLimitGuard extends ThrottlerGuard {
  protected getTracker(req: RequestWithIp): string {
    return req.clientIp;
  }
}
