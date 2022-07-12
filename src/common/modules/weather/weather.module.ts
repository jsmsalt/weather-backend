import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Module({
  providers: [WeatherService],
})
export class WeatherModule {}
