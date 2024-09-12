export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isValidString(value: unknown): value is string {
  return isString(value) && value.trim().length > 0;
}