"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, CloudSun, Calendar, MapPin, Phone, Activity } from "lucide-react";
import { GulfGrid } from "./GulfGrid";
import { SpotlightCard } from "@/react-bits/SpotlightCard";
import { useOpsData } from "@/hooks/useOpsData";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export function HeroVisual() {
  const { data, loading } = useOpsData();

  function readableAction(action: string) {
    if (!action) return '';
    if (action.includes('IOT_TRIGGER')) return 'Work order created';
    // Replace underscores and dashes, downcase then capitalize
    const s = action.replace(/[_-]+/g, ' ').toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  if (loading || !data) {
    return (
      <div className="relative w-full h-[450px] md:h-[600px] flex items-center justify-center overflow-hidden rounded-2xl border border-border/20 shadow-2xl bg-background/50 backdrop-blur-sm">
        <GulfGrid />
        <div className="relative z-10 w-full max-w-sm">
           <SpotlightCard className="glass p-6 border-white/20 dark:border-white/10 shadow-2xl">
              <div className="animate-pulse flex flex-col items-center gap-4">
                  <div className="h-8 w-full bg-muted/20 rounded"></div>
                  <div className="h-24 w-full bg-muted/20 rounded"></div>
                  <div className="h-12 w-full bg-muted/20 rounded"></div>
              </div>
           </SpotlightCard>
        </div>
      </div>
    );
  }

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
                    <h3 className="text-lg font-bold font-serif text-foreground">Service Availability</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="relative flex h-2 w-2">
                          <span className={cn(
                            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                            data.availability.status === "Available" ? "bg-green-400" : 
                            data.availability.status === "Limited" ? "bg-yellow-400" : "bg-red-400"
                          )}></span>
                          <span className={cn(
                            "relative inline-flex rounded-full h-2 w-2",
                            data.availability.status === "Available" ? "bg-green-500" : 
                            data.availability.status === "Limited" ? "bg-yellow-500" : "bg-red-500"
                          )}></span>
                        </span>
                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                            {data.availability.status === "Available" ? "Available" : 
                             data.availability.status === "Limited" ? "Limited" : "Booked"}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Serving</span>
                    <div className="flex items-center gap-1 bg-accent/10 px-2 py-1 rounded text-accent text-xs font-bold border border-accent/20">
                        <MapPin className="h-3 w-3" />
                        {data.userLocation}
                    </div>
                </div>
            </div>

            {/* Actionable Data Grid */}
            <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="bg-background/40 rounded-lg p-2 flex flex-col items-center text-center border border-border/20 group hover:border-accent/50 transition-colors">
                    <Calendar className="h-4 w-4 text-blue-400 mb-1" />
                    <span className="text-[10px] text-muted-foreground uppercase">Next Slot</span>
                    <span className="text-xs font-bold whitespace-nowrap">{data.availability.nextSlot}</span>
                </div>
                <div className="bg-background/40 rounded-lg p-2 flex flex-col items-center text-center border border-border/20 group hover:border-accent/50 transition-colors">
                    <CloudSun className="h-4 w-4 text-teal-400 mb-1" />
                    <span className="text-[10px] text-muted-foreground uppercase">Weather</span>
                    <span className="text-xs font-bold">{data.weather.temp}° {data.weather.condition}</span>
                </div>
                 <div className="bg-background/40 rounded-lg p-2 flex flex-col items-center text-center border border-border/20 group hover:border-accent/50 transition-colors">
                    <Check className={cn("h-4 w-4 mb-1", data.availability.canComeToday ? "text-green-400" : "text-yellow-400")} />
                    <span className="text-[10px] text-muted-foreground uppercase">Today?</span>
                    <span className="text-xs font-bold">{data.availability.canComeToday ? "YES" : "NO"}</span>
                </div>
            </div>

            {/* Active Zones / Smart Map List */}
            <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Active Zones</p>
                    <span className="text-[10px] text-green-500 animate-pulse">● Live Updates</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {data.activeZones.map((zone, idx) => (
                        <motion.div
                            key={zone.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className={cn(
                                "flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium transition-colors cursor-default",
                                zone.status === "Active" 
                                    ? "bg-primary/10 border-primary/30 text-primary" 
                                    : "bg-background/60 border-border/30 text-muted-foreground"
                            )}
                        >
                            {zone.status === "Active" && <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />}
                            {zone.name}
                            {zone.activeJobs > 0 && (
                                <span className="ml-1 text-[9px] opacity-70 bg-background/50 px-1 rounded">
                                    {zone.activeJobs}
                                </span>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Tactical CTA */}
            <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => {
                    trackEvent("click_call_now", { location: data.userLocation });
                    window.location.href = "tel:850-851-3640";
                  }}
                  className="relative w-full bg-primary text-primary-foreground font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 overflow-hidden group hover:brightness-110 transition-all active:scale-[0.98]"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <Phone className="h-4 w-4 fill-current" />
                    <span>CALL NOW</span>
                </button>
            </div>

            {/* Recent jobs ticker */}
            <div className="mt-4 pt-3 border-t border-border/30">
                 <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-2">
                     <Activity className="h-3 w-3" />
                     <span className="uppercase tracking-wider">Recent Jobs</span>
                 </div>
                 <div className="h-6 overflow-hidden relative">
                    <AnimatePresence mode="popLayout">
                        {data.recentActivity.slice(0, 1).map((activity) => (
                            <motion.div
                                key={activity.id}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="flex items-center justify-between text-xs font-mono text-foreground/80"
                            >
                                <span className="flex items-center gap-2">
                                    <span className="text-accent">[{activity.timestamp}]</span>
                                    <span>{readableAction(activity.action)}</span>
                                </span>
                                <span className="opacity-60 text-[10px] uppercase">{activity.location}</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                 </div>
            </div>

            {/* readableAction helper (driver-friendly text) */}

        </SpotlightCard>
      </motion.div>
    </div>
  );
}
