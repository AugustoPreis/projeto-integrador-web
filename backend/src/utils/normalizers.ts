import { isValidNumber } from './validators';

export interface StringOptions {
  trim?: boolean;
  lower?: boolean;
  upper?: boolean;
}

export interface CurrencyOptions {
  precision?: number;
  negative?: boolean;
}

export function string(value: unknown, options: StringOptions = {}): string | null {
  if (typeof value != 'string') {
    return null;
  }

  let formatted = value;

  if (options.trim !== false) {
    formatted = formatted.trim();
  }

  if (options.lower) {
    formatted = formatted.toLowerCase();
  }

  if (options.upper) {
    formatted = formatted.toUpperCase();
  }

  return formatted;
}

export function date(value: unknown): Date | null {
  if (!value || !['string', 'number', 'object'].includes(typeof value)) {
    return null;
  }

  const date = new Date(value as string | number | Date);

  if (isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export function currency(value: unknown, options: CurrencyOptions = {}): number | null {
  let currency = Number(value);

  if (!isValidNumber(currency)) {
    return null;
  }

  if (currency < 0 && !options.negative) {
    currency = 0;
  }

  if (options.precision) {
    const pow = Math.pow(10, options.precision);

    currency = Math.round(currency * pow) / pow;
  }

  return currency;
}