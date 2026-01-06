export const integrations = [
    {
        id: "pms",
        category: "PMS (Property Management Systems)",
        description: "Two-way synchronization of room status, occupancy, and guest requests.",
        partners: ["Oracle Opera", "Amadeus", "Cloudbeds", "Mews"],
        capabilities: [
            "Room status updates (Clean/Dirty/OOO)",
            "Guest profile sync for VIP requests",
            "Occupancy-based maintenance scheduling"
        ]
    },
    {
        id: "erp",
        category: "ERP & Financials",
        description: "Seamless posting of purchase orders, invoices, and inventory valuation.",
        partners: ["SAP S/4HANA", "Oracle NetSuite", "Microsoft Dynamics 365", "Workday"],
        capabilities: [
            "Purchase Order (PO) generation",
            "Invoice reconciliation",
            "Inventory valuation sync",
            "CapEx project tracking"
        ]
    },
    {
        id: "pos",
        category: "POS & Retail",
        description: "Unified view of maintenance issues in revenue-generating outlets.",
        partners: ["Micros Simphony", "Toast", "Lightspeed", "Agilysys"],
        capabilities: [
            "Equipment downtime tracking",
            "Revenue impact analysis",
            "Automated ticket creation from POS"
        ]
    },
    {
        id: "bms",
        category: "Building Automation (BMS)",
        description: "Direct ingestion of telemetry for predictive maintenance triggers.",
        partners: ["Honeywell", "Siemens Desigo", "Schneider Electric", "Johnson Controls"],
        capabilities: [
            "Real-time sensor ingestion",
            "Threshold-based alert generation",
            "Energy consumption correlation"
        ]
    }
];
