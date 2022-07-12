import { Injectable } from '@nestjs/common';

import { GeolocationService } from 'src/common/modules/geolocation/geolocation.service';
import { WeatherService } from 'src/common/modules/weather/weather.service';
import { LocationNotFoundException } from 'src/common/responses';
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
