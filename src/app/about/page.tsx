import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Briefcase, Award, Users, Zap, Heart } from 'lucide-react';
import Link from 'next/link';

const values = [
  {
    icon: Zap,
    title: 'Reliability',
    description: 'We show up on time, every time. No ghosting, no excuses. Just quality work you can depend on.'
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'We treat your home with respect. We clean up after ourselves and ensure you are happy with the result.'
  },
  {
    icon: Award,
    title: 'Quality Craftsmanship',
    description: 'We take pride in our work. From painting to repairs, we do it right the first time.'
  },
  {
    icon: Users,
    title: 'Local & Trusted',
    description: 'Serving Fort Walton Beach, Destin, and surrounding areas. We are your neighbors.'
  }
];

const milestones = [
  { year: '2023', title: 'Founded', description: 'Started as a local handyman service to help neighbors with small repairs.' },
  { year: '2024', title: 'Expanded Services', description: 'Added painting, TV mounting, and trash hauling to our list of services.' },
  { year: '2025', title: 'Serving the Community', description: 'Growing our team to serve more homeowners and businesses in the Emerald Coast.' }
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
                Your Local Maintenance Experts
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                K&W Maintenance started with a simple goal: to provide reliable, high-quality handyman services to our community. We understand that finding a trustworthy contractor can be hard, so we strive to be the easy choice for all your home repair needs.
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
                Quality Work, Honest Pricing
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                We believe that every homeowner deserves quality repairs at a fair price. We are transparent about our costs and always aim to exceed your expectations.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our principles are simple: <strong className="text-foreground">Integrity</strong> (honest work), <strong className="text-foreground">Reliability</strong> (showing up on time), and <strong className="text-foreground">Quality</strong> (doing the job right).
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
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground">Growing with You</h2>
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

        {/* CTA */}
        <section className="py-20 md:py-32 container-custom px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-6">
              Ready to fix up your home?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Contact us today for a free quote on any of our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity">
                Get a Quote
              </Link>
              <Link href="/services" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-primary/20 text-foreground font-semibold hover:bg-primary/5 transition-colors">
                View Services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
