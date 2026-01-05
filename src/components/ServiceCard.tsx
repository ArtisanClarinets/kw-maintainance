
"use client";

import { motion } from "framer-motion";
import { ArrowRight, Hammer, Wrench, Paintbrush, Tv, Truck, Container } from "lucide-react";
import Link from "next/link";


// Icon mapping based on the content/services.ts strings
const IconMap: Record<string, React.ElementType> = {
  Hammer,
  Wrench,
  Paintbrush,
  Tv,
  Truck,
  Container,
};

interface ServiceCardProps {
  id: string; // Added ID for navigation
  title: string;
  description: string;
  iconName?: string;
  features: string[];
}

export function ServiceCard({ id, title, description, iconName, features }: ServiceCardProps) {
  const Icon = iconName ? IconMap[iconName] : Hammer;

  return (
    <Link href={`/services/${id}`} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl">
      <motion.div
        whileHover="hover"
        initial="initial"
        className="group relative h-full bg-card rounded-2xl border border-border/40 p-6 md:p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:border-accent/50 overflow-hidden"
      >
        {/* Background Gradient/Glow on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon */}
        <div className="mb-6 relative z-10">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
            <Icon className="h-6 w-6" />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-xl md:text-2xl font-bold font-serif mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-8">
            {features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-center text-sm text-foreground/80">
                <span className="h-1.5 w-1.5 rounded-full bg-accent mr-2" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Learn More Arrow */}
          <div className="flex items-center text-sm font-semibold text-primary overflow-hidden">
            <span className="mr-2">Learn More</span>
            <motion.div
              variants={{
                initial: { x: -10, opacity: 0 },
                hover: { x: 0, opacity: 1 },
              }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
