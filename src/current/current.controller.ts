import { Controller, Get, Param } from '@nestjs/common';
import { CurrentService } from './current.service';

@Controller('current')
export class CurrentController {
  constructor(private currentService: CurrentService) {}

  @Get(':city?')
  async getCurrentWeather(@Param('city') city?: string): Promise<any> {
    return this.currentService.getCurrentWeather(city);
  }
}
