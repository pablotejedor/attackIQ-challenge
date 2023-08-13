import { useEffect, useRef } from 'react';

export default function useDebounce() {
     const debouncerRef = useRef(null);

     const debouncer = (fn, timer) => {
          if (debouncerRef.current) {
               clearTimeout(debouncerRef.current);
          }

          debouncerRef.current = setTimeout(() => fn(), timer);
     };

     useEffect(() => {
          return () => clearTimeout(debouncerRef.current);
     }, []);

     return debouncer;
}
