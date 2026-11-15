import type { L } from "./types";

export type Service = {
  slug: string;
  icon: string;
  title: L;
  summary: L;
  scope: L[];
  oems?: string[];
  protocols?: string[];
  note?: L;
  related: string[];
};

const en = (text: string): L => ({ en: text, hi: "" });

export const services: Service[] = [
  {
    slug: "substation-automation-scada",
    icon: "scada",
    title: en("Substation Automation & SCADA Systems"),
    summary: en(
      "Complete system architecture, SCADA configuration, RTU and IED integration, and protocol implementation for substations.",
    ),
    scope: [
      en("Complete system architecture design and implementation"),
      en("SCADA configuration, database creation and visualization"),
      en("RTU / BCU / IED integration and programming"),
      en("Communication protocol implementation (IEC 60870-5-101/104, IEC 61850, Modbus, DNP3)"),
      en("Gateway configuration for SLDC / Sub-LDC integration"),
      en("System restoration, upgradation and bay additions"),
    ],
    protocols: ["IEC 60870-5-101", "IEC 60870-5-104", "IEC 61850", "Modbus", "DNP3"],
    related: ["plcc-systems", "testing-commissioning", "network-design-security"],
  },
  {
    slug: "plcc-systems",
    icon: "plcc",
    title: en("PLCC (Power Line Carrier Communication) Systems"),
    summary: en(
      "Installation, testing, commissioning and restoration of PLCC systems, with 200+ systems commissioned.",
    ),
    scope: [
      en("Installation, testing and commissioning (ZIV, ABB, Alstom and other makes)"),
      en("Integration with existing SCADA/RTU infrastructure"),
      en("Troubleshooting and restoration of communication links"),
      en("System upgradation and retrofitting"),
    ],
    oems: ["ZIV", "ABB", "Alstom"],
    related: ["substation-automation-scada", "testing-commissioning", "operation-maintenance"],
  },
  {
    slug: "protection-control",
    icon: "relay",
    title: en("Protection & Control Systems"),
    summary: en(
      "Numerical relay configuration, protection scheme design, coordination studies and panel retrofitting.",
    ),
    scope: [
      en("Configuration and commissioning of numerical relays (all major brands)"),
      en("Protection scheme design and coordination studies"),
      en("Relay replacement and panel retrofitting"),
      en("Relay testing using advanced test equipment"),
      en("CT/PT polarity testing and secondary injection testing"),
      en("Panel modification, wiring correction and control circuit testing"),
    ],
    oems: ["Siemens", "ABB", "GE", "ZIV", "Alstom", "CG", "Sifang", "ERL"],
    related: ["testing-commissioning", "supply-integration", "substation-automation-scada"],
  },
  {
    slug: "supply-integration",
    icon: "supply",
    title: en("Supply & Integration"),
    summary: en(
      "Supply of RTUs, BCUs, IEDs, Ethernet switches, C&R panels, GPS synchronization systems, meters and transducers.",
    ),
    scope: [
      en("RTUs, BCUs, IEDs and Ethernet switches"),
      en("Control & Relay (C&R) panels"),
      en("GPS synchronization systems"),
      en("MFTs, transducers and energy meters"),
    ],
    note: en("Authorized distributor of SANDS, Chennai for GPS synchronization systems."),
    related: ["protection-control", "substation-automation-scada", "testing-commissioning"],
  },
  {
    slug: "testing-commissioning",
    icon: "testing",
    title: en("Testing & Commissioning"),
    summary: en(
      "Relay functional testing, end-to-end SCADA validation and bay commissioning for 66kV to 400kV substations.",
    ),
    scope: [
      en("Relay configuration and functional testing"),
      en("End-to-end SCADA system validation"),
      en("Bay equipment commissioning for 66kV to 400kV substations"),
      en("Communication link testing and troubleshooting"),
    ],
    related: ["protection-control", "substation-automation-scada", "plcc-systems"],
  },
  {
    slug: "network-design-security",
    icon: "network",
    title: en("Network Design & Security"),
    summary: en(
      "Communication network architecture, cybersecurity for critical infrastructure, and network troubleshooting.",
    ),
    scope: [
      en("Communication network architecture"),
      en("Cybersecurity implementation for critical infrastructure"),
      en("Network troubleshooting and optimization"),
    ],
    related: ["substation-automation-scada", "operation-maintenance", "supply-integration"],
  },
  {
    slug: "operation-maintenance",
    icon: "om",
    title: en("Operation & Maintenance (O&M)"),
    summary: en(
      "Preventive and corrective maintenance, 24/7 support for critical installations, and performance monitoring.",
    ),
    scope: [
      en("Preventive and corrective maintenance programs"),
      en("24/7 support for critical installations"),
      en("Performance monitoring and system optimization"),
    ],
    related: ["plcc-systems", "network-design-security", "testing-commissioning"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
