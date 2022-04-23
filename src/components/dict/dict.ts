import type { Dictionary } from './types';

export function dict<D extends unknown, V extends unknown>(value: V, dictionary: Dictionary<D>) {
  if (Array.isArray(dictionary)) {
    return dictionary.find(x => x.value === value);
  }

  return dictionary[value as unknown as string];
}
