import { Injectable } from '@nestjs/common';

@Injectable()
export class ForecastService {
  async getForecast(city?: string): Promise<any> {
    return {
      message: 'Not Implemented',
    };
  }
}
