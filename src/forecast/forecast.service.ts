import { Injectable } from '@nestjs/common';

import { GeolocationService } from 'src/common/modules/geolocation/geolocation.service';
import { WeatherService } from 'src/common/modules/weather/weather.service';
import { LocationNotFoundException } from 'src/common/responses';
import { ForecastResponseDto } from './dto';

@Injectable()
export class ForecastService {
  constructor(
    private weatherService: WeatherService,
    private geolocationService: GeolocationService,
  ) {}

  async getForecast(ip: string, city?: string): Promise<ForecastResponseDto> {
    let lat, lon;

    if (city) {
      const { 0: location } = await this.weatherService.getGeocoding(city);

      if (!location) throw new LocationNotFoundException();

      ({ lat, lon } = location);
    } else {
      const location = await this.geolocationService.getLocation(ip);

      ({ lat, lon } = location);
    }

    const forecast = await this.weatherService.getForecast(lat, lon);

    return new ForecastResponseDto(forecast);
  }
}
