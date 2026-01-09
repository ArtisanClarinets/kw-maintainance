
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/Button';
import Link from 'next/link';
import { CheckCircle2, Phone, ClipboardList, Hammer, Calendar } from 'lucide-react';

const steps = [
  {
    icon: Phone,
    title: '1. Contact Us',
    description: 'Call us or fill out our online form to request a quote. Tell us about your project.'
  },
  {
    icon: ClipboardList,
    title: '2. Get an Estimate',
    description: 'We will provide a transparent estimate. For larger jobs, we can visit your property.'
  },
  {
    icon: Calendar,
    title: '3. Schedule Service',
    description: 'Pick a time that works for you. We are punctual and reliable.'
  },
  {
    icon: Hammer,
    title: '4. Job Completion',
    description: 'Our skilled team completes the work efficiently and cleans up afterwards.'
  }
];

export default function HowItWorks() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-muted/20 border-b border-border/40 py-16 md:py-24">
          <div className="container-custom px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold font-serif text-foreground mb-6">
              How It Works
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make home maintenance easy and stress-free. Here is what you can expect when you work with us.
            </p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20 md:py-32 container-custom px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
             {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                    <div key={idx} className="flex flex-col items-center text-center relative">
                        {idx < steps.length - 1 && (
                            <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-border/40 -z-10" />
                        )}
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                            <Icon className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                    </div>
                );
             })}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted/30 py-20 border-y border-border/40">
            <div className="container-custom px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">Ready to start?</h2>
                <Button size="lg" asChild>
                    <Link href="/request-demo">Get Your Free Quote</Link>
                </Button>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
