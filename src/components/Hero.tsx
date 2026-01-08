"use client";

import Link from 'next/link';
import { Button } from './Button';
import { HeroVisual } from './HeroVisual';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

interface UpcomingAppointment {
  id: string;
  title: string;
  startAt: string;
  propertyId?: string;
  status: string;
}

export function Hero() {
  const [nextSlot, setNextSlot] = useState<string | null>(null);
  const [upcoming, setUpcoming] = useState<UpcomingAppointment[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchNextSlot() {
      try {
        const res = await fetch("/api/ops/next-slot", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load slot");
        const data = await res.json();
        if (cancelled) return;

        const formatter = new Intl.DateTimeFormat("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });

        setNextSlot(formatter.format(new Date(data.nextSlot)));
        setUpcoming((data.upcoming ?? []).map((appt: UpcomingAppointment) => ({
          id: appt.id,
          title: appt.title,
          startAt: appt.startAt,
          status: appt.status,
        })));
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("Unable to fetch dispatch data");
        }
      }
    }

    fetchNextSlot();
    return () => {
      cancelled = true;
    };
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
              <div className="inline-flex flex-col gap-1 rounded-2xl border border-border/80 bg-muted/80 px-4 py-3">
                <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Next slot</span>
                <span className="text-xl font-bold text-foreground">{nextSlot ?? "Calculating..."}</span>
                <span className="text-xs text-muted-foreground">Rules driven by live scheduling</span>
                {error && <span className="text-xs text-destructive">{error}</span>}
              </div>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              Professional Maintenance & Repairs
              <span className="text-primary">for Home & Hospitality</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-muted-foreground max-w-xl leading-relaxed">
              Licensed handyman services, turnover support, and reliable repairs for homeowners and property managers in Fort Walton Beach and beyond.
            </motion.p>
            {upcoming.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-2 mt-4">
                <div className="text-sm font-semibold text-foreground tracking-wider">Upcoming slots</div>
                <div className="grid gap-2 text-sm text-muted-foreground">
                  {upcoming.map((appt) => (
                    <div key={appt.id} className="flex items-center justify-between rounded-lg border border-border/50 bg-muted/60 px-3 py-2">
                      <span>{appt.title}</span>
                      <span className="text-xs uppercase tracking-wide text-foreground/70">{new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).format(new Date(appt.startAt))}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mt-2">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="w-full sm:w-auto text-base bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20" asChild>
                    <Link href="/contact">Request Service</Link>
                  </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base border-primary/20 hover:bg-primary/5" asChild>
                    <Link href="/whitepaper">Operational Brief</Link>
                  </Button>
              </motion.div>
            </motion.div>

            {/* Trust Anchor */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 text-sm font-medium text-foreground/80 mt-6 pt-6 border-t border-border/50">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span>5-Star Rated</span>
              </div>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Licensed & Insured</span>
              </div>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Local Experts</span>
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
