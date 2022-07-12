import { Injectable } from '@nestjs/common';

import { GeolocationService } from 'src/common/modules/geolocation/geolocation.service';
import { InvalidIpException } from 'src/common/responses';
import { LocationResponseDto } from './dto';

@Injectable()
export class LocationService {
  constructor(private geolocationService: GeolocationService) {}

  async getLocation(ip: string): Promise<LocationResponseDto> {
    const response = await this.geolocationService.getLocation(ip);

    if (response && response.status === 'success')
      return new LocationResponseDto(response);

    throw new InvalidIpException();
  }
}
