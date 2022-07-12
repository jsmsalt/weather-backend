import { Injectable } from '@nestjs/common';
import { ApisauceInstance, create } from 'apisauce';
import { IGeolocationResponse } from './interfaces';

@Injectable()
export class GeolocationService {
  private readonly httpClient: ApisauceInstance;

  constructor() {
    this.httpClient = create({
      baseURL: 'http://ip-api.com/json',
      headers: { Accept: 'application/json' },
    });
  }

  async getLocation(ip?: string): Promise<IGeolocationResponse> {
    const path = ip ? `/${ip}` : '/';
    const { data } = await this.httpClient.get<IGeolocationResponse>(path);

    return data;
  }
}
