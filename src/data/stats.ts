import type { L } from "./types";

export type Stat = { value: number; suffix: string; label: L };

export const stats: Stat[] = [
  { value: 15, suffix: "+", label: { en: "Years in power automation", hi: "" } },
  { value: 200, suffix: "+", label: { en: "PLCC systems commissioned", hi: "" } },
  { value: 400, suffix: "kV", label: { en: "Maximum project voltage level", hi: "" } },
  { value: 8, suffix: "+", label: { en: "OEM makes handled", hi: "" } },
];
