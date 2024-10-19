import { useState, useEffect } from 'react'

// for ramzinex : to avoid making new request for every character you type
export const useDebounce = (value:string, milliSeconds:number) => {
 const [debouncedValue, setDebouncedValue] = useState(value);

 useEffect(() => {
   const handler = setTimeout(() => {
     setDebouncedValue(value);
   }, milliSeconds);

   return () => {
     clearTimeout(handler);
   };
 }, [value, milliSeconds]);

 return debouncedValue;
};