"use client";

import Link from 'next/link';
import { Button } from './Button';
import { motion } from 'framer-motion';
import { Star, CheckCircle, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/../content/site';

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
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              K & W Hospitality and <br className="hidden md:block" />
              <span className="text-primary">Maintainance Services LLC.</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Handy-man services, installations, painting, TV mounting, moving & trash disposal, and truck/trailer haul services for Fort Walton Beach and surrounding areas.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="w-full sm:w-auto text-base bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20" asChild>
                    <a href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        Call / Text William: {siteConfig.phone}
                    </a>
                  </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base border-primary/20 hover:bg-primary/5" asChild>
                    <Link href="/contact">Request a Quote</Link>
                  </Button>
              </motion.div>
            </motion.div>

            {/* Trust Anchor */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 text-sm font-medium text-foreground/80 mt-6 pt-6 border-t border-border/50">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>Locally Owned</span>
              </div>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Professional</span>
              </div>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Fort Walton Beach</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Right */}
          <div className="relative">
             <div className="rounded-2xl bg-muted/50 border border-border/50 aspect-square flex items-center justify-center p-8">
                <div className="text-center">
                    <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-xl font-bold text-foreground">Licensed & Insured</p>
                    <p className="text-muted-foreground mt-2">Serving Fort Walton Beach with pride.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
