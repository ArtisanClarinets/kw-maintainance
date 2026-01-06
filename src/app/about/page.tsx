import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Briefcase, Award, MapPin, Users, Zap, Heart } from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    icon: Zap,
    title: 'Operational Excellence',
    description: 'We optimize every crew deployment, every schedule window, every asset lifecycle to squeeze maximum value from your facility.'
  },
  {
    icon: Heart,
    title: 'Guest Experience First',
    description: 'Invisible maintenance means happy guests. Our teams work fast, clean up well, and fix right the first time.'
  },
  {
    icon: Award,
    title: 'Compliance & Trust',
    description: 'Licensed crews, insured work, audited quality. Your operations depend on vendors you can verify and track.'
  },
  {
    icon: Users,
    title: 'Local Expertise',
    description: 'Fort Walton Beach, Destin, 30A—we know the market, the supply chains, and the weather patterns.'
  }
];

const milestones = [
  { year: '2023', title: 'Operational Pivot', description: 'Shifted from consumer handyman to B2B hospitality maintenance with tiered contracts.' },
  { year: '2024', title: 'Dispatch System Launch', description: 'Built the Ops Console with real-time crew tracking, scheduling rules, and compliance dashboards.' },
  { year: '2025', title: 'Fortune 500 Infrastructure', description: 'Achieved SOC2 compliance, enterprise-grade uptime, and multi-tenant support.' }
];

export default function About() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-muted/20 border-b border-border/40 py-16 md:py-24">
          <div className="container-custom px-4">
            <div className="max-w-4xl">
              <p className="text-sm uppercase tracking-[0.5em] text-muted-foreground mb-4">About Us</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-serif text-foreground mb-6">
                Hospitality Maintenance Reimagined
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                KW Hospitality Maintenance started with a simple insight: hospitality operators need contractors who understand the rhythm of guest cycles, turnover windows, and preventative discipline. We built an entire platform around that insight.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 md:py-32 container-custom px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.5em] text-muted-foreground mb-4">Mission</p>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-6">
                Deliver a Sovereign Digital Ecosystem
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We believe hospitality operators and homeowners deserve operators who combine craft expertise with operational transparency. No surprises. No guesswork. Just crews who show up, execute flawlessly, and document everything.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our platform embodies three principles: <strong className="text-foreground">Coherence</strong> (unified systems and communication), <strong className="text-foreground">Fluidity</strong> (seamless dispatch and scheduling), and <strong className="text-foreground">Resilience</strong> (24/7 availability, enterprise-grade uptime).
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-accent/5 rounded-3xl border border-border/40 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-grid-small-white/5 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_20%,black)]" />
                <Briefcase className="h-32 w-32 text-primary/20" />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-muted/30 border-y border-border/40 py-16 md:py-24">
          <div className="container-custom px-4">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.5em] text-muted-foreground mb-2">Core Values</p>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground">What We Stand For</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <div key={idx} className="bg-card p-8 rounded-2xl border border-border/40">
                    <Icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 md:py-32 container-custom px-4">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.5em] text-muted-foreground mb-2">Our Journey</p>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground">Evolution into Enterprise</h2>
          </div>
          <div className="space-y-12 max-w-3xl mx-auto">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="relative pb-12 last:pb-0">
                {idx < milestones.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-border/40" />
                )}
                <div className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                      {milestone.year.slice(-2)}
                    </div>
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-bold text-primary uppercase tracking-wider mb-1">{milestone.year}</p>
                    <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Philosophy */}
        <section className="bg-muted/30 border-y border-border/40 py-16 md:py-24">
          <div className="container-custom px-4">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.5em] text-muted-foreground mb-4">The KW Difference</p>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-6">
                Hospitality-Grade Operational Discipline
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our teams are trained to understand the operational rhythm of hospitality. A turnover window is sacred—we arrive pre-briefed, execute with precision, document with photos, and close with a digital work order. For commercial operators and homeowners alike, we bring the same discipline, transparency, and follow-through.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We invest in crew training, scheduling optimization, and compliance automation so you can focus on guest experience and asset longevity. That&apos;s not just maintenance—that&apos;s operational partnership.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 container-custom px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-6">
              Experience hospitality-grade maintenance
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Schedule an assessment and see how KW&apos;s operational discipline transforms your facility&apos;s uptime and team confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
                Request Assessment
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-primary/20 text-foreground font-semibold hover:bg-primary/5 transition-colors">
                Explore Services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
