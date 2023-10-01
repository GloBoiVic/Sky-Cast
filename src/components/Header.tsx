import { Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useTheme } from './theme-provider';

interface HeaderProps {
  inputValue: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Header({ inputValue, onChangeInput }: HeaderProps) {
  const { setTheme } = useTheme();
  return (
    <div className="grid w-full grid-cols-3 p-3 ">
      <Button variant="outline" size="icon" onClick={() => setTheme('light')} className="border-none">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <h1 className="text-3xl font-bold ">Sky Cast</h1>
      <div className="w-full ">
        <Input
          placeholder="Search Location..."
          className="pl-4 border-0 border-b rounded-none focus:rounded-sm border-b-red-400 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-inherit"
          value={inputValue}
          onChange={onChangeInput}
        />
      </div>
    </div>
  );
}

export default Header;
