import { Exclude } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

import { IGeocodingResponse } from '../../common/modules/weather/interfaces';
import { IGeolocationResponse } from '../../common/modules/geolocation/interfaces';

export class LocationQueryDto {
  @IsString()
  @IsNotEmpty()
  q?: string;
}

export class GeolocationResponseDto extends IGeocodingResponse {
  @Exclude()
  local_names: { [key: string]: string };

  constructor(partial: Partial<GeolocationResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}

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
