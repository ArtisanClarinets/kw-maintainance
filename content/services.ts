
import { z } from "zod";

export const ServiceSchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.enum(["hospitality", "residential", "both"]),
  description: z.string(),
  startingAt: z.string(),
  duration: z.string(),
  features: z.array(z.string()),
  icon: z.string().optional(),
});

export type Service = z.infer<typeof ServiceSchema>;

export const services: Service[] = [
  {
    id: "hospitality-turnover",
    title: "Hospitality Turnover Support",
    category: "hospitality",
    description: "High-velocity touch-ups and safety verification between check-out and check-in to protect RevPAR.",
    startingAt: "$99 per room",
    duration: "2-4 hrs",
    features: [
      "Priority dispatch for block-outs and VIP suites",
      "Paint, drywall, and hardware repairs",
      "Quality assurance walkthroughs",
      "Guest-ready detail clean-up",
    ],
    icon: "RotateCw",
  },
  {
    id: "preventative-maintenance",
    title: "Preventative Maintenance",
    category: "both",
    description: "Scheduled HVAC, plumbing, and electrical sweeps that keep teams ahead of failures and inspector checklists.",
    startingAt: "$229 per visit",
    duration: "4-6 hrs",
    features: [
      "Mechanical system health diagnostics",
      "GA/ADA compliance checkpoints",
      "Predictive replacements and parts tracking",
      "Analyst-grade reporting",
    ],
    icon: "ShieldCheck",
  },
  {
    id: "facility-audits",
    title: "Facility Audits & Condition Reports",
    category: "hospitality",
    description: "Executive-level condition reports that support CapEx planning, compliance, and vendor oversight.",
    startingAt: "$1,200 per property",
    duration: "1-3 days",
    features: [
      "Systems prioritization matrix",
      "Cost forecasting & risk grading",
      "Photo documentation & digital binder",
      "Vendor performance review",
    ],
    icon: "ClipboardCheck",
  },
  {
    id: "residential-support",
    title: "Residential & Homeowner Support",
    category: "residential",
    description: "Responsive service for local homeowners, vacation rental hosts, and property managers needing trusted field crews.",
    startingAt: "$89 per dispatch",
    duration: "1-2 hrs",
    features: [
      "Same-day dispatch window",
      "Fed-up home warranty fixes",
      "Transparent pricing + digital receipts",
      "Optional preventative plans",
    ],
    icon: "Home",
  },
  {
    id: "installations",
    title: "FF&E & Smart Installations",
    category: "both",
    description: "FF&E rollouts, AV/mounting, smart room upgrades, and custom fixtures executed with hospitality precision.",
    startingAt: "$65 per tech-hr",
    duration: "Varies",
    features: [
      "Volume TV & device mount programs",
      "Smart thermostat & guest control installs",
      "Artwork & mirror security hanging",
      "Low-voltage & data prep",
    ],
    icon: "Wrench",
  },
  {
    id: "painting",
    title: "Commercial Painting & Coatings",
    category: "hospitality",
    description: "Corridor refreshes, exterior coatings, and accent walls that uphold brand standards with minimal downtime.",
    startingAt: "$399 per zone",
    duration: "1-2 days",
    features: [
      "Low-VOC coatings & quick-curing finishes",
      "Protective masking + noise control",
      "Detailed QA before reopening",
      "Exterior & pool area coatings",
    ],
    icon: "Paintbrush",
  },
];
