import { ClassSerializerInterceptor, Controller, Query } from '@nestjs/common';
import { Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RealIp } from '../common/decorators';
import { RateLimitGuard } from '../common/guards';
import { HttpCacheInterceptor } from '../common/interceptors';
import { GeolocationResponseDto } from './dto';
import { LocationQueryDto, LocationResponseDto } from './dto';
import { LocationService } from './location.service';

@ApiTags('Location')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HttpCacheInterceptor)
@UseGuards(RateLimitGuard)
@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  async getLocation(@RealIp() ip: string): Promise<LocationResponseDto> {
    return await this.locationService.getLocation(ip);
  }

  @Get('/search')
  async searchLocations(
    @Query() queries: LocationQueryDto,
  ): Promise<Array<GeolocationResponseDto>> {
    return await this.locationService.searchLocations(queries.q);
  }
}
