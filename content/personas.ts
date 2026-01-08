import { LucideIcon, User, Briefcase, HardHat, Shield } from "lucide-react";

interface Persona {
    id: string;
    title: string;
    role: string;
    icon: LucideIcon;
    painPoints: string[];
    valueProp: string;
}

export const personas: Persona[] = [
    {
        id: "homeowner",
        title: "The Homeowner",
        role: "Local Resident",
        icon: User,
        painPoints: [
            "Contractors not showing up or calling back",
            "Unclear pricing and surprise fees",
            "Poor quality work that needs fixing later"
        ],
        valueProp: "Reliable, communicative service with transparent pricing and quality you can trust."
    },
    {
        id: "property-manager",
        title: "Property Manager",
        role: "Vacation Rentals",
        icon: Briefcase,
        painPoints: [
            "Emergency repairs needed during guest stays",
            "Tight turnover windows between check-ins",
            "Coordinating multiple vendors for one property"
        ],
        valueProp: "One-call solution for turnovers, maintenance, and emergency repairs to keep guests happy."
    },
    {
        id: "hotel-gm",
        title: "Hotel GM",
        role: "Hospitality Lead",
        icon: HardHat,
        painPoints: [
            "Maintenance backlog affecting room availability",
            "Staff shortages during peak seasons",
            "Inconsistent quality in room repairs"
        ],
        valueProp: "Professional augmentation for your engineering team to clear backlogs and maintain standards."
    },
    {
        id: "landlord",
        title: "The Landlord",
        role: "Long-term Rentals",
        icon: Shield,
        painPoints: [
            "Late night emergency calls from tenants",
            "Ensuring safety compliance (smoke detectors, etc.)",
            "Protecting property value between tenants"
        ],
        valueProp: "Hands-off maintenance management that keeps your tenants safe and your investment protected."
    }
];
