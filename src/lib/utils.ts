import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function roundAndConvertToF(temp: number) {
  return Math.round(temp * 2 + 32);
}

export function formatDateToDay(dateStr: string) {
  const date = new Date(dateStr);
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  return dayOfWeek;
}
