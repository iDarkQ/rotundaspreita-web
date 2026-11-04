import { useEffect, useRef } from "react";

const BLOCKED_EVENTS = [
  "copy",
  "cut",
  "contextmenu",
  "dragstart",
  "selectstart",
] as const;

export const useCopyProtection = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const block = (event: Event) => event.preventDefault();
    BLOCKED_EVENTS.forEach((name) => element.addEventListener(name, block));

    return () =>
      BLOCKED_EVENTS.forEach((name) =>
        element.removeEventListener(name, block),
      );
  }, []);

  return { ref };
};
