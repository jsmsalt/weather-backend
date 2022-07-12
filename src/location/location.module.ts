import { Module } from '@nestjs/common';

import { GeolocationModule } from 'src/common/modules/geolocation/geolocation.module';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  controllers: [LocationController],
  providers: [LocationService, GeolocationModule],
})
export class LocationModule {}
