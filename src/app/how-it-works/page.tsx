import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArrowRight, CheckCircle2, Zap, Users, BarChart3, Shield } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    icon: Users,
    title: 'Initial Assessment',
    description: 'Our dispatch team evaluates your facility, staffing needs, and maintenance rhythm. We profile your property type—hotel, residential, resort—and establish baseline expectations.',
    details: [
      'Onsite walkthrough and asset inventory',
      'Operational constraints and emergency protocols',
      'Staffing & scheduling preferences',
      'Compliance & documentation requirements'
    ]
  },
  {
    icon: BarChart3,
    title: 'Scheduling Rules & Integration',
    description: 'We wire your maintenance windows into our ops system. Your team gets live visibility into crew availability, ETAs, and completion status via the Ops Console.',
    details: [
      'Lead-time requirements (e.g., 3-hour notice for turnover)',
      'Dispatch optimization with geographic clustering',
      'Real-time crew tracking and notifications',
      'JSON persistence of appointment history'
    ]
  },
  {
    icon: Zap,
    title: 'Rapid Deployment',
    description: 'When maintenance is needed, our crews mobilize within the next available slot. Turnover teams arrive pre-briefed with property notes, access codes, and safety checkpoints.',
    details: [
      'Pre-briefed crew assignments',
      'Multi-trade coordination (HVAC, plumbing, electrical)',
      'Real-time status updates to your dashboard',
      'Mobile checklists and photographic proof'
    ]
  },
  {
    icon: CheckCircle2,
    title: 'Audit & Compliance',
    description: 'Every job closes with a detailed work order. You get compliance documentation, cost reconciliation, and vendor scorecards to support your CapEx forecasting.',
    details: [
      'Work order detail with materials & labor',
      'Safety audit checklists for each job',
      'Vendor compliance and insurance verification',
      'Monthly KPI dashboards (response time, cost, quality)'
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
              <p className="text-sm uppercase tracking-[0.5em] text-muted-foreground mb-4">Operational Excellence</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-serif text-foreground mb-6">
                How KW Maintenance Operates
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                From assessment through audit, our process ensures dispatch-ready availability, transparent scheduling, and compliance-grade documentation. Built for hospitality operators and homeowners who demand reliability.
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
              <p className="text-sm uppercase tracking-[0.5em] text-muted-foreground mb-2">Enterprise Standards</p>
              <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground">Why Operators Trust KW</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-8 rounded-2xl border border-border/40">
                <Shield className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Compliance First</h3>
                <p className="text-muted-foreground">Every crew is licensed, insured, and audited. Documentation flows automatically to your compliance dashboard.</p>
              </div>
              <div className="bg-card p-8 rounded-2xl border border-border/40">
                <Zap className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Real-Time Visibility</h3>
                <p className="text-muted-foreground">Live GPS tracking, crew status, and job completion photos. Your team stays informed from dispatch to close-out.</p>
              </div>
              <div className="bg-card p-8 rounded-2xl border border-border/40">
                <BarChart3 className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">Data-Driven Insights</h3>
                <p className="text-muted-foreground">KPI dashboards show response times, cost trends, and quality metrics. Optimize maintenance spend with confidence.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 container-custom px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-6">
              Ready to streamline your maintenance?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Request an operational brief to see how KW can transform your facility's uptime and guest satisfaction.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
              Schedule Assessment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
