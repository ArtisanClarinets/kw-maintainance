
import { z } from "zod";
import { Hammer, Wrench, Paintbrush, Tv, Truck, Trash2 } from "lucide-react";

export const ServiceSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  icon: z.any(),
});

export type Service = z.infer<typeof ServiceSchema>;

export const services: Service[] = [
  {
    id: "handyman-services",
    title: "General Handyman Services",
    description: "Reliable repairs for everything from squeaky doors to drywall holes. We fix the small things before they become big problems.",
    features: [
      "Drywall repair & patching",
      "Door & window adjustments",
      "Hardware replacement",
      "General home maintenance",
    ],
    icon: Hammer,
  },
  {
    id: "installations",
    title: "Professional Installations",
    description: "Expert installation for fixtures, appliances, and smart home devices. Done right the first time.",
    features: [
      "Light fixtures & ceiling fans",
      "Smart locks & doorbells",
      "Shelving & storage units",
      "Blinds & curtain rods",
    ],
    icon: Wrench,
  },
  {
    id: "painting",
    title: "Interior & Exterior Painting",
    description: "Refresh your home with professional painting services. Clean lines, quality paint, and meticulous prep work.",
    features: [
      "Interior room painting",
      "Trim & baseboard painting",
      "Cabinet refinishing",
      "Deck staining & sealing",
    ],
    icon: Paintbrush,
  },
  {
    id: "tv-mounting",
    title: "TV Mounting & Setup",
    description: "Secure mounting for TVs of all sizes. We hide the wires for a clean, professional look.",
    features: [
      "Wall mounting (all bracket types)",
      "Wire concealment",
      "Soundbar installation",
      "Device setup",
    ],
    icon: Tv,
  },
  {
    id: "moving-services",
    title: "Moving Services",
    description: "Local moving assistance for apartments and small homes. Careful handling of your furniture and boxes.",
    features: [
      "Loading & unloading help",
      "Furniture disassembly/assembly",
      "Local transport",
      "Packing assistance",
    ],
    icon: Truck,
  },
  {
    id: "trash-disposal",
    title: "Trash Disposal & Hauling",
    description: "We haul away your unwanted junk, yard waste, and construction debris. Quick and hassle-free.",
    features: [
      "Furniture removal",
      "Appliance disposal",
      "Yard waste cleanup",
      "Construction debris hauling",
    ],
    icon: Trash2,
  },
];
