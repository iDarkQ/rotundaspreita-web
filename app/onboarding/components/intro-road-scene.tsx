import { CSSProperties } from "react";

const popStyle = (delay: number): CSSProperties => ({
  animationDelay: `${delay}ms`,
  transformBox: "fill-box",
  transformOrigin: "50% 100%",
});

export type IntroPhase = "loading" | "playing" | "done";

const CAR_SRC = "/onboarding/car.svg";
const PARKING_BAY_SRC = "/onboarding/parking-bay.svg";

const animationClass = (animation: string, animated: boolean) =>
  animated ? animation : undefined;

const TREES = [
  { src: "/onboarding/tree-1.svg", x: 36, y: 59, width: 44, height: 88 },
  { src: "/onboarding/tree-2.svg", x: 102, y: 84, width: 36, height: 63 },
  { src: "/onboarding/tree-3.svg", x: 175, y: 59, width: 50, height: 88 },
  { src: "/onboarding/tree-4.svg", x: 253, y: 71, width: 38, height: 76 },
  { src: "/onboarding/tree-5.svg", x: 433, y: 63, width: 42, height: 84 },
  { src: "/onboarding/tree-6.svg", x: 506, y: 87, width: 34, height: 60 },
];

const LIGHTS = [
  {
    src: "/onboarding/traffic-light-red.svg",
    y: 0,
    height: 147,
    animation: "motion-safe:animate-scene-light-red",
    resting: 0,
  },
  {
    src: "/onboarding/traffic-light-yellow.svg",
    y: 7,
    height: 140,
    animation: "motion-safe:animate-scene-light-yellow",
    resting: 0,
  },
  {
    src: "/onboarding/traffic-light-green.svg",
    y: 7,
    height: 140,
    animation: "motion-safe:animate-scene-light-green",
    resting: 1,
  },
];

export const INTRO_SCENE_ASSETS = [
  ...TREES.map((tree) => tree.src),
  ...LIGHTS.map((light) => light.src),
  PARKING_BAY_SRC,
  CAR_SRC,
];

const Tree = ({
  src,
  x,
  y,
  width,
  height,
  delay,
  animated,
}: {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  delay: number;
  animated: boolean;
}) => (
  <image
    href={src}
    x={x}
    y={y}
    width={width}
    height={height}
    className={animationClass("motion-safe:animate-scene-pop", animated)}
    style={popStyle(delay)}
  />
);

// Solid housing and stalk behind the lens images, so the housing does not fade out while the lights crossfade.
const TrafficLight = ({ animated }: { animated: boolean }) => (
  <g
    className={animationClass("motion-safe:animate-scene-pop", animated)}
    style={popStyle(1200)}
  >
    <rect x={349} y={7} width={34} height={84} rx={8} fill="#26323C" />
    <rect x={364} y={91} width={4} height={56} fill="#3B4A56" />
    {LIGHTS.map((light) => (
      <image
        key={light.src}
        href={light.src}
        x={342}
        y={light.y}
        width={48}
        height={light.height}
        className={animationClass(light.animation, animated)}
        style={{ opacity: light.resting }}
      />
    ))}
  </g>
);

const ParkingSpot = ({ animated }: { animated: boolean }) => (
  <g
    className={animationClass("motion-safe:animate-scene-pop", animated)}
    style={popStyle(1300)}
  >
    <image href={PARKING_BAY_SRC} x={477} y={76} width={120} height={76} />
  </g>
);

const Road = ({ animated }: { animated: boolean }) => (
  <g
    className={animationClass("motion-safe:animate-scene-road", animated)}
    style={{ transformBox: "fill-box", transformOrigin: "0% 50%" }}
  >
    <path d="M0 147.5 H602" stroke="#C9D0D6" strokeWidth={2} />
    <path
      d="M0 159.5 H602"
      stroke="#EAEEF1"
      strokeWidth={3}
      strokeDasharray="8 6"
      strokeDashoffset={6}
    />
  </g>
);

// The inline transform is the parked position, so the car stays there once the animation is removed.
const Car = ({ animated }: { animated: boolean }) => (
  <g transform="translate(-106 105)">
    <image
      href={CAR_SRC}
      width={90}
      height={44}
      className={animationClass("motion-safe:animate-scene-car", animated)}
      style={{ transform: "translateX(597px)" }}
    />
  </g>
);

export const IntroRoadScene = ({ phase }: { phase: IntroPhase }) => {
  const animated = phase === "playing";

  return (
    <svg
      viewBox="0 0 602 162"
      className={`block h-auto w-full overflow-visible ${phase === "loading" ? "invisible" : ""}`}
      aria-hidden="true"
      focusable="false"
    >
      <Road animated={animated} />
      {TREES.map((tree, index) => (
        <Tree
          key={tree.src}
          {...tree}
          delay={700 + index * 80}
          animated={animated}
        />
      ))}
      <ParkingSpot animated={animated} />
      <TrafficLight animated={animated} />
      <Car animated={animated} />
    </svg>
  );
};
