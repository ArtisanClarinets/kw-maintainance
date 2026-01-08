
import { z } from "zod";

export const ServiceDetailSchema = z.object({
  id: z.string(),
  title: z.string(),
  longDescription: z.string(),
  included: z.array(z.string()),
  processSteps: z.array(
    z.object({
      title: z.string(),
      body: z.string(),
    })
  ),
  faqs: z.array(
    z.object({
      q: z.string(),
      a: z.string(),
    })
  ).optional(),
  seoDescription: z.string(),
});

export type ServiceDetail = z.infer<typeof ServiceDetailSchema>;

export const serviceDetails: Record<string, ServiceDetail> = {
  "preventative-maintenance": {
    id: "preventative-maintenance",
    title: "PREVENTATIVE MAINTENANCE",
    longDescription:
      "Keep your property running with routine maintenance that prevents small problems from becoming costly repairs. Our Preventative Maintenance program covers HVAC, plumbing, electrical, and common-area checks so you can avoid unexpected failures. Choose a Bronze, Silver, or Gold plan to match your needs and keep maintenance predictable and worry-free.",
    included: [
      "HVAC Filter Replacement & Coil Cleaning",
      "Plumbing Leak Detection & Pressure Tests",
      "Electrical Safety Inspections (GFCI testing)",
      "PTAC Unit Maintenance",
      "Door Lock & Hardware Adjustments",
      "Emergency Light Testing",
      "Guest Room Audits (quarterly)",
      "Detailed Asset Health Reports",
    ],
    processSteps: [
      {
        title: "Audit",
        body: "We conduct a comprehensive site survey to catalog assets and identify current liabilities.",
      },
      {
        title: "Plan",
        body: "We customize a PM schedule that minimizes disruption to guests and operations.",
      },
      {
        title: "Execute",
        body: "Our certified technicians perform scheduled tasks, documenting everything digitally.",
      },
      {
        title: "Report",
        body: "You receive a detailed report with photos, completed tasks, and recommendations.",
      },
    ],
    seoDescription:
      "Commercial preventative maintenance for hotels and resorts in Fort Walton Beach. HVAC, plumbing, and safety inspections to prevent downtime.",
  },
  "turnover-services": {
    id: "turnover-services",
    title: "HOSPITALITY TURNOVER",
    longDescription:
      "Quick turnarounds keep guests happy. Our Turnover Services handle the repairs housekeeping can't finish: paint touch-ups, furniture fixes, hardware repairs, and quick plumbing or electrical touch-ups. We prioritize speed and quality so rooms are ready when you need them.",
    included: [
      "Rapid Drywall & Paint Touch-ups",
      "Furniture Repair & Stabilization",
      "Caulking (Bathrooms & Vanities)",
      "TV & Remote Programming Checks",
      "Bulb Replacement (Color Match Guarantee)",
      "Drain Clearing",
      "Grout Cleaning & Sealing",
      "Shower/Tub Hardware Repair",
    ],
    processSteps: [
      {
        title: "Dispatch",
        body: "Notify us of rooms requiring maintenance via our priority line or portal.",
      },
      {
        title: "Repair",
        body: "Our technicians arrive equipped to fix common issues immediately.",
      },
      {
        title: "Verify",
        body: "We verify functionality (lights, drains, locks) before leaving the room.",
      },
      {
        title: "Release",
        body: "We signal the room back to 'Clean/Vacant' status for your front desk.",
      },
    ],
    seoDescription:
      "Hotel room turnover maintenance services. Rapid repairs for painting, drywall, and fixtures between guest stays.",
  },
  "facility-audits": {
    id: "facility-audits",
    title: "FACILITY AUDITS",
    longDescription:
      "Our Facility Audits give you clear, actionable guidance about the condition of your property. We inspect structural, mechanical, and safety elements, prioritize issues by urgency, and provide realistic repair estimates so you can plan repairs and budgets with confidence.",

    included: [
      "Comprehensive Asset Condition Assessment",
      "ADA Compliance Review",
      "Life Safety Systems Check",
      "Roof & Building Envelope Inspection",
      "Energy Efficiency Opportunities",
      "Capital Expenditure (CapEx) Forecasting",
      "Vendor Performance Review",
      "Digital Photo Documentation",
    ],
    processSteps: [
      {
        title: "Scope",
        body: "We define the specific areas and systems to be inspected based on your goals.",
      },
      {
        title: "Inspect",
        body: "Our team systematically evaluates the property using standardized checklists.",
      },
      {
        title: "Analyze",
        body: "We compile data, estimate repair costs, and prioritize findings.",
      },
      {
        title: "Present",
        body: "We deliver a bound report and digital copy, presenting key findings to stakeholders.",
      },
    ],
    seoDescription:
      "Detailed facility audits and condition reports for commercial properties. CapEx planning, compliance checks, and asset management.",
  },
  handyman: {
    id: "handyman",
    title: "GENERAL MAINTENANCE",
    longDescription:
      "Unexpected repairs happen. Our General Maintenance service gives you fast, reliable help for everyday issues—stuck doors, drywall patches, furniture repair, and more. We show up on time, work cleanly, and get the job done right so you can focus on your business.",
    included: [
      "Door, Lock & Closer Repair",
      "Drywall Patching & Texture Matching",
      "Furniture Assembly & Repair",
      "Ceiling Tile Replacement",
      "Signage Installation & Repair",
      "Cubicle & Desk reconfiguration",
      "Shelving Installation",
      "Punch List Completion",
    ],
    processSteps: [
      {
        title: "Request",
        body: "Submit a work order with details and photos of the issue.",
      },
      {
        title: "Schedule",
        body: "We prioritize urgent requests and schedule standard repairs at your convenience.",
      },
      {
        title: "Repair",
        body: "Our uniformed technicians arrive on time and work discreetly.",
      },
      {
        title: "Complete",
        body: "We clean the work area and obtain sign-off on the completed repair.",
      },
    ],
    seoDescription:
      "Commercial handyman services in Fort Walton Beach. Reliable repairs for doors, drywall, furniture, and general maintenance.",
  },
  installations: {
    id: "installations",
    title: "COMMERCIAL INSTALLATIONS",
    longDescription:
      "Upgrading your property often involves complex installations. Whether you need TVs mounted, lighting updates, or new fixtures installed, our Commercial Installation team gets it done safely and efficiently. We handle receiving, staging, assembly, and secure mounting to meet manufacturer recommendations and safety codes.",
    included: [
      "Hotel TV & Mount Installation (Volume)",
      "Smart Room Thermostats & Controls",
      "Lobby & Common Area Lighting",
      "Artwork & Mirror Security Mounting",
      "Bathroom Vanities & Accessories",
      "Window Treatments (Blinds/Drapes)",
      "Digital Signage & Kiosks",
      "Gym Equipment Assembly",
    ],
    processSteps: [
      {
        title: "Plan",
        body: "We review floor plans and specs to determine placement and mounting requirements.",
      },
      {
        title: "Logistics",
        body: "We can assist with receiving and staging materials for large projects.",
      },
      {
        title: "Install",
        body: "We execute the installation with assembly-line efficiency for volume projects.",
      },
      {
        title: "Test",
        body: "We ensure every unit functions correctly and is securely mounted.",
      },
    ],
    seoDescription:
      "Commercial installation services for hotels and businesses. FF&E installation, TV mounting, smart devices, and lighting.",
  },
  painting: {
    id: "painting",
    title: "COMMERCIAL PAINTING",
    longDescription:
      "First impressions matter. Peeling paint or faded exteriors can degrade your property's perceived value. Our Commercial Painting services are tailored for high-traffic environments. We use durable, low-VOC coatings that dry quickly to minimize downtime. From refreshing miles of corridor walls to complete exterior repaints, we deliver a flawless finish that aligns with your brand standards.",
    included: [
      "Interior Corridor & Lobby Painting",
      "Guest Room Refresh Programs",
      "Exterior Building Coatings",
      "Parking Lot Striping",
      "Epoxy Floor Coatings",
      "Door & Trim Refinishing",
      "Stucco Repair & Painting",
      "Wallpaper Removal & Installation",
    ],
    processSteps: [
      {
        title: "Protect",
        body: "We aggressively protect floors, furniture, and fixtures before starting.",
      },
      {
        title: "Prep",
        body: "Surface preparation is key; we clean, sand, and patch for a lasting bond.",
      },
      {
        title: "Paint",
        body: "We apply premium commercial-grade paints efficiently.",
      },
      {
        title: "Inspect",
        body: "We conduct a final walkthrough to ensure even coverage and clean lines that meet our high standards.",
      },
    ],
    seoDescription:
      "Commercial painting contractors for hotels and resorts. Interior and exterior painting, coatings, and refinishing services.",
  },
};
