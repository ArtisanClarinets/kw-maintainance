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
        id: "vp-ops",
        title: "The VP of Operations",
        role: "Strategic Decision Maker",
        icon: Briefcase,
        painPoints: [
            "Lack of visibility into portfolio-wide maintenance spend",
            "Inconsistent brand standards across properties",
            "Unpredictable CapEx surprises"
        ],
        valueProp: "Unified command center for portfolio health, CapEx planning, and standardization."
    },
    {
        id: "gm",
        title: "The General Manager",
        role: "Property Leader",
        icon: User,
        painPoints: [
            "Room downtime affecting RevPAR",
            "Guest complaints about broken amenities",
            "Communication gaps between Front Desk and Engineering"
        ],
        valueProp: "Real-time room status sync and faster turnaround times to maximize occupancy."
    },
    {
        id: "chief-engineer",
        title: "The Chief Engineer",
        role: "Technical Lead",
        icon: HardHat,
        painPoints: [
            "Paper-based work orders getting lost",
            "Difficulty proving compliance during audits",
            "Managing parts inventory in spreadsheets"
        ],
        valueProp: "Digital tools to automate dispatch, track assets, and ensure audit-readiness."
    },
    {
        id: "security-compliance",
        title: "The Compliance Officer",
        role: "Risk Management",
        icon: Shield,
        painPoints: [
            "Data privacy risks with guest information",
            "Incomplete audit trails for safety inspections",
            "Vendor insurance expiration tracking"
        ],
        valueProp: "Bank-grade security, PII protection, and automated compliance tracking."
    }
];
