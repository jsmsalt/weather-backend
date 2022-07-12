import { Controller, Get, Param } from '@nestjs/common';
import { RealIp } from 'src/common/decorators';
import { ForecastService } from './forecast.service';

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
