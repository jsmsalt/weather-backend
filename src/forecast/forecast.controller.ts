import { Controller, Get, Param } from '@nestjs/common';
import { UseGuards, UseInterceptors } from '@nestjs/common';

import { RealIp } from 'src/common/decorators';
import { RateLimitGuard } from 'src/common/guards';
import { HttpCacheInterceptor } from 'src/common/interceptors';
import { ForecastService } from './forecast.service';

@UseInterceptors(HttpCacheInterceptor)
@UseGuards(RateLimitGuard)
@Controller('forecast')
export class ForecastController {
  constructor(private forecastService: ForecastService) {}

  @Get(':city?')
  async getForecast(
    @RealIp() ip: string,
    @Param('city') city?: string,
  ): Promise<any> {
    return await this.forecastService.getForecast(ip, city);
  }
}
