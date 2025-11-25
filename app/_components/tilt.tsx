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
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 10,
        speed: 500,
        startX: angle === "left" ? 30 : -30,
        // startY: 5,
        perspective: 1800,
        glare: true,
        "max-glare": 0.1,
        scale: 1.03,
        reset: true,
      });
    }
  }, []);

  return (
    <div ref={tiltRef} className={clsx(className && className)}>
      {children}
    </div>
  );
};
