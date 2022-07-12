import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ClientIpMiddleware } from './common/middlewares';
import { GeolocationModule } from './common/modules/geolocation/geolocation.module';
import { WeatherModule } from './common/modules/weather/weather.module';
import { CurrentModule } from './current/current.module';
import { ForecastModule } from './forecast/forecast.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LocationModule,
    CurrentModule,
    ForecastModule,
    GeolocationModule,
    WeatherModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClientIpMiddleware).forRoutes('*');
  }
}
