import { ClassSerializerInterceptor, Controller, Get } from '@nestjs/common';
import { Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { RealIp } from '../common/decorators';
import { RateLimitGuard } from '../common/guards';
import { HttpCacheInterceptor } from '../common/interceptors';
import { CurrentService } from './current.service';
import { CurrenParamsDto, CurrentResponseDto } from './dto';

@ApiTags('Current Weather')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpCacheInterceptor)
@UseGuards(RateLimitGuard)
@Controller('current')
export class CurrentController {
  constructor(private currentService: CurrentService) {}

  @Get(':city?')
  @ApiParam({
    name: 'city',
    required: false,
    description: 'City name',
    allowEmptyValue: true,
  })
  async getCurrentWeather(
    @RealIp() ip: string,
    @Param() params: CurrenParamsDto,
  ): Promise<CurrentResponseDto> {
    return await this.currentService.getCurrentWeather(ip, params.city);
  }
}
