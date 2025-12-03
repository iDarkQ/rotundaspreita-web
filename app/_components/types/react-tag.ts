import { JSXElementConstructor } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ReactTag =
  | keyof React.JSX.IntrinsicElements
  | JSXElementConstructor<any>;
