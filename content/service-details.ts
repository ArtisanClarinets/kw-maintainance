
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
      "In the hospitality industry, downtime translates directly to lost revenue. Our Preventative Maintenance (PM) program is designed to keep your hotel or resort operating at peak efficiency. By addressing wear and tear before it becomes a failure, we extend the lifespan of your critical assets—from HVAC systems to in-room fixtures. We offer tiered contracts (Bronze, Silver, Gold) tailored to your property's specific needs, ensuring budget predictability and compliance with safety standards.",
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
      "The window between a guest checking out and the next checking in is critical. Our Hospitality Turnover Services ensure your rooms are perfect every time. We work seamlessly with your housekeeping staff to handle the repairs they can't: paint scuffs, broken drawer glides, loose fixtures, and damaged drywall. We understand the urgency of the 11 AM to 3 PM window and provide rapid response teams to protect your guest satisfaction scores.",
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
      "Knowledge is power when managing large properties. Our Facility Audits provide a deep dive into the condition of your physical plant. Whether for due diligence before an acquisition, annual budget planning (CapEx), or safety compliance, our detailed reports give you the data you need. We inspect structural elements, mechanical systems, and aesthetic conditions, prioritizing issues by urgency and estimated cost.",
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
      "Even well-managed properties face unexpected issues. Our General Maintenance service provides a reliable, professional solution for the day-to-day repairs that keep a business running. From a stuck door to a damaged sign, we handle it with the same level of professionalism as major projects. We act as an extension of your engineering team or as your primary maintenance partner.",
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
      "Upgrading your property often involves complex installations. Whether you are rolling out new smart TVs across 100 rooms or updating lobby lighting, our Commercial Installation team ensures it's done right. We specialize in FF&E (Furniture, Fixtures, and Equipment) installation, handling logistics, assembly, and mounting with precision. We ensure all installations meet safety codes and manufacturer specifications.",
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
        body: "We conduct a walkthrough to ensure coverage and lines meet our 'Fortune 500' standard.",
      },
    ],
    seoDescription:
      "Commercial painting contractors for hotels and resorts. Interior and exterior painting, coatings, and refinishing services.",
  },
};
