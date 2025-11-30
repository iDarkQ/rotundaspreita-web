"use client";

import clsx from "clsx";
import { ReactNode, useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

interface Props {
  children: ReactNode;
  className?: string;
  angle?: "left" | "right";
}

export const Tilt = ({ children, className, angle = "left" }: Props) => {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isXL = window.matchMedia("(min-width: 1024px)").matches;

    if (tiltRef.current && isXL) {
      VanillaTilt.init(tiltRef.current, {
        max: 10,
        speed: 500,
        startX: angle === "left" ? 30 : -30,
        perspective: 1800,
        glare: true,
        "max-glare": 0.1,
        scale: 1.03,
        reset: true,
      });
    }
  }, [angle]);

  return (
    <div ref={tiltRef} className={clsx(className && className)}>
      {children}
    </div>
  );
};
