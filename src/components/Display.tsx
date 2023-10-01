import { currentWeather, forecastWeather } from '../types/commonType.model';
import { roundAndConvertToF } from '../lib/utils';

interface DisplayProps {
  locationName: string;
  countryCode: string;
  currentWeather: currentWeather;
  forecastWeather: forecastWeather;
}

function Display({ locationName, countryCode, currentWeather, forecastWeather }: DisplayProps) {
  return (
    <div className="flex items-center justify-between w-full p-5 m-4 mx-auto ">
      <div>
        <h1 className="text-2xl font-bold md:text-4xl">Today's Weather</h1>
        <p className="mt-5 ml-10 text-zinc-500">
          in {locationName}, {countryCode}
        </p>
      </div>
      <div>
        <h1 className="text-3xl font-bold md:text-5xl">{roundAndConvertToF(currentWeather.temperature)}&deg;F</h1>
        <p className="mt-2 text-sm text-zinc-500">Mostly Cloudy</p>
        <p className="mt-2 text-sm text-zinc-500">
          H:{roundAndConvertToF(forecastWeather?.maxTemp[0])}&deg; L:
          {roundAndConvertToF(forecastWeather?.minTemp[0])}&deg;
        </p>
      </div>
    </div>
  );
}

export default Display;
