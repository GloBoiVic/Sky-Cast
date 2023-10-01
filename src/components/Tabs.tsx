import { roundAndConvertToF } from '../lib/utils';
import { forecastWeather } from '../types/commonType.model';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface TabMenuProps {
  forecastWeather: forecastWeather;
}

function TabMenu({ forecastWeather }: TabMenuProps) {
  console.log(forecastWeather);
  const fiveDay = [forecastWeather.minTemp, forecastWeather.maxTemp];
  console.log(fiveDay);
  return (
    <div className="w-full ml-auto ">
      <Tabs defaultValue="today" className="border-t h-[25vh]">
        <TabsList className="grid w-full grid-cols-2 border-b bg-inherit ">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="pl-4">
          Today L:{roundAndConvertToF(forecastWeather.minTemp[0])}&deg; H:
          {roundAndConvertToF(forecastWeather.maxTemp[0])}&deg;
        </TabsContent>
        <TabsContent value="tomorrow" className="pl-4">
          Tomorrow L:{roundAndConvertToF(forecastWeather.minTemp[1])}&deg; H:
          {roundAndConvertToF(forecastWeather.maxTemp[1])}&deg;
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TabMenu;
