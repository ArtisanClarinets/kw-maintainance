
"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const items = [
  { id: 1, text: "HVAC Maintenance", checked: true },
  { id: 2, text: "Plumbing Repair", checked: true },
  { id: 3, text: "Electrical Safety", checked: true },
  { id: 4, text: "Professional Cleaning", checked: true },
];

export function HeroVisual() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute -top-10 -right-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-10 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      {/* Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        whileHover={{ y: -5 }}
        className="relative z-10 bg-white/80 dark:bg-card/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-6 w-full max-w-sm"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Task List</h3>
            <p className="text-sm text-muted-foreground">Today's Schedule</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
             <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
             >
                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
             </motion.div>
          </div>
        </div>

        <div className="space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/50"
            >
              <div className="h-5 w-5 rounded bg-accent flex items-center justify-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                >
                    <Check className="h-3 w-3 text-accent-foreground" />
                </motion.div>
              </div>
              <span className="text-sm font-medium text-foreground">{item.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeInOut" }}
            className="mt-6 h-1 bg-green-500 rounded-full"
        />
        <p className="text-xs text-right mt-2 text-green-600 font-medium">100% Complete</p>

      </motion.div>
    </div>
  );
}
