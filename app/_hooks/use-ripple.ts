"use client";

import { useCallback, useEffect, useRef } from "react";
import clsx from "clsx";

export const useRipple = (
  filled: boolean = true,
  disabledRipple: boolean = false,
) => {
  const ref = useRef<HTMLElement>(null);
  const rippleRef = useRef<HTMLSpanElement | null>(null);

  const cancel = () => {
    if (rippleRef.current) {
      const el = rippleRef.current as HTMLSpanElement;

      el.classList.add("opacity-0", "animate-ripple-hide");

      const handleAnimationEnd = () => {
        el.remove();
        el.removeEventListener("animationend", handleAnimationEnd);
      };

      el.addEventListener("animationend", handleAnimationEnd);

      rippleRef.current = null;
    }
  };

  const createRipple = useCallback(
    (event: PointerEvent) => {
      const element = ref.current;
      if (!element || disabledRipple) return;

      if (event.type === "pointerdown") {
        const ripple = document.createElement("span");
        ripple.className = clsx(
          "absolute rounded-full [transform:scale(0)] transition-transform duration-1000 pointer-events-none opacity-100 z-1",
          filled ? "bg-black/10" : "bg-primary",
        );

        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;

        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        element.appendChild(ripple);
        rippleRef.current = ripple;

        setTimeout(() => {
          ripple.classList.add("[transform:scale(4)]");
        }, 0);
      }
    },
    [disabledRipple, filled],
  );

  const loadingAnimation = () => {
    const ripple = document.createElement("span");
    ripple.className = clsx(
      "absolute rounded-full [transform:scale(0)] transition-transform duration-1000 pointer-events-none opacity-100 z-1",
      filled ? "bg-black/10" : "bg-primary",
    );

    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;

    const x = rect.width / 2 - size / 2;
    const y = rect.height / 2 - size / 2;

    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    element.appendChild(ripple);

    setTimeout(() => {
      rippleRef.current = ripple;

      ripple.classList.add("[transform:scale(4)]");
      cancel();
    }, 10);
  };

  useEffect(() => {
    const element = ref.current;
    if (!element || disabledRipple) return;

    const handlePointerDown = (event: PointerEvent) => {
      createRipple(event);
    };
    const handlePointerUp = () => cancel();
    const handleMouseLeave = () => cancel();

    element.addEventListener("pointerdown", handlePointerDown);
    element.addEventListener("pointerup", handlePointerUp);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("touchend", handlePointerUp);

    return () => {
      element.removeEventListener("pointerdown", handlePointerDown);
      element.removeEventListener("pointerup", handlePointerUp);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("touchend", handlePointerUp);
    };
  }, [createRipple, disabledRipple]);

  return { ref, createRipple, cancel, loadingAnimation };
};
