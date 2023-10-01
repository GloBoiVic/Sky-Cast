import { useEffect, useState } from 'react';

import { currentWeather, forecastWeather } from './types/commonType.model';
import Header from './components/Header';
import Display from './components/Display';
import { Loader } from 'lucide-react';
import TabMenu from './components/Tabs';

import { ThemeProvider } from './components/theme-provider';

console.clear();

function App() {
  const [locationName, setLocationName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forecastWeather, setForcastWeather] = useState<forecastWeather>({
    maxTemp: [],
    minTemp: [],
  });
  const [currentWeather, setCurrentWeather] = useState<currentWeather>({
    temperature: 0,
  });
  const [inputValue, setInputValue] = useState('');

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.currentTarget.value);
  }

  useEffect(() => {
    async function fetchWeather() {
      if (!inputValue || inputValue.length < 3) return;
      try {
        setIsLoading(true);
        // Get location data and fetch
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${inputValue}`);
        const data = await response.json();

        if (!data.results) throw new Error('Cannot find location');

        const { name, latitude, longitude, timezone, country_code } = data.results.at(0);

        console.log(data.results);

        setLocationName(name);
        setCountryCode(country_code);

        // Fetch actual weather
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&current_weather=true&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min
          `,
        );
        const weatherData = await weatherRes.json();

        if (!weatherData.daily || !weatherData.current_weather) throw new Error('Something went wrong');

        const { temperature_2m_min: minTemp, temperature_2m_max: maxTemp, time } = weatherData.daily;

        const { is_day: isDay, temperature, time: currentTime } = weatherData.current_weather;

        setForcastWeather({ minTemp, maxTemp, time });
        setCurrentWeather({ isDay, temperature, currentTime });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWeather();
  }, [inputValue]);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen px-10 text-gray-800 sm:px-20 dark:text-zinc-50 bg-slate-50 dark:bg-gray-950">
        <div className="container flex flex-col items-center justify-center h-[70vh] mx-auto ">
          <Header onChangeInput={handleInput} inputValue={inputValue} />
          {isLoading && (
            <p className="mt-10">
              Loading...
              <span>
                <Loader size={25} color="blue" />
              </span>
            </p>
          )}
          {inputValue.length > 3 && (
            <>
              <Display
                locationName={locationName}
                countryCode={countryCode}
                currentWeather={currentWeather}
                forecastWeather={forecastWeather}
              />
              <TabMenu forecastWeather={forecastWeather} />
            </>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
