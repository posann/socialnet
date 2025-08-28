export type Role = "Buyer" | "Seller";

export const MOCK_BUYERS: Buyer[] = [
  {
    id: "b1",
    name: "Aurora Capital Partners",
    location: "Jakarta, ID",
    budgetMin: 500_000,
    budgetMax: 3_000_000,
    industryFocus: ["F&B", "D2C", "Logistics"],
    trackRecord: 6,
    decisionSpeed: "Fast",
    preferences: ["Founder-led", "Profitable", "Simple ops"],
    bio: "PE boutique yang fokus ke bisnis sederhana dengan arus kas sehat. Tim ex-operator, eksekusi cepat.",
  },
  {
    id: "b2",
    name: "Nusantara Strategic Holdings",
    location: "Bandung, ID",
    budgetMin: 1_000_000,
    budgetMax: 7_000_000,
    industryFocus: ["Manufacturing", "Distribution"],
    trackRecord: 12,
    decisionSpeed: "Moderate",
    preferences: ["B2B", ">20% GM", "Regional moat"],
    bio: "Family office dengan horizon jangka panjang, nyaman retain founder sebagai advisor.",
  },
  {
    id: "b3",
    name: "Seaside Operators Collective",
    location: "Surabaya, ID",
    budgetMin: 200_000,
    budgetMax: 1_500_000,
    industryFocus: ["Services", "F&B"],
    trackRecord: 3,
    decisionSpeed: "Deliberate",
    preferences: ["Owner absent", "Turnaround OK"],
    bio: "Kelompok operator ex-unicorn yang ingin akuisisi SMB dan improve operasional + pemasaran.",
  },
];

export interface Buyer {
  id: string;
  name: string;
  location: string;
  budgetMin: number;
  budgetMax: number;
  industryFocus: string[];
  trackRecord: number; // number of acquisitions
  decisionSpeed: "Fast" | "Moderate" | "Deliberate";
  preferences: string[];
  bio: string;
}

export interface DealState {
  step: number; // 0..4
  chat: string[];
  documents: { name: string; sizeKB: number }[];
  aiSummary?: string;
  negotiation: {
    offerPrice?: number;
    equityPercent?: number;
    earnout?: boolean;
    escrow?: boolean;
    targetCloseDays?: number;
    notes?: string;
  };
  closingChecklist: Record<string, boolean>;
}