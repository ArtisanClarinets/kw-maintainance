
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
    id: "handyman",
    title: "HANDY-MAN SERVICES",
    description: "Reliable handyman services for all your home and business repair needs. No job is too small.",
    features: ["General Repairs", "Fixture Replacement", "Door & Window Repair", "Drywall Patching"],
    icon: "Hammer"
  },
  {
    id: "installations",
    title: "INSTALLATIONS",
    description: "Professional installation services for appliances, fixtures, and more.",
    features: ["Appliance Installation", "Ceiling Fans", "Light Fixtures", "Smart Home Devices"],
    icon: "Wrench"
  },
  {
    id: "painting",
    title: "PAINTING",
    description: "Interior and exterior painting to refresh your space.",
    features: ["Interior Painting", "Exterior Painting", "Touch-ups", "Deck Staining"],
    icon: "Paintbrush"
  },
  {
    id: "tv-mounting",
    title: "TV MOUNTIONG",
    description: "Secure and clean TV mounting for any wall type.",
    features: ["Wall Mounting", "Cable Concealment", "Soundbar Installation", "Projector Setup"],
    icon: "Tv"
  },
  {
    id: "moving-trash",
    title: "MOVING AND TRASH DISPOSAL",
    description: "Efficient moving assistance and responsibly trash disposal.",
    features: ["Local Moving Help", "Junk Removal", "Construction Debris", "Yard Waste"],
    icon: "Truck"
  },
  {
    id: "hauling",
    title: "TRUCK AND TRAILER HAUL SERVICES",
    description: "Heavy-duty hauling for large items and materials.",
    features: ["Material Delivery", "Large Item Hauling", "Trailer Services", "Dump Runs"],
    icon: "Container"
  }
];
