
import Link from 'next/link';
import { Button } from './Button';
import { Reveal } from '@/react-bits/Reveal';
import { MagneticButton } from '@/react-bits/MagneticButton';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-20 md:py-32 px-4">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white/0 dark:from-blue-950/20 dark:to-transparent" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-fg mb-6">
              Professional Hospitality & <br className="hidden md:block" />
              <span className="text-primary">Maintainance Services</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-xl text-muted-fg mb-8 max-w-2xl leading-relaxed">
              Serving Fort Walton Beach and surrounding areas with top-tier handyman, installation, and hauling services. Reliable, professional, and detail-oriented.
            </p>
          </Reveal>

          <Reveal delay={0.2} className="flex flex-col sm:flex-row gap-4">
            <MagneticButton>
              <Button size="lg" asChild className="w-full sm:w-auto text-base">
                <Link href="/contact">Request a Quote</Link>
              </Button>
            </MagneticButton>

            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-base">
              <Link href="/services">View Services</Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
