import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';

import { RealIp } from 'src/common/decorators';
import { RateLimitGuard } from 'src/common/guards';
import { HttpCacheInterceptor } from 'src/common/interceptors';
import { LocationService } from './location.service';

@UseInterceptors(HttpCacheInterceptor)
@UseGuards(RateLimitGuard)
@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  async getLocation(@RealIp() ip: string): Promise<any> {
    return this.locationService.getLocation(ip);
  }
}
