import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrentService {
  async getCurrentWeather(city?: string): Promise<any> {
    return {
      message: 'Not Implemented',
    };
  }
}
