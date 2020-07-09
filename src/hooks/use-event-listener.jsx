import { useEffect, useRef } from 'react';

export default function useEventListener(eventName, handler, element = global) {
  useEffect(
    () => {
      // Make sure element supports addEventListener
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;

      // Add event listener
      element.addEventListener(eventName, handler);

      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, handler);
      };
    },
    [eventName, element, handler] // Re-run if eventName or element changes
  );
}
