import { ClassSerializerInterceptor, Controller, Get } from '@nestjs/common';
import { Param, UseGuards, UseInterceptors } from '@nestjs/common';

import { RealIp } from 'src/common/decorators';
import { RateLimitGuard } from 'src/common/guards';
import { HttpCacheInterceptor } from 'src/common/interceptors';
import { CurrentService } from './current.service';
import { CurrenParamsDto, CurrentResponseDto } from './dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpCacheInterceptor)
@UseGuards(RateLimitGuard)
@Controller('current')
export class CurrentController {
  constructor(private currentService: CurrentService) {}

  @Get(':city?')
  async getCurrentWeather(
    @RealIp() ip: string,
    @Param() params: CurrenParamsDto,
  ): Promise<CurrentResponseDto> {
    return await this.currentService.getCurrentWeather(ip, params.city);
  }
}
