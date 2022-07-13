import { Module } from '@nestjs/common';

import { GeolocationService } from '../common/modules/geolocation/geolocation.service';
import { WeatherService } from '../common/modules/weather/weather.service';
import { CurrentController } from './current.controller';
import { CurrentService } from './current.service';

@Module({
  controllers: [CurrentController],
  providers: [CurrentService, WeatherService, GeolocationService],
})
export class CurrentModule {}
