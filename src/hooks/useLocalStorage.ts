import { useEffect, useState } from "react";

// create custom hook useLocalStorage
function useLocalStorage<T>(key: string, initalValue: T) {

  /// create state
  const[value, setValue] = useState<T>(() => {

    const storedValue = localStorage.getItem(key) // look inside localStorage

    // turn JSOn string back into JavaScript data
    if (storedValue !== null) {
      try {
        return JSON.parse(storedValue) as T;
      } catch {
        return initalValue;
      }

    }

    // start with initalValue
    return initalValue;

  })

  //useEffect - whenever our value changes save the new value to localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // give value and setter back to component
  return [value, setValue] as const;

}
export default useLocalStorage;