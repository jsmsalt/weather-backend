import { Injectable } from '@nestjs/common';
import { GeolocationService } from 'src/common/modules/geolocation/geolocation.service';
import { WeatherService } from 'src/common/modules/weather/weather.service';
import { LocationNotFound } from 'src/common/responses';

@Injectable()
export class CurrentService {
  constructor(
    private weatherService: WeatherService,
    private geolocationService: GeolocationService,
  ) {}

  async getCurrentWeather(ip: string, city?: string): Promise<any> {
    let lat, lon;

    if (city) {
      const { 0: location } = await this.weatherService.getGeocoding(city);

      if (!location) throw new LocationNotFound();

      ({ lat, lon } = location);
    } else {
      const location = await this.geolocationService.getLocation(ip);

      ({ lat, lon } = location);
    }

    return await this.weatherService.getCurrentWeather(lat, lon);
  }
}
