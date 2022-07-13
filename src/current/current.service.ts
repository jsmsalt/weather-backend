import { Injectable } from '@nestjs/common';

import { isValidIp } from '../common/utils/validation';
import { GeolocationService } from '../common/modules/geolocation/geolocation.service';
import { WeatherService } from '../common/modules/weather/weather.service';
import { InvalidIpException } from '../common/responses';
import { LocationNotFoundException } from '../common/responses';
import { CurrentResponseDto } from './dto';

@Injectable()
export class CurrentService {
  constructor(
    private weatherService: WeatherService,
    private geolocationService: GeolocationService,
  ) {}

  async getCurrentWeather(
    ip: string,
    city?: string,
  ): Promise<CurrentResponseDto> {
    if (!city && !isValidIp(ip)) throw new InvalidIpException();

    let lat, lon;

    if (city) {
      const { 0: location } = await this.weatherService.getGeocoding(city);

      if (!location) throw new LocationNotFoundException();

      ({ lat, lon } = location);
    } else {
      const location = await this.geolocationService.getLocation(ip);

      ({ lat, lon } = location);
    }

    const weather = await this.weatherService.getCurrentWeather(lat, lon);

    return new CurrentResponseDto(weather);
  }
}
