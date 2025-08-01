import { useState, useEffect } from 'react';

export function useLocalStorage(
  key: string,
  value: string
): [string, React.Dispatch<React.SetStateAction<string>>] {
  const [state, setState] = useState(() => {
    const localStorageData = localStorage.getItem(key) || value;
    return localStorageData;
  });

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);
  return [state, setState];
}
