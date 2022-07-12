import { ClassSerializerInterceptor, Controller } from '@nestjs/common';
import { Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RealIp } from 'src/common/decorators';
import { RateLimitGuard } from 'src/common/guards';
import { HttpCacheInterceptor } from 'src/common/interceptors';
import { LocationResponseDto } from './dto';
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
}
