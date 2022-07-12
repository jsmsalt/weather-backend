import { Exclude, Expose } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';
import { ICurrentResponse } from 'src/common/modules/weather/interfaces';

export class CurrenParamsDto {
  @IsString()
  @IsOptional()
  city?: string;
}

@Exclude()
export class CurrentResponseDto extends ICurrentResponse {
  @Expose({ name: 'location' })
  get getLocation(): object {
    return {
      city: this.name,
      country: this.sys.country,
      coord: this.coord,
    };
  }

  @Expose({ name: 'weather' })
  get getWeather(): object {
    return {
      datetime: new Date(this.dt * 1000),
      description: this.weather[0].description,
      icon: this.weather[0].icon,
      temp: this.main.temp,
      pressure: this.main.pressure,
      humidity: this.main.humidity,
      temp_min: this.main.temp_min,
      temp_max: this.main.temp_max,
      feels_like: this.main.feels_like,
      wind_speed: this.wind.speed,
      wind_direction: this.wind.deg,
      visibility: this.visibility,
    };
  }

  constructor(partial: Partial<CurrentResponseDto>) {
    super();
    Object.assign(this, partial);
  }
}
