import { Exclude, Expose } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';

import { IForecastResponse } from 'src/common/modules/weather/interfaces';

export class ForecastParamsDto {
  @IsString()
  @IsOptional()
  city?: string;
}

@Exclude()
export class ForecastResponseDto extends IForecastResponse {
  @Expose({ name: 'location' })
  get getLocation(): object {
    return {
      city: this.city.name,
      country: this.city.country,
      coord: this.city.coord,
    };
  }

  @Expose({ name: 'forecast' })
  get getForecast(): Array<object> {
    return this.list.map((f) => ({
      datetime: new Date(f.dt * 1000),
      date: new Date(f.dt * 1000).toLocaleDateString(),
      description: f.weather[0].description,
      icon: f.weather[0].icon,
      temp: f.main.temp,
      pressure: f.main.pressure,
      humidity: f.main.humidity,
      temp_min: f.main.temp_min,
      temp_max: f.main.temp_max,
      feels_like: f.main.feels_like,
      wind_speed: f.wind.speed,
      wind_direction: f.wind.deg,
      visibility: f.visibility,
    }));
  }

  constructor(partial: Partial<ForecastResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
