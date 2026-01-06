"use client";

import Link from 'next/link';
import { Button } from './Button';
import { HeroVisual } from './HeroVisual';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Hero() {
  const [nextSlot, setNextSlot] = useState<string | null>(null);

  useEffect(() => {
    // Calculate next available 30-min slot (e.g., if 10:15, show 10:30. If 10:45, show 11:00)
    const now = new Date();
    const minutes = now.getMinutes();
    const nextSlotTime = new Date(now);
    
    if (minutes < 30) {
        nextSlotTime.setMinutes(30);
    } else {
        nextSlotTime.setHours(now.getHours() + 1);
        nextSlotTime.setMinutes(0);
    }
    
    // Format: "Today at HH:MM AM/PM"
    const formatter = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNextSlot(`Today at ${formatter.format(nextSlotTime)}`);
  }, []);

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
            {/* Next Slot Badge */}
            <motion.div variants={itemVariants}>
              <p className="text-sm text-muted-foreground mt-2">
                Next consultation session: <span className="text-primary font-mono font-bold">{nextSlot || 'Calculating...'}</span> — Secure your position.
              </p>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Hospitality Operations <br className="hidden md:block" />
              <span className="text-primary">Command Centre</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Orchestrate work protocols, optimize resource deployment, and master asset stewardship with the industry&apos;s most advanced management suite.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="w-full sm:w-auto text-base bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20" asChild>
                    <Link href="/request-demo">Request Consultation</Link>
                  </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base border-primary/20 hover:bg-primary/5" asChild>
                    <Link href="/whitepaper">Strategic Blueprint</Link>
                  </Button>
              </motion.div>
            </motion.div>

            {/* Trust Anchor */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 text-sm font-medium text-foreground/80 mt-6 pt-6 border-t border-border/50">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>Enterprise Grade</span>
              </div>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>SOC2 Compliant</span>
              </div>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Global Deployment</span>
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
