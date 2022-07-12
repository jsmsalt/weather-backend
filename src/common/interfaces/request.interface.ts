import { Request } from 'express';

export interface RequestWithIp extends Request {
  clientIp?: string;
}
