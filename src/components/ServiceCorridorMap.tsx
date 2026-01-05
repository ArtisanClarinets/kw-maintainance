"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const locations = [
  { name: "Pensacola", x: "10%", y: "40%" },
  { name: "Navarre", x: "30%", y: "50%" },
  { name: "Fort Walton Beach", x: "45%", y: "45%" },
  { name: "Destin", x: "60%", y: "55%" },
  { name: "30A", x: "75%", y: "60%" },
  { name: "PCB", x: "90%", y: "50%" },
];

export const ServiceCorridorMap = () => {
  return (
    <div className="relative w-full aspect-[2/1] bg-muted/30 rounded-2xl overflow-hidden border border-border/50 backdrop-blur-sm">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>

      {/* Coastline Abstract Line */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <path
          d="M0,50 Q25,40 50,55 T100,60"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary/20"
        />
      </svg>

      {locations.map((loc, index) => (
        <motion.div
          key={loc.name}
          className="absolute flex flex-col items-center gap-2"
          style={{ left: loc.x, top: loc.y }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="relative group">
            <div className="absolute -inset-2 bg-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
            <div className="w-4 h-4 bg-accent rounded-full flex items-center justify-center shadow-lg ring-2 ring-background">
               <div className="w-1.5 h-1.5 bg-background rounded-full" />
            </div>
            {/* Tooltip-like label */}
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card/90 backdrop-blur border border-border/50 px-3 py-1 rounded-md shadow-sm">
                <span className="text-xs font-semibold text-foreground">{loc.name}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
