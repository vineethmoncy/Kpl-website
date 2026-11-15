import type { L } from "./types";

const en = (text: string): L => ({ en: text, hi: "" });
/** Technical abbreviations stay identical in both languages. */
const same = (text: string): L => ({ en: text, hi: text });

export type Hotspot = { id: number; slug: string; short: L };

/** Seven selectable areas of the diagram, in display order. */
export const hotspots: Hotspot[] = [
  { id: 1, slug: "substation-automation-scada", short: en("Automation & SCADA") },
  { id: 2, slug: "plcc-systems", short: same("PLCC") },
  { id: 3, slug: "protection-control", short: en("Protection & control") },
  { id: 4, slug: "supply-integration", short: en("Supply & integration") },
  { id: 5, slug: "testing-commissioning", short: en("Testing & commissioning") },
  { id: 6, slug: "network-design-security", short: en("Network & security") },
  { id: 7, slug: "operation-maintenance", short: en("Operation & maintenance") },
];

/** Text labels drawn inside the SVG. */
export const labels = {
  aria: en("Interactive diagram of a transmission substation automation system, showing where KPL works"),
  levelControl: en("Control centre"),
  levelStation: en("Station level"),
  levelBay: en("Bay level"),
  levelProcess: en("Process level"),
  sldc: same("SLDC"),
  gateway: en("Gateway"),
  scada: same("SCADA / HMI"),
  switch: en("Ethernet switch"),
  gps: same("GPS clock"),
  crPanel: same("C&R panel"),
  bcu: same("BCU / IED"),
  relay: en("Protection relay"),
  busbar: en("Busbar"),
  cb: same("CB"),
  ct: same("CT"),
  pt: same("PT"),
  waveTrap: en("Wave trap"),
  coupling: en("Coupling capacitor"),
  plcc: same("PLCC panel"),
  line: en("Outgoing line"),
  remote: en("Remote substation"),
  hardwired: en("Hard-wired"),
  link104: same("IEC 60870-5-104"),
  link61850: same("IEC 61850 station bus"),
  badge: same("24/7"),
};
