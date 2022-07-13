import { Injectable } from '@nestjs/common';

import { isValidIp } from '../common/utils/validation';
import { GeolocationService } from '../common/modules/geolocation/geolocation.service';
import { InvalidIpException } from '../common/responses';
import { WeatherService } from '../common/modules/weather/weather.service';
import { GeolocationResponseDto, LocationResponseDto } from './dto';

@Injectable()
export class LocationService {
  constructor(
    private geolocationService: GeolocationService,
    private weatherService: WeatherService,
  ) {}

  async getLocation(ip: string): Promise<LocationResponseDto> {
    if (!isValidIp(ip)) throw new InvalidIpException();

    const response = await this.geolocationService.getLocation(ip);

    if (response && response.status === 'success')
      return new LocationResponseDto(response);

    throw new InvalidIpException();
  }

  async searchLocations(query: string): Promise<Array<GeolocationResponseDto>> {
    let response = await this.weatherService.getGeocoding(query);

    if (response && Array.isArray(response)) {
      response = response.map((l) => new GeolocationResponseDto(l));
    }

    return response;
  }
}
