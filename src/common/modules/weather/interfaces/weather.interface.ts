export abstract class IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export abstract class ICoord {
  lon: number;
  lat: number;
}

export abstract class IForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: Array<IWeather>;
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}

export abstract class ICurrentResponse {
  coord: ICoord;
  weather: Array<IWeather>;
  base: string;
  main: {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    feels_like: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    message: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  id: number;
  name: string;
  cod: number;
}

export abstract class IForecastResponse {
  cod: '200';
  message: 0;
  cnt: 40;
  list: Array<IForecastItem>;
  city: {
    id: number;
    name: string;
    coord: ICoord;
    country: string;
    population: number;
    timezone: 0;
    sunrise: number;
    sunset: number;
  };
}

export abstract class IGeocodingResponse {
  name: string;
  local_names: { [key: string]: string };
  lat: number;
  lon: number;
  country?: string;
  state?: string;
}
