import { Injectable } from '@nestjs/common';

@Injectable()
export class ForecastService {
  async getForecast(ip: string, city?: string): Promise<any> {
    return {
      message: 'Not Implemented',
    };
  }
}
