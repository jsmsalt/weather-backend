import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {
  async getLocation(): Promise<any> {
    return {
      message: 'Not Implemented',
    };
  }
}
