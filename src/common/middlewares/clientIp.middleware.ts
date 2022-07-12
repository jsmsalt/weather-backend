import * as requestIp from 'request-ip';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { RequestWithIp } from '../interfaces';

@Injectable()
export class ClientIpMiddleware implements NestMiddleware {
  use(req: RequestWithIp, res: Response, next: NextFunction) {
    const clientIp = requestIp.getClientIp(req);
    req.clientIp = clientIp;
    next();
  }
}
