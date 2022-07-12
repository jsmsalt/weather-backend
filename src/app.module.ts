import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { ClientIpMiddleware } from './common/middlewares';
import { CurrentModule } from './current/current.module';
import { ForecastModule } from './forecast/forecast.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [LocationModule, CurrentModule, ForecastModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ClientIpMiddleware).forRoutes('*');
  }
}
