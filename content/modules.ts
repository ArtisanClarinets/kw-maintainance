import { Wrench, Truck, Boxes, Wifi, BarChart3, ShieldCheck } from "lucide-react";

export const modules = [
  {
    slug: "work-orders",
    title: "Precision Work Orchestration",
    description: "Standardized protocols, mobile service execution, and quality-gated work streams for zero-defect maintenance.",
    icon: Wrench,
    features: [
        "Intelligent routing based on technician certification & proximity",
        "Mandatory quality benchmarks for critical asset service",
        "Field-ready mobile execution with offline synchronization",
        "Evidence custody for comprehensive service verification"
    ]
  },
  {
    slug: "dispatch",
    title: "Dynamic Resource Deployment",
    description: "Multi-constraint optimization engine that maximizes SLA compliance and minimizes response latency.",
    icon: Truck,
    features: [
        "Real-time deployment path optimization",
        "Automatic certification & competency matching",
        "Strategic SLA risk prediction & proactive escalation",
        "Rapid redistribution framework for emergency scenarios"
    ]
  },
  {
    slug: "assets",
    title: "Asset Stewardship & TCO",
    description: "Rigorous lifecycle management mirroring institutional asset hierarchies with predictive cost modeling.",
    icon: BarChart3,
    features: [
        "Hierarchical institutional asset registry",
        "Real-time TCO modeling vs. replacement valuation",
        "Systemic liability detection for performance outliers",
        "Integrated warranty stewardship & automated recovery"
    ]
  },
  {
    slug: "inventory",
    title: "Multi-Node Logistics",
    description: "Orchestrate inventory across central distribution hubs, property depots, and mobile service stock.",
    icon: Boxes,
    features: [
        "Live visibility across all regional inventory nodes",
        "Threshold-driven replenishment synchronization",
        "Internal chain-of-custody & stock transfer tracking",
        "Rapid parts consumption via integrated visual scanning"
    ]
  },
  {
    slug: "iot-predictive",
    title: "Predictive Infrastructure",
    description: "Harness telemetry from building automation systems to initiate proactive interventions before guest impact.",
    icon: Wifi,
    features: [
        "Universal integration for institutional building protocols",
        "Edge-processed anomaly detection & filtering",
        "Automated service triggers from predictive thresholds",
        "Critical alert validation & noise suppression"
    ]
  },
  {
    slug: "security",
    title: "Institutional Accountability",
    description: "High-integrity architecture with granular oversight and immutable operational records.",
    icon: ShieldCheck,
    features: [
        "Granular Role-Based Access Governance",
        "Immutable append-only operational ledgers",
        "Privacy stewardship & data retention protocols",
        "Global regulatory compliance frameworks"
    ]
  }
];
