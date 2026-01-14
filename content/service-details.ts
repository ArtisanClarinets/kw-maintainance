
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
  "handyman-services": {
    id: "handyman-services",
    title: "RESIDENTIAL HANDYMAN",
    longDescription:
      "From squeaky doors to drywall holes, our General Handyman Services cover the small but annoying repairs that pile up around your home. We provide a professional, uniformed technician who arrives on time with the right tools to get your to-do list done in a single visit.",
    included: [
      "Drywall Patching & Texture Matching",
      "Door Adjustment & Hardware Replacement",
      "Cabinet Hardware Installation",
      "Baseboard & Trim Repair",
      "Furniture Assembly",
      "Picture & Mirror Hanging",
      "Weatherstripping Installation",
      "Window Screen Repair",
    ],
    processSteps: [
      {
        title: "Book",
        body: "Schedule a time that works for you via our online form or phone.",
      },
      {
        title: "Assess",
        body: "Our technician reviews your to-do list and confirms the scope of work.",
      },
      {
        title: "Fix",
        body: "We work efficiently to complete repairs, keeping your home clean.",
      },
      {
        title: "Enjoy",
        body: "We walk you through the completed work to ensure your satisfaction.",
      },
    ],
    seoDescription:
      "Local handyman services in Fort Walton Beach. Expert repairs for drywall, doors, and general home maintenance.",
  },
  "installations": {
    id: "installations",
    title: "HOME INSTALLATIONS",
    longDescription:
      "Upgrade your home without the hassle. Our Professional Installation service ensures your new fixtures, smart devices, and storage solutions are installed securely and correctly. We handle the wiring, mounting, and setup so you can enjoy your upgrades immediately.",
    included: [
      "Ceiling Fan Installation",
      "Light Fixture Replacement",
      "Smart Doorbell & Lock Setup",
      "Shelving & Closet Organizers",
      "Curtain Rod & Blind Installation",
      "Bathroom Accessories (Towel Bars, etc.)",
      "Smart Thermostat Wiring",
      "Pet Door Installation",
    ],
    processSteps: [
      {
        title: "Select",
        body: "You purchase the fixture or device (or we can help you choose).",
      },
      {
        title: "Install",
        body: "We safely remove old fixtures and professionally install the new ones.",
      },
      {
        title: "Setup",
        body: "We verify everything works, including connecting smart devices to Wi-Fi.",
      },
      {
        title: "Clean",
        body: "We haul away the packaging and leave the area spotless.",
      },
    ],
    seoDescription:
      "Professional home installation services. Ceiling fans, light fixtures, smart locks, and window treatments.",
  },
  "painting": {
    id: "painting",
    title: "INTERIOR & EXTERIOR PAINTING",
    longDescription:
      "A fresh coat of paint transforms a room. Our Residential Painting service delivers crisp lines, smooth finishes, and thorough preparation. whether it's a single accent wall or your home's exterior, we use high-quality paints and protect your furniture and floors with care.",
    included: [
      "Interior Wall & Ceiling Painting",
      "Trim, Baseboard, & Door Painting",
      "Cabinet Painting & Refinishing",
      "Exterior Siding Painting",
      "Deck & Fence Staining",
      "Wallpaper Removal",
      "Drywall Repair & Priming",
      "Color Consultation",
    ],
    processSteps: [
      {
        title: "Prep",
        body: "We move furniture, cover floors, and mask off all non-painted areas.",
      },
      {
        title: "Repair",
        body: "We fill holes, caulk gaps, and sand surfaces for a smooth base.",
      },
      {
        title: "Paint",
        body: "We apply premium paint with precision for consistent coverage.",
      },
      {
        title: "Review",
        body: "We conduct a final walkthrough with you to spot-check every inch.",
      },
    ],
    seoDescription:
      "Residential painting services in Fort Walton Beach. Interior and exterior painting, cabinet refinishing, and deck staining.",
  },
  "tv-mounting": {
    id: "tv-mounting",
    title: "TV MOUNTING & SETUP",
    longDescription:
      "Get the perfect home theater setup with our TV Mounting service. We mount TVs of all sizes on drywall, brick, or stone, ensuring they are level and secure. We specialize in concealing wires for a clean, modern look and can help set up your soundbar and streaming devices.",
    included: [
      "Secure Wall Mounting (Any Surface)",
      "In-Wall Wire Concealment",
      "External Cord Cover Installation",
      "Soundbar Mounting",
      "Floating Shelf Installation",
      "Device Connection & Setup",
      "Packaging Removal",
      "Old TV Haul-Away (Add-on)",
    ],
    processSteps: [
      {
        title: "Assess",
        body: "We check the wall structure and viewing angles to find the perfect spot.",
      },
      {
        title: "Mount",
        body: "We install the bracket into studs or anchors for maximum safety.",
      },
      {
        title: "Hide",
        body: "We route cables behind the wall or in neat covers.",
      },
      {
        title: "Connect",
        body: "We hook up your devices and ensure the TV is level and working.",
      },
    ],
    seoDescription:
      "Professional TV wall mounting service. Wire concealment, soundbar setup, and secure installation for all TV sizes.",
  },
  "moving-services": {
    id: "moving-services",
    title: "LOCAL MOVING HELP",
    longDescription:
      "Need extra hands for a move? Our Moving Services are perfect for apartment moves, appliance transport, or rearranging furniture within your home. We provide the muscle and the truck for small local moves, ensuring your items are handled with care.",
    included: [
      "Apartment & Small Home Moves",
      "Furniture Loading & Unloading",
      "In-Home Furniture Rearranging",
      "Appliance Pick-up & Delivery",
      "Furniture Disassembly & Assembly",
      "Packing Assistance",
      "Storage Unit Runs",
      "Safe Heavy Item Lifting",
    ],
    processSteps: [
      {
        title: "Plan",
        body: "Tell us what you need moved and where.",
      },
      {
        title: "Load",
        body: "Our team arrives to carefully wrap and load your items.",
      },
      {
        title: "Transport",
        body: "We drive your items safely to their new destination.",
      },
      {
        title: "Place",
        body: "We unload and place furniture exactly where you want it.",
      },
    ],
    seoDescription:
      "Local moving services for apartments and small homes. Furniture delivery, loading help, and packing assistance.",
  },
  "trash-disposal": {
    id: "trash-disposal",
    title: "TRASH & JUNK REMOVAL",
    longDescription:
      "Clear out the clutter with our Trash Disposal & Hauling service. From old furniture and broken appliances to yard waste and construction debris, we haul it all. We recycle and donate whenever possible to minimize landfill waste.",
    included: [
      "Furniture Removal (Sofas, Mattresses)",
      "Appliance Disposal (Fridges, Washers)",
      "Yard Waste Cleanup",
      "Construction Debris Hauling",
      "Garage & Attic Cleanouts",
      "Rental Property Cleanouts",
      "Curbside Pickup",
      "Eco-Friendly Disposal",
    ],
    processSteps: [
      {
        title: "Quote",
        body: "Send us a photo or list for an instant estimate.",
      },
      {
        title: "Haul",
        body: "We arrive, load up the junk, and sweep the area clean.",
      },
      {
        title: "Dispose",
        body: "We transport items to the appropriate recycling or disposal facility.",
      },
      {
        title: "Done",
        body: "You enjoy your reclaimed space instantly.",
      },
    ],
    seoDescription:
      "Junk removal and trash hauling services. We take furniture, appliances, yard waste, and construction debris.",
  },
};
