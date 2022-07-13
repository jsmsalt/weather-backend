import { Module } from '@nestjs/common';
import { GeolocationService } from '../common/modules/geolocation/geolocation.service';
import { WeatherService } from '../common/modules/weather/weather.service';
import { ForecastController } from './forecast.controller';
import { ForecastService } from './forecast.service';

@Module({
  controllers: [ForecastController],
  providers: [ForecastService, WeatherService, GeolocationService],
})
export class ForecastModule {}
