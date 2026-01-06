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
        role: "Strategic Architect",
        icon: Briefcase,
        painPoints: [
            "Information asymmetry regarding portfolio-wide OpEx",
            "Variance in brand standard adherence across regions",
            "Unpredictable CapEx volatility"
        ],
        valueProp: "Unified command center for high-fidelity portfolio health and predictive stewardship."
    },
    {
        id: "gm",
        title: "The General Manager",
        role: "Institutional Lead",
        icon: User,
        painPoints: [
            "Asset downtime impacting RevPAR and guest experience",
            "Variance in amenity performance and stewardship",
            "Functional silos between Front Office and Engineering"
        ],
        valueProp: "Real-time ecosystem synchronization and reduced turnover latency."
    },
    {
        id: "chief-engineer",
        title: "The Chief Engineer",
        role: "Institutional Steward",
        icon: HardHat,
        painPoints: [
            "Legacy analog workflows causing information latency",
            "Complex compliance validation during institutional audits",
            "Fragmented inventory controls across disparate systems"
        ],
        valueProp: "Digital orchestration tools to automate deployment and ensure absolute audit-readiness."
    },
    {
        id: "security-compliance",
        title: "The Compliance Officer",
        role: "Risk Management",
        icon: Shield,
        painPoints: [
            "Guest privacy risks and data sovereignty",
            "Incomplete accountability records for safety inspections",
            "Complex vendor compliance and insurance tracking"
        ],
        valueProp: "Institutional-grade resilience, guest privacy stewardship, and automated audit-readiness."
    }
];
