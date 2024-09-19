export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isValidString(value: unknown): value is string {
  return isString(value) && value.trim().length > 0;
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}

export function isValidNumber(value: unknown): value is number {
  return isNumber(value) && !isNaN(value) && isFinite(value);
}

export function isValidCurrency(value: unknown): value is number {
  return isNumber(value) && isValidNumber(value) && value > 0;
}