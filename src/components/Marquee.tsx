
"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
}

interface MarqueeProps {
  testimonials: Testimonial[];
}

export function Marquee({ testimonials }: MarqueeProps) {
  // Duplicate the testimonials to ensure smooth infinite scroll
  const items = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="relative w-full overflow-hidden bg-background py-16">
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-background via-transparent to-background w-full h-full" />

      <div className="flex">
        <motion.div
          className="flex gap-8 px-4"
          animate={{ x: "-33.33%" }}
          transition={{
            ease: "linear",
            duration: 30, // Adjust speed
            repeat: Infinity,
          }}
        >
          {items.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="flex-shrink-0 w-[300px] md:w-[400px] p-6 rounded-xl border border-border/40 bg-card shadow-sm"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < item.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">"{item.text}"</p>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">{item.name}</span>
                <span className="text-xs text-muted-foreground">{item.location}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
