import { useRef } from "react";

/**
 * A custom hook that tracks if a component is mounted.
 *
 * This implementation avoids using useEffect by leveraging the fact that
 * in React, refs are initialized during render but before the component mounts.
 * The ref will be initialized to false, and then immediately after the first render,
 * we can consider the component mounted and access the current value as true.
 */
export function useIsMounted() {
  // Initialize ref to false
  const isMountedRef = useRef(false);

  // Set to true after first render
  // This happens synchronously after the function component evaluation
  // but before React commits the result to the DOM
  isMountedRef.current = true;

  return { isMounted: isMountedRef.current };
}
