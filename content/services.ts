
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
    id: "handyman-services",
    title: "HANDY-MAN SERVICES",
    description: "Repairs, punch lists, small fixes, and upkeep to keep homes and properties guest-ready.",
    features: ["Punch Lists", "Small Fixes", "General Upkeep", "Guest-Ready Repairs"],
    icon: "Hammer"
  },
  {
    id: "installations",
    title: "INSTALLATIONS",
    description: "Fixtures, hardware, shelves, TVs, and more—installed securely with a clean finish.",
    features: ["Fixtures", "Hardware", "Shelving", "TVs"],
    icon: "Wrench"
  },
  {
    id: "painting",
    title: "PAINTING",
    description: "Touch-ups to full rooms—prep-focused painting for a durable, tidy result.",
    features: ["Touch-ups", "Full Rooms", "Prep-Focused", "Clean Finish"],
    icon: "Paintbrush"
  },
  {
    id: "tv-mounting",
    title: "TV MOUNTING",
    description: "Secure mounting, clean alignment, optional cable management, and respectful wall care.",
    features: ["Secure Mounting", "Clean Alignment", "Cable Management", "Wall Care"],
    icon: "Tv"
  },
  {
    id: "moving-trash-disposal",
    title: "MOVING AND TRASH DISPOSAL",
    description: "Load-up, haul-off, and cleanup—fast removal with responsible disposal.",
    features: ["Load-up", "Haul-off", "Cleanup", "Responsible Disposal"],
    icon: "Trash"
  },
  {
    id: "haul-services",
    title: "TRUCK AND TRAILER HAUL SERVICES",
    description: "Bigger loads, dump runs, deliveries, and trailer hauling when you need muscle and a rig.",
    features: ["Big Loads", "Dump Runs", "Deliveries", "Trailer Hauling"],
    icon: "Truck"
  }
];
