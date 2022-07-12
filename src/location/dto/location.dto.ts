import { Exclude } from 'class-transformer';
import { IGeolocationResponse } from 'src/common/modules/geolocation/interfaces';

export class LocationResponseDto extends IGeolocationResponse {
  @Exclude()
  status: string;

  @Exclude()
  isp: string;

  @Exclude()
  query: string;

  @Exclude()
  org: string;

  @Exclude()
  as: string;

  constructor(partial: Partial<LocationResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
