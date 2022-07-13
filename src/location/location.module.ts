import { Module } from '@nestjs/common';

import { GeolocationService } from '../common/modules/geolocation/geolocation.service';
import { WeatherService } from '../common/modules/weather/weather.service';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  controllers: [LocationController],
  providers: [LocationService, GeolocationService, WeatherService],
})
export class LocationModule {}
