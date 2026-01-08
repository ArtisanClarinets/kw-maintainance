import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowRight, CheckCircle2, Zap, Users, BarChart3, Shield } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: Users,
    title: 'Consultation & Estimate',
    description: 'We start by understanding exactly what your home needs. Whether it is a leaky faucet or a room refresh, we listen to your goals and provide a clear, honest assessment.',
    details: [
      'Onsite walkthrough and project review',
      'Discussion of budget and timeline',
      'Transparent, upfront pricing estimates',
      'No hidden service fees or surprises'
    ]
  },
  {
    icon: BarChart3,
    title: 'Smart Scheduling',
    description: 'We respect your time. We book a specific window that works for your life, and we actually show up when we say we will. You get clear updates so you are never left guessing.',
    details: [
      'Flexible booking windows to fit your day',
      'Text message confirmations and reminders',
      'GPS tracking so you know when we are close',
      'Digital calendar invites for your convenience'
    ]
  },
  {
    icon: Zap,
    title: 'Expert Repair',
    description: 'Our skilled craftsmen arrive fully equipped to get the job done right the first time. We work efficiently, respect your property, and maintain a clean workspace.',
    details: [
      'Fully tooled and uniformed professionals',
      'Multi-skill coverage (Plumbing, Electrical, Carpentry)',
      'High-quality materials and parts',
      'Protection for your floors and furniture'
    ]
  },
  {
    icon: CheckCircle2,
    title: 'Final Inspection',
    description: 'We do not leave until the job is done to your satisfaction. We walk you through the repair, ensure everything is clean, and provide a warranty on our workmanship.',
    details: [
      'Complete walkthrough of completed work',
      'Thorough job site cleanup',
      'Satisfaction guarantee verification',
      'Digital receipt and warranty details'
    ]
  }
];

export default function HowItWorks() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-muted/20 border-b border-border/40 py-16 md:py-24">
          <div className="container-custom px-4">
            <div className="max-w-4xl">
              <p className="text-sm uppercase tracking-[0.5em] text-muted-foreground mb-4">Reliable Home Services</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-serif text-foreground mb-6">
                How KW Maintenance Works
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                From the first call to the final cleanup, our process is designed to be stress-free. We bring professional reliability to home repair, ensuring your to-do list gets done right.
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-20 md:py-32 container-custom px-4">
          <div className="space-y-20">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${!isEven ? 'md:grid-cols-2 md:[direction:rtl]' : ''}`}>
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>
                      <span className="text-sm font-bold text-primary uppercase tracking-widest">Step {idx + 1}</span>
                    </div>
                    <h2 className="text-3xl font-bold font-serif text-foreground mb-4">{step.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{step.description}</p>
                    <ul className="space-y-3">
                      {step.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-base text-foreground/90">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="hidden md:flex items-center justify-center">
                    <div className="relative w-full aspect-square bg-gradient-to-br from-primary/10 to-accent/5 rounded-3xl border border-border/40 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-grid-small-white/5 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_20%,black)]" />
                      <Icon className="h-32 w-32 text-primary/20" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Trust Signals */}
        <section className="bg-muted/30 border-y border-border/40 py-16 md:py-24">
          <div className="container-custom px-4">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.5em] text-muted-foreground mb-2">Service Standards</p>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground">Why Homeowners Trust KW</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-2xl border border-border/40">
                <Shield className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Fully Insured</h3>
                <p className="text-muted-foreground">Rest easy knowing every technician is licensed, background-checked, and fully insured for your protection.</p>
              </div>
              <div className="bg-card p-8 rounded-2xl border border-border/40">
                <Zap className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Fast Response</h3>
                <p className="text-muted-foreground">We answer the phone and we show up on time. No ghosting, no 8-hour arrival windows, just reliable service.</p>
              </div>
              <div className="bg-card p-8 rounded-2xl border border-border/40">
                <BarChart3 className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Fair Pricing</h3>
                <p className="text-muted-foreground">We provide clear quotes before we start. You pay for quality work, not overhead or hidden surcharges.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 container-custom px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-6">
              Ready to fix your to-do list?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact us today for a free estimate and see how easy home maintenance can be with KW.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
              Schedule Service <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}