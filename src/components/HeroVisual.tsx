
"use client";

import { motion } from "framer-motion";
import { Check, Droplets, Wind, Zap, MapPin } from "lucide-react";
import { GulfGrid } from "./GulfGrid";
import { SpotlightCard } from "@/react-bits/SpotlightCard";

const locations = [
  { name: "Pensacola", status: "Active" },
  { name: "Navarre", status: "Active" },
  { name: "Destin", status: "Active" },
  { name: "30A", status: "Active" },
  { name: "PCB", status: "Queue" },
];

export function HeroVisual() {
  return (
    <div className="relative w-full h-[450px] md:h-[600px] flex items-center justify-center overflow-hidden rounded-2xl border border-border/20 shadow-2xl bg-background/50 backdrop-blur-sm">
      <GulfGrid />

      {/* Premium Ops Card */}
      <motion.div
        initial={{ y: 30, opacity: 0, rotateX: 10 }}
        animate={{ y: 0, opacity: 1, rotateX: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm"
      >
        <SpotlightCard className="glass p-6 border-white/20 dark:border-white/10 shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-border/30 pb-4">
                <div>
                    <h3 className="text-lg font-bold font-serif text-foreground">Gulf Coast Ops</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">System Online</span>
                    </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                    <Zap className="h-5 w-5 text-accent" />
                </div>
            </div>

            {/* Coastal Conditions */}
            <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="bg-background/40 rounded-lg p-2 flex flex-col items-center text-center border border-border/20">
                    <Droplets className="h-4 w-4 text-blue-400 mb-1" />
                    <span className="text-[10px] text-muted-foreground uppercase">Humidity</span>
                    <span className="text-xs font-bold">88%</span>
                </div>
                <div className="bg-background/40 rounded-lg p-2 flex flex-col items-center text-center border border-border/20">
                    <Wind className="h-4 w-4 text-teal-400 mb-1" />
                    <span className="text-[10px] text-muted-foreground uppercase">Salt Air</span>
                    <span className="text-xs font-bold">High</span>
                </div>
                 <div className="bg-background/40 rounded-lg p-2 flex flex-col items-center text-center border border-border/20">
                    <Check className="h-4 w-4 text-green-400 mb-1" />
                    <span className="text-[10px] text-muted-foreground uppercase">Ready</span>
                    <span className="text-xs font-bold">100%</span>
                </div>
            </div>

            {/* Coverage Map Chips */}
            <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Corridor Coverage</p>
                <div className="flex flex-wrap gap-2">
                    {locations.map((loc, idx) => (
                        <motion.div
                            key={loc.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/60 border border-border/30 text-xs font-medium"
                        >
                            <MapPin className="h-3 w-3 text-primary" />
                            {loc.name}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Active Status Bar */}
            <div className="mt-6 pt-4 border-t border-border/30">
                 <div className="flex justify-between text-xs mb-1">
                     <span className="text-muted-foreground">Fleet Status</span>
                     <span className="text-green-600 font-bold">Deployed</span>
                 </div>
                 <div className="h-1 w-full bg-muted overflow-hidden rounded-full">
                     <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 1.5, ease: "circOut", delay: 1 }}
                        className="h-full bg-accent w-full"
                     />
                 </div>
            </div>

        </SpotlightCard>
      </motion.div>
    </div>
  );
}
