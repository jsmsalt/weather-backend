import { ClassSerializerInterceptor, Controller, Get } from '@nestjs/common';
import { Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { RealIp } from '../common/decorators';
import { RateLimitGuard } from '../common/guards';
import { HttpCacheInterceptor } from '../common/interceptors';
import { ForecastParamsDto, ForecastResponseDto } from './dto';
import { ForecastService } from './forecast.service';

@ApiTags('Forecast')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpCacheInterceptor)
@UseGuards(RateLimitGuard)
@Controller('forecast')
export class ForecastController {
  constructor(private forecastService: ForecastService) {}

  @Get(':city?')
  @ApiParam({
    name: 'city',
    required: false,
    description: 'City name',
    allowEmptyValue: true,
  })
  async getForecast(
    @RealIp() ip: string,
    @Param() params: ForecastParamsDto,
  ): Promise<ForecastResponseDto> {
    return await this.forecastService.getForecast(ip, params.city);
  }
}
