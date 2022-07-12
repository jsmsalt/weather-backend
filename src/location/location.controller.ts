import { Controller, Get } from '@nestjs/common';
import { RealIp } from 'src/common/decorators';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  async getLocation(@RealIp() ip: string): Promise<any> {
    return this.locationService.getLocation(ip);
  }
}
