"use client";

import { useEffect, useRef } from "react";

interface Props {
  text: string;
  className?: string;
  testId?: string;
  entityId?: string;
  centerBlock?: boolean;
}

const wrapLines = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
) => {
  const lines: string[] = [];

  for (const paragraph of text.split("\n")) {
    let line = "";

    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const candidate = line ? `${line} ${word}` : word;

      if (line && ctx.measureText(candidate).width > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    }

    lines.push(line);
  }

  return lines;
};

// Renders text as pixels so it cannot be read from the DOM by scrapers.
export const CanvasText = ({
  text,
  className,
  testId,
  entityId,
  centerBlock,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!container || !canvas || !ctx) return;

    const draw = () => {
      const width = container.clientWidth;
      if (!width) return;

      const style = getComputedStyle(container);
      const font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      const fontSize = parseFloat(style.fontSize);
      const lineHeight = parseFloat(style.lineHeight) || fontSize * 1.5;
      const ratio = window.devicePixelRatio || 1;

      ctx.font = font;
      const lines = wrapLines(ctx, text, width);
      const height = Math.max(lines.length, 1) * lineHeight;

      // Resizing the canvas resets its context state.
      canvas.width = Math.ceil(width * ratio);
      canvas.height = Math.ceil(height * ratio);
      canvas.style.height = `${height}px`;

      ctx.scale(ratio, ratio);
      ctx.font = font;
      ctx.fillStyle = style.color;
      ctx.textBaseline = "middle";
      ctx.textAlign =
        style.textAlign === "center" && !centerBlock ? "center" : "left";

      // Centers the whole text block while keeping lines left-aligned.
      const blockWidth = Math.max(
        ...lines.map((line) => ctx.measureText(line).width),
      );
      const x = centerBlock
        ? Math.max((width - blockWidth) / 2, 0)
        : style.textAlign === "center"
          ? width / 2
          : 0;
      lines.forEach((line, index) =>
        ctx.fillText(line, x, index * lineHeight + lineHeight / 2),
      );
    };

    draw();

    const observer = new ResizeObserver(draw);
    observer.observe(container);
    document.fonts.ready.then(draw);

    return () => observer.disconnect();
  }, [text, centerBlock]);

  return (
    <div
      ref={containerRef}
      className={className}
      data-testid={testId}
      data-entity-id={entityId}
    >
      <canvas ref={canvasRef} role="img" className="block w-full" />
    </div>
  );
};
