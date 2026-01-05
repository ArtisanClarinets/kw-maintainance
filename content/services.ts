
import { z } from "zod";

export const ServiceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  icon: z.string().optional(),
});

export type Service = z.infer<typeof ServiceSchema>;

export const services: Service[] = [
  {
    id: "preventative-maintenance",
    title: "PREVENTATIVE MAINTENANCE",
    description: "Scheduled inspections and upkeep to extend asset life and prevent costly downtime.",
    features: ["HVAC Filter & Coil Cleaning", "Safety Compliance Checks", "Leak Detection", "Lighting Audits"],
    icon: "ShieldCheck"
  },
  {
    id: "turnover-services",
    title: "HOSPITALITY TURNOVER",
    description: "Rapid, high-quality repairs and touch-ups between guest stays for hotels and resorts.",
    features: ["Paint Touch-ups", "Fixture Repair", "Furniture Stability", "Caulking & Grouting"],
    icon: "RotateCw"
  },
  {
    id: "facility-audits",
    title: "FACILITY AUDITS",
    description: "Comprehensive reporting on property health to support capital expenditure planning.",
    features: ["Asset Condition Reports", "Safety Hazard Identification", "Compliance Documentation", "Photo Reporting"],
    icon: "ClipboardCheck"
  },
  {
    id: "handyman",
    title: "GENERAL MAINTENANCE",
    description: "Reliable ad-hoc repairs for commercial properties and high-end residences.",
    features: ["Door & Lock Repair", "Drywall Patching", "Furniture Assembly", "Signage Installation"],
    icon: "Hammer"
  },
  {
    id: "installations",
    title: "COMMERCIAL INSTALLATIONS",
    description: "Professional installation services for FF&E (Furniture, Fixtures, and Equipment).",
    features: ["TV & Audio Systems", "Smart Room Controls", "Lobby Fixtures", "Art Hanging"],
    icon: "Wrench"
  },
  {
    id: "painting",
    title: "COMMERCIAL PAINTING",
    description: "Interior and exterior painting to maintain brand standards and curb appeal.",
    features: ["Corridor Refresh", "Exterior Coatings", "Guest Room Updates", "High-Traffic Coatings"],
    icon: "Paintbrush"
  }
];
