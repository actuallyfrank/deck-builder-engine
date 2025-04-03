import { useEffect } from "react";

type KeyEventType = "keydown" | "keyup" | "keypress";

/**
 * Hook to listen for keyboard events and trigger a callback
 * @param targetKey The key to listen for ('Delete', 'Escape', etc.)
 * @param callback Function to call when the key is pressed
 * @param eventType Type of keyboard event to listen for
 * @param deps Additional dependencies to include in the useEffect
 */
export function useKeyPress(
  targetKey: string,
  callback: (event: KeyboardEvent) => void,
  eventType: KeyEventType = "keydown",
  deps: React.DependencyList = [],
) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === targetKey) {
        callback(event);
      }
    };

    window.addEventListener(eventType, handler);
    return () => window.removeEventListener(eventType, handler);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetKey, callback, eventType, ...deps]);
}
