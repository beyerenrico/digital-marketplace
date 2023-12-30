import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice (
  price: number | string,
  options: {
    locale?: 'en-US' | 'en-GB' | 'en-BD' | 'de-DE',
    currency?: 'USD' | 'EUR' | 'GBP' | 'BDT',
    notation?: Intl.NumberFormatOptions['notation'],
  } = {}
) {
  const {
    locale = 'en-US',
    currency = 'USD',
    notation = 'compact'
  } = options;
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2
  }).format(numericPrice);
}
