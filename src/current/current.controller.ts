import { Controller, Get, Param } from '@nestjs/common';
import { RealIp } from 'src/common/decorators';
import { CurrentService } from './current.service';

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
