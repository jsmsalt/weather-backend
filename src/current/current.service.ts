import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrentService {
  async getCurrentWeather(ip: string, city?: string): Promise<any> {
    return {
      message: 'Not Implemented',
    };
  }
}
