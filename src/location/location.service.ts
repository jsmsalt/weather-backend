import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { GeolocationService } from 'src/common/modules/geolocation/geolocation.service';

@Injectable()
export class LocationService {
  constructor(private geolocationService: GeolocationService) {}

  async getLocation(ip: string): Promise<any> {
    const response = await this.geolocationService.getLocation(ip);

    if (response && response.status === 'success') return response;

    throw new HttpException(response.message, HttpStatus.BAD_REQUEST);
  }
}
