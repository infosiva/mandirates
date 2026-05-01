import { MSPCrop } from "./types";

export const MSP_DATA: MSPCrop[] = [
  // Kharif 2025-26
  { name: "Paddy", msp: 2300, season: "Kharif", unit: "per quintal" },
  { name: "Maize", msp: 2225, season: "Kharif", unit: "per quintal" },
  { name: "Cotton", msp: 7121, season: "Kharif", unit: "per quintal" },
  { name: "Soybean", msp: 4892, season: "Kharif", unit: "per quintal" },
  { name: "Groundnut", msp: 6783, season: "Kharif", unit: "per quintal" },
  // Rabi 2025-26
  { name: "Wheat", msp: 2425, season: "Rabi", unit: "per quintal" },
  { name: "Barley", msp: 1980, season: "Rabi", unit: "per quintal" },
  { name: "Gram", msp: 5650, season: "Rabi", unit: "per quintal" },
  { name: "Lentil", msp: 6700, season: "Rabi", unit: "per quintal" },
  { name: "Rapeseed", msp: 5950, season: "Rabi", unit: "per quintal" },
];

export const MSP_MAP: Record<string, number> = Object.fromEntries(
  MSP_DATA.map((c) => [c.name.toLowerCase(), c.msp])
);
