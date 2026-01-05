
import { z } from "zod";

export const ServiceDetailSchema = z.object({
  id: z.string(),
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
  handyman: {
    id: "handyman",
    longDescription:
      "When things break or need updating around your home or business, you need a reliable partner who can handle it all. Our handyman services cover a vast range of general repairs and maintenance tasks. From fixing squeaky doors and patching drywall to assembling furniture and replacing fixtures, we take care of the 'to-do' list that keeps piling up. We pride ourselves on quick response times, quality workmanship, and leaving your space cleaner than we found it.",
    included: [
      "General Home Repairs",
      "Door & Window Maintenance",
      "Drywall Patching & Texture",
      "Furniture Assembly",
      "Cabinet Hardware Installation",
      "Caulking & Grouting",
      "Trim & Baseboard Repair",
      "Punch List Items",
    ],
    processSteps: [
      {
        title: "Consultation",
        body: "We discuss your list of repairs and provide a clear, upfront estimate.",
      },
      {
        title: "Scheduling",
        body: "We find a time that works for you, respecting your busy schedule.",
      },
      {
        title: "Execution",
        body: "Our skilled technicians arrive with the right tools to get the job done efficiently.",
      },
      {
        title: "Review",
        body: "We walk through the completed work with you to ensure your total satisfaction.",
      },
    ],
    seoDescription:
      "Expert handyman services in Fort Walton Beach. We handle repairs, drywall, assembly, and maintenance with reliability and care.",
  },
  installations: {
    id: "installations",
    longDescription:
      "Proper installation is key to the longevity and performance of your home's fixtures and appliances. We provide professional installation services that ensure everything is set up correctly, safely, and securely. Whether you're upgrading your lighting, installing new ceiling fans to beat the Florida heat, or setting up smart home devices, our team has the technical know-how to get it done right the first time.",
    included: [
      "Ceiling Fan Installation",
      "Light Fixture Upgrades",
      "Smart Home Device Setup",
      "Appliance Installation",
      "Shelf & Storage Mounting",
      "Curtain Rods & Blinds",
      "Bathroom Hardware",
      "Pet Door Installation",
    ],
    processSteps: [
      {
        title: "Assessment",
        body: "We check existing wiring and structural support to ensure a safe installation.",
      },
      {
        title: "Installation",
        body: "We install your new fixtures using professional-grade hardware and techniques.",
      },
      {
        title: "Testing",
        body: "We thoroughly test functionality to ensure everything works perfectly.",
      },
      {
        title: "Cleanup",
        body: "We remove all packaging and debris, leaving your space ready to use.",
      },
    ],
    seoDescription:
      "Professional installation services for fans, lights, appliances, and smart devices. Safe, secure, and done right.",
  },
  painting: {
    id: "painting",
    longDescription:
      "A fresh coat of paint can completely transform the look and feel of your property. Our painting services focus on meticulous preparation and high-quality finishes. We understand that the secret to a great paint job lies in the prep work—cleaning, sanding, and priming before a drop of paint is applied. Whether it's touching up high-traffic areas, repainting a room, or refreshing exterior trim, we deliver crisp lines and durable results.",
    included: [
      "Interior Wall Painting",
      "Exterior Trim & Siding",
      "Cabinet Refinishing",
      "Deck & Fence Staining",
      "Drywall Repair & Prep",
      "Accent Walls",
      "Ceiling Painting",
      "Door Painting",
    ],
    processSteps: [
      {
        title: "Preparation",
        body: "We protect your furniture and floors, then clean and repair surfaces.",
      },
      {
        title: "Priming",
        body: "We apply high-quality primer where needed to ensure lasting adhesion.",
      },
      {
        title: "Painting",
        body: "We apply premium paint with precision for a smooth, consistent finish.",
      },
      {
        title: "Inspection",
        body: "We perform a final walkthrough to ensure every detail meets our high standards.",
      },
    ],
    seoDescription:
      "High-quality interior and exterior painting services. Meticulous prep and premium finishes for your home or business.",
  },
  "tv-mounting": {
    id: "tv-mounting",
    longDescription:
      "Get the perfect viewing angle and a clean, wire-free look with our professional TV mounting services. We handle installations on all wall types, including drywall, brick, and stone. Our experts ensure your TV is level, secure, and positioned exactly where you want it. We also specialize in cable concealment and soundbar installation to give your entertainment area a polished, cinematic feel.",
    included: [
      "Flat Screen Wall Mounting",
      "Cable Concealment / Hiding",
      "Soundbar Installation",
      "Projector Mounting",
      "Brick & Stone Mounting",
      "Articulating Arm Setup",
      "Shelf Installation",
      "Wire Management",
    ],
    processSteps: [
      {
        title: "Site Survey",
        body: "We help you choose the optimal location and height for the best viewing experience.",
      },
      {
        title: "Mounting",
        body: "We securely attach the mount to studs or appropriate anchors for maximum safety.",
      },
      {
        title: "Cable Management",
        body: "We route cables neatly or conceal them within the wall for a clean look.",
      },
      {
        title: "Setup",
        body: "We mount the TV, connect devices, and ensure everything is level and secure.",
      },
    ],
    seoDescription:
      "Expert TV mounting services for all wall types. Secure installation, cable concealment, and soundbar setup.",
  },
  "moving-trash": {
    id: "moving-trash",
    longDescription:
      "Moving and cleaning up shouldn't be a hassle. We offer efficient moving assistance and responsible trash disposal services to help you clear the clutter. Whether you're moving apartments, clearing out a garage, or dealing with post-project debris, our team handles the heavy lifting. We focus on responsible disposal, recycling whenever possible, and ensuring your property is left spotless.",
    included: [
      "Local Moving Assistance",
      "Junk Removal",
      "Garage Cleanouts",
      "Construction Debris Removal",
      "Appliance Disposal",
      "Furniture Removal",
      "Yard Waste Cleanup",
      "Estate Cleanouts",
    ],
    processSteps: [
      {
        title: "Quote",
        body: "Send us photos or schedule a visit for an accurate, no-surprise quote.",
      },
      {
        title: "Scheduling",
        body: "We arrive on time with the right vehicle and manpower for the job.",
      },
      {
        title: "Hauling",
        body: "We quickly and safely remove items, respecting your property.",
      },
      {
        title: "Disposal",
        body: "We transport items to appropriate recycling or disposal facilities.",
      },
    ],
    seoDescription:
      "Reliable moving help and trash disposal services. Junk removal, cleanouts, and debris hauling in Fort Walton Beach.",
  },
  hauling: {
    id: "hauling",
    longDescription:
      "For those bigger jobs that require more than a pickup truck, our truck and trailer haul services are the answer. We transport large items, deliver materials like mulch or gravel, and haul away substantial loads of debris. Our equipment allows us to handle heavy-duty tasks efficiently, saving you the time and expense of renting a truck yourself. We are reliable, insured, and ready to haul.",
    included: [
      "Large Item Transport",
      "Material Delivery (Mulch, Soil)",
      "Construction Material Hauling",
      "Dump Runs",
      "Trailer Services",
      "Equipment Transport",
      "Scrap Metal Hauling",
      "Pallet Removal",
    ],
    processSteps: [
      {
        title: "Logistics",
        body: "We determine the load size and schedule the appropriate equipment.",
      },
      {
        title: "Loading",
        body: "We safely load and secure materials for transport.",
      },
      {
        title: "Transport",
        body: "We deliver to your specified location or disposal site promptly.",
      },
      {
        title: "Unloading",
        body: "We unload materials exactly where you need them.",
      },
    ],
    seoDescription:
      "Heavy-duty hauling services for materials, large items, and debris. Reliable truck and trailer transport.",
  },
};
