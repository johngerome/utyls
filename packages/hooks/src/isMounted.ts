import { useRef, useEffect } from "react";

/**
 * A custom hook that tracks if a component is mounted.
 * It returns an object with an `isMounted` getter that reflects the true mounted state,
 * even after the component unmounts.
 */
export function useIsMounted() {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return {
    get isMounted() {
      return isMountedRef.current;
    },
  };
}
