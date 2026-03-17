import { useState, useEffect } from 'react';
import { ZodType } from 'zod';

export function useLocalStorage<T>(
  key: string,
  schema: ZodType<T>,
  defaultValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const readValue = (): T => {
    if (typeof window === 'undefined') return defaultValue;

    try {
      const item = localStorage.getItem(key);

      if (!item) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }

      const parsed = JSON.parse(item);
      const result = schema.safeParse(parsed);

      if (!result.success) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }

      return result.data;
    } catch {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  };

  const [state, setState] = useState<T>(readValue);

  useEffect(() => {
    try {
      const result = schema.safeParse(state);

      if (result.success) {
        localStorage.setItem(key, JSON.stringify(result.data));
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        setState(defaultValue);
      }
    } catch {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      setState(defaultValue);
    }
  }, [key, state, schema, defaultValue]);

  return [state, setState];
}
