import { Module } from '@nestjs/common';
import { CurrentModule } from './current/current.module';
import { ForecastModule } from './forecast/forecast.module';
import { LocationModule } from './location/location.module';
@Module({
  imports: [LocationModule, CurrentModule, ForecastModule],
})
export class AppModule {}
