/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
export function TypeGuard<T>(
  _value: unknown | T,
  isMatched: boolean
): _value is T {
  return isMatched;
}
