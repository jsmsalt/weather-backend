import { Global, Module } from '@nestjs/common';
import { GeolocationService } from './geolocation.service';

@Global()
@Module({
  providers: [GeolocationService],
  exports: [GeolocationService],
})
export class GeolocationModule {}
