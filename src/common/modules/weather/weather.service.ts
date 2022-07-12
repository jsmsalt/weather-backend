import { Injectable } from '@nestjs/common';
import { ApisauceInstance, create } from 'apisauce';
import {
  ICurrentResponse,
  IForecastResponse,
  IGeocodingResponse,
} from './interfaces';

@Injectable()
export class WeatherService {
  private readonly httpClient: ApisauceInstance;

  constructor() {
    this.httpClient = create({
      baseURL: 'https://api.openweathermap.org',
      headers: { Accept: 'application/json' },
      params: {
        appid: '',
        units: 'metric',
        lang: 'es',
        limit: 5,
      },
    });
  }

  async getCurrentWeather(lat: number, lon: number): Promise<ICurrentResponse> {
    const { data } = await this.httpClient.get<ICurrentResponse>(
      `/data/2.5/weather?lat=${lat}&lon=${lon}`,
    );

    return data;
  }

  async getForecast(lat: number, lon: number): Promise<IForecastResponse> {
    const { data } = await this.httpClient.get<IForecastResponse>(
      `/data/2.5/forecast?lat=${lat}&lon=${lon}`,
    );

    return data;
  }

  async getGeocoding(query: string): Promise<Array<IGeocodingResponse>> {
    const { data } = await this.httpClient.get<Array<IGeocodingResponse>>(
      `/geo/1.0/direct?q=${query}`,
    );

    return data;
  }
}
