
import { z } from "zod";

export const ServiceDetailSchema = z.object({
  id: z.string(),
  title: z.string(),
  longDescription: z.string(),
  benefits: z.array(z.string()),
  process: z.array(z.object({
    title: z.string(),
    description: z.string()
  })),
  note: z.string().optional()
});

export type ServiceDetail = z.infer<typeof ServiceDetailSchema>;

export const serviceDetails: ServiceDetail[] = [
  {
    id: "handyman-services",
    title: "HANDY-MAN SERVICES",
    longDescription: "We provide reliable repairs, punch lists, small fixes, and general upkeep to keep homes and properties guest-ready. Whether it's a sticking door, a loose handle, or minor drywall damage, we handle it quickly and professionally.",
    benefits: [
      "Quick response time for urgent repairs",
      "Professional and respectful service",
      "Focus on quality and durability",
      "Ideal for homeowners and property managers"
    ],
    process: [
      { title: "Tell us what you need", description: "Send us a message or give us a call with details about the repair." },
      { title: "Estimate", description: "We provide a quick estimate range when possible." },
      { title: "Schedule", description: "We schedule a time that works for you." },
      { title: "Completion", description: "We complete the work and clean up." }
    ],
    note: "Send photos of the issue for faster quoting."
  },
  {
    id: "installations",
    title: "INSTALLATIONS",
    longDescription: "From fixtures and hardware to shelves and specialized equipment, we ensure everything is installed securely with a clean finish. We pay attention to the details so you don't have to.",
    benefits: [
        "Secure and safe installation",
        "Clean finish with no mess left behind",
        "Experience with a variety of fixtures",
        "Proper tools for every job"
    ],
    process: [
        { title: "Tell us what you need", description: "Let us know what needs to be installed." },
        { title: "Estimate", description: "We provide a quick estimate range when possible." },
        { title: "Schedule", description: "We schedule a time that works for you." },
        { title: "Completion", description: "We complete the work and clean up." }
      ],
  },
  {
    id: "painting",
    title: "PAINTING",
    longDescription: "Whether it's touch-ups or full rooms, we focus on prep-work to ensure a durable and tidy result. We respect your property and ensure clean lines and even coats.",
    benefits: [
        "Meticulous preparation",
        "Clean lines and even coverage",
        "Respect for your furniture and floors",
        "Efficient completion"
    ],
    process: [
        { title: "Tell us what you need", description: "Describe the painting project (room size, walls vs trim)." },
        { title: "Estimate", description: "We provide a quick estimate range when possible." },
        { title: "Schedule", description: "We schedule a time that works for you." },
        { title: "Completion", description: "We complete the work and clean up." }
      ],
  },
  {
    id: "tv-mounting",
    title: "TV MOUNTING",
    longDescription: "We provide secure mounting, clean alignment, optional cable management, and respectful wall care. Trust us to hang your TV exactly where you want it, safely and level.",
    benefits: [
        "Secure mounting into studs or proper anchors",
        "Perfectly level alignment",
        "Cable management options",
        "Clean workspace"
    ],
    process: [
        { title: "Tell us what you need", description: "Let us know the TV size and wall type." },
        { title: "Estimate", description: "We provide a quick estimate range when possible." },
        { title: "Schedule", description: "We schedule a time that works for you." },
        { title: "Completion", description: "We complete the work and clean up." }
      ],
      note: "Please have the mount ready or let us know if you need one supplied."
  },
  {
    id: "moving-trash-disposal",
    title: "MOVING AND TRASH DISPOSAL",
    longDescription: "We handle load-up, haul-off, and cleanup. Fast removal with responsible disposal for when you need to clear out space or move items.",
    benefits: [
        "Fast and efficient removal",
        "Responsible disposal",
        "Heavy lifting included",
        "Site cleanup after removal"
    ],
    process: [
        { title: "Tell us what you need", description: "Send photos of the items to be moved or disposed." },
        { title: "Estimate", description: "We provide a quick estimate range when possible." },
        { title: "Schedule", description: "We schedule a time that works for you." },
        { title: "Completion", description: "We complete the work and clean up." }
      ],
  },
  {
    id: "haul-services",
    title: "TRUCK AND TRAILER HAUL SERVICES",
    longDescription: "For bigger loads, dump runs, deliveries, and trailer hauling when you need muscle and a rig. We have the equipment to move what you can't.",
    benefits: [
        "Capable of hauling large loads",
        "Trailer available for bulk items",
        "Reliable transport",
        "Dump runs and deliveries"
    ],
    process: [
        { title: "Tell us what you need", description: "Describe the load and destination." },
        { title: "Estimate", description: "We provide a quick estimate range when possible." },
        { title: "Schedule", description: "We schedule a time that works for you." },
        { title: "Completion", description: "We complete the work and clean up." }
      ],
  }
];
