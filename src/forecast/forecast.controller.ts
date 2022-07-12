import { ClassSerializerInterceptor, Controller, Get } from '@nestjs/common';
import { Param, UseGuards, UseInterceptors } from '@nestjs/common';

import { RealIp } from 'src/common/decorators';
import { RateLimitGuard } from 'src/common/guards';
import { HttpCacheInterceptor } from 'src/common/interceptors';
import { ForecastParamsDto, ForecastResponseDto } from './dto';
import { ForecastService } from './forecast.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpCacheInterceptor)
@UseGuards(RateLimitGuard)
@Controller('forecast')
export class ForecastController {
  constructor(private forecastService: ForecastService) {}

  @Get(':city?')
  async getForecast(
    @RealIp() ip: string,
    @Param() params: ForecastParamsDto,
  ): Promise<ForecastResponseDto> {
    return await this.forecastService.getForecast(ip, params.city);
  }
}
