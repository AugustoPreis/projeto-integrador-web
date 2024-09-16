export interface StringOptions {
  trim?: boolean;
  lower?: boolean;
  upper?: boolean;
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