export interface currentWeather {
  currentTime?: string;
  isDay?: number;
  temperature: number;
}

export interface forecastWeather {
  maxTemp: number[];
  minTemp: number[];
  time?: string[];
}
