import { Controller, Get, Param } from '@nestjs/common';
import { ForecastService } from './forecast.service';

@Controller('forecast')
export class ForecastController {
  constructor(private forecastService: ForecastService) {}

  @Get(':city?')
  async getForecast(@Param('city') city?: string): Promise<any> {
    return await this.forecastService.getForecast(city);
  }
}
