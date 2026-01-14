"use client";

import { motion } from "framer-motion";
import { ArrowRight, Hammer, Wrench, Paintbrush, ShieldCheck, RotateCw, ClipboardCheck, Home, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Loading } from "./ui/loading";

// Icon mapping based on the content/services.ts strings
const IconMap: Record<string, React.ElementType> = {
  Hammer,
  Wrench,
  Paintbrush,
  ShieldCheck,
  RotateCw,
  ClipboardCheck,
  Home,
};

interface ServiceCardProps {
  slug: string;
  title: string;
  description: string;
  icon?: React.ReactNode | string;
  features: string[];
  isLoading?: boolean;
  hasError?: boolean;
  errorMessage?: string;
  loadingText?: string;
  basePath?: string;
}

  
export function ServiceCard({ 
  slug, 
  title, 
  description, 
  icon, 
  features, 
  isLoading = false, 
  hasError = false, 
  errorMessage = "Failed to load service information",
  loadingText = "Loading service...",
  basePath = "/services"
}: ServiceCardProps) {
  // Support passing either a React node (e.g. <Wrench />) or an icon name string (e.g. "Wrench")
  let iconElement: React.ReactNode;
  if (typeof icon === "string" && IconMap[icon]) {
    const IconComp = IconMap[icon] as React.ComponentType<React.SVGProps<SVGSVGElement> & { className?: string }>;
    iconElement = <IconComp className="h-6 w-6" />;
  } else {
    iconElement = icon ?? <Hammer className="h-6 w-6" />;
  }

  if (isLoading) {
    return (
      <div className="h-full bg-card rounded-2xl border border-border/40 p-6 md:p-8 shadow-md flex flex-col items-center justify-center min-h-[300px]">
        <Loading variant="spinner" size="md" color="text-primary" text={loadingText} />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="h-full bg-card rounded-2xl border border-destructive/30 p-6 md:p-8 shadow-md flex flex-col items-center justify-center min-h-[300px] text-center">
        <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-6 h-6 text-destructive" />
        </div>
        <h4 className="font-semibold text-destructive mb-2">Error Loading Service</h4>
        <p className="text-sm text-destructive/80">{errorMessage}</p>
        <Button variant="outline" size="sm" className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <Link href={`${basePath}/${slug}`} className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-2xl">
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        initial={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }} // Premium weighted physics
        className="group relative h-full bg-card rounded-2xl border border-border/40 p-6 md:p-8 shadow-md transition-shadow duration-300 hover:shadow-2xl hover:border-accent/50 overflow-hidden will-change-transform"
        aria-busy={isLoading}
        aria-invalid={hasError}
      >
        {/* Background Gradient/Glow on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon */}
        <div className="mb-6 relative z-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
          >
            {iconElement}
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <motion.h3
            whileHover={{ x: 2 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 500, damping: 10 }}
            className="text-xl md:text-2xl font-bold font-serif mb-3 group-hover:text-primary transition-colors"
          >
            {title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
            className="text-muted-foreground leading-relaxed mb-6"
          >
            {description}
          </motion.p>

          {/* Features */}
          <ul className="space-y-2 mb-8">
            {features.slice(0, 3).map((feature, idx) => (
              <motion.li
                key={idx}
                whileHover={{ x: 3, opacity: 1 }}
                initial={{ opacity: 0.8 }}
                className="flex items-center text-sm text-foreground/80 cursor-default"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent mr-2" />
                {feature}
              </motion.li>
            ))}
          </ul>

          {/* Learn More Arrow */}
          <div className="flex items-center text-sm font-semibold text-primary overflow-hidden">
            <span className="mr-2">Learn More</span>
            <motion.div
              variants={{
                initial: { x: -5, opacity: 0 },
                hover: { x: 0, opacity: 1 },
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              initial="initial"
              whileHover="hover"
            >
              <ArrowRight className="h-4 w-4" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
