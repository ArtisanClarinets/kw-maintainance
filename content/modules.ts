import { Wrench, Truck, Boxes, Wifi, BarChart3, ShieldCheck } from "lucide-react";

export const modules = [
  {
    slug: "work-orders",
    title: "Expert Repairs",
    description: "Quality repairs for drywall, paint, plumbing fixtures, and electrical components. We get it right the first time.",
    icon: Wrench,
    features: [
        "Certified and background-checked technicians",
        "Quality guarantee on all workmanship",
        "Clean workspace policy - we leave no mess",
        "Photo documentation of completed work"
    ]
  },
  {
    slug: "dispatch",
    title: "Reliable Scheduling",
    description: "We show up when we say we will. Real-time updates and clear communication so you're never left guessing.",
    icon: Truck,
    features: [
        "Appointment windows that we actually keep",
        "Text message updates when technician is en route",
        "Emergency service availability",
        "Efficient routing to minimize wait times"
    ]
  },
  {
    slug: "assets",
    title: "Preventative Maintenance",
    description: "Regular check-ups for your property's vital systems to prevent costly breakdowns and extend equipment life.",
    icon: BarChart3,
    features: [
        "Seasonal HVAC filter and coil cleaning",
        "Water heater flushing and inspection",
        "Gutter cleaning and roof inspections",
        "Safety device testing (smoke/CO detectors)"
    ]
  },
  {
    slug: "inventory",
    title: "Parts & Logistics",
    description: "We arrive fully stocked with common parts to complete most repairs in a single visit, saving you time and money.",
    icon: Boxes,
    features: [
        "Fully stocked service vehicles",
        "Relationships with local suppliers for hard-to-find parts",
        "Inventory management for vacation rental consumables",
        "Transparent material pricing"
    ]
  },
  {
    slug: "iot-predictive",
    title: "Smart Home Installation",
    description: "Expert installation and setup of smart thermostats, locks, cameras, and other connected home devices.",
    icon: Wifi,
    features: [
        "Smart lock installation and programming",
        "Video doorbell and security camera setup",
        "Smart thermostat configuration",
        "Wi-Fi network optimization"
    ]
  },
  {
    slug: "security",
    title: "Trust & Safety",
    description: "Your peace of mind is our priority. We are fully licensed, insured, and committed to safety.",
    icon: ShieldCheck,
    features: [
        "Comprehensive general liability insurance",
        "Worker's compensation coverage",
        "Strict safety protocols",
        "Respect for your privacy and property"
    ]
  }
];
