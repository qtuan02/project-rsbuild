import { useCallback, useState } from "react";

type SetValueAction<T> = T | ((previousValue: T) => T);

const isBrowser = () => typeof window !== "undefined";

const resolveInitialValue = <T>(initialValue: T | (() => T)) =>
  initialValue instanceof Function ? initialValue() : initialValue;

export const useLocalStorage = <T>(
  key: string,
  initialValue: T | (() => T),
): [T, (value: SetValueAction<T>) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const fallbackValue = resolveInitialValue(initialValue);

    if (!isBrowser()) {
      return fallbackValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (!item) {
        return fallbackValue;
      }

      return JSON.parse(item) as T;
    } catch {
      return fallbackValue;
    }
  });

  const setValue = useCallback(
    (value: SetValueAction<T>) => {
      setStoredValue((previousValue) => {
        const nextValue =
          value instanceof Function ? value(previousValue) : value;

        if (isBrowser()) {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
        }

        return nextValue;
      });
    },
    [key],
  );

  return [storedValue, setValue];
};
