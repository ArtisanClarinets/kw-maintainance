import { Wrench, Truck, Boxes, Wifi, BarChart3, ShieldCheck } from "lucide-react";

export const modules = [
  {
    slug: "work-orders",
    title: "Intelligent Work Orders",
    description: "Automated SOPs, mobile execution, and QC-gated workflows for zero-defect maintenance.",
    icon: Wrench,
    features: [
        "Smart routing based on technician skill & proximity",
        "Mandatory QC checkpoints for critical assets",
        "Offline-first mobile execution",
        "Evidence locker for photo/video documentation"
    ]
  },
  {
    slug: "dispatch",
    title: "Algorithmic Dispatch",
    description: "Constraint-based scheduling engine that optimizes for SLA compliance and travel time.",
    icon: Truck,
    features: [
        "Real-time route optimization",
        "Skill & certification matching constraints",
        "SLA breach prediction & auto-escalation",
        "Mass reshuffle capabilities for emergency response"
    ]
  },
  {
    slug: "assets",
    title: "Asset Lifecycle & TCO",
    description: "Complete hierarchy management from property to component with predictive TCO modeling.",
    icon: BarChart3,
    features: [
        "Hierarchical asset registry (N-level deep)",
        "Real-time TCO calculation vs. Replacement Value",
        "Bad actor detection for recurring failures",
        "Warranty tracking & auto-claim generation"
    ]
  },
  {
    slug: "inventory",
    title: "Multi-Echelon Inventory",
    description: "Manage stock across central warehouses, satellite closets, and mobile truck stock.",
    icon: Boxes,
    features: [
        "Real-time stock levels across all locations",
        "Automated replenishment triggers",
        "Truck stock transfer & custody tracking",
        "QR-code based parts consumption"
    ]
  },
  {
    slug: "iot-predictive",
    title: "IoT & Predictive",
    description: "Ingest telemetry from any BMS or sensor to trigger automated pre-emptive work orders.",
    icon: Wifi,
    features: [
        "Universal connector for BACnet/Modbus/MQTT",
        "Edge-computed anomaly detection rules",
        "Automated WO creation from sensor thresholds",
        "Noise filtering & duplicate alert suppression"
    ]
  },
  {
    slug: "security",
    title: "Enterprise Security",
    description: "SOC2 Type II ready architecture with granular RBAC and immutable audit logs.",
    icon: ShieldCheck,
    features: [
        "Role-Based Access Control (RBAC)",
        "Immutable append-only audit trails",
        "PII anonymization & retention policies",
        "GDPR & CCPA compliance tools"
    ]
  }
];
