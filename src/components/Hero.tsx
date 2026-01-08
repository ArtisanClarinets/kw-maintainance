"use client";

import Link from 'next/link';
import { Button } from './Button';
import { HeroVisual } from './HeroVisual';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, MapPin } from 'lucide-react';
import { siteConfig } from '../../content/site';

export function Hero() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-muted/30 py-12 md:py-24 lg:py-32 px-4">
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Left */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Tagline Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Serving Fort Walton Beach & Destin
              </div>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Reliable Handyman & Maintenance Services
              <span className="text-primary block mt-2">Done Right.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Professional repairs, installations, painting, and hauling services for your home or business. Fast, friendly, and fully insured.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="w-full sm:w-auto text-base bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20" asChild>
                    <Link href="/request-demo">Get a Free Quote</Link>
                  </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base border-primary/20 hover:bg-primary/5" asChild>
                    <a href={`tel:${siteConfig.phone}`}>Call {siteConfig.phone}</a>
                  </Button>
              </motion.div>
            </motion.div>

            {/* Trust Anchor */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 text-sm font-medium text-foreground/80 mt-6 pt-6 border-t border-border/50">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>5-Star Service</span>
              </div>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Licensed & Insured</span>
              </div>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Locally Owned</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Right */}
          <div className="relative">
             <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
