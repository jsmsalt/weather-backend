import { Controller, Get, Param } from '@nestjs/common';
import { UseGuards, UseInterceptors } from '@nestjs/common';

import { RealIp } from 'src/common/decorators';
import { RateLimitGuard } from 'src/common/guards';
import { HttpCacheInterceptor } from 'src/common/interceptors';
import { CurrentService } from './current.service';

@UseInterceptors(HttpCacheInterceptor)
@UseGuards(RateLimitGuard)
@Controller('current')
export class CurrentController {
  constructor(private currentService: CurrentService) {}

  @Get(':city?')
  async getCurrentWeather(
    @RealIp() ip: string,
    @Param('city') city?: string,
  ): Promise<any> {
    return this.currentService.getCurrentWeather(ip, city);
  }
}
