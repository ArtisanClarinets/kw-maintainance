import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { industries } from '@/../content/industries';

export default function IndustriesLanding() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Header />
      <main className="flex-1 space-y-16">
        <section className="bg-muted/30 border-b border-border/40">
          <div className="container-custom px-4 py-16 text-center">
            <p className="text-sm uppercase tracking-[0.5em] text-muted-foreground">Industries</p>
            <h1 className="text-4xl md:text-5xl font-extrabold font-serif text-foreground mt-4">Hospitality excellence meets residential trust</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Whether you operate a luxury resort, manage a portfolio of short-term rentals, or care for single-family residences, KW Hospitality Maintenance keeps every asset ready for service.
            </p>
          </div>
        </section>

        <section className="container-custom px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((industry) => (
              <article key={industry.id} className="bg-card border border-border/40 rounded-3xl p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground mb-2">{industry.id}</p>
                  <h2 className="text-3xl font-bold font-serif text-foreground mb-4">{industry.title}</h2>
                  <p className="text-base text-muted-foreground mb-6">{industry.description}</p>
                  <ul className="space-y-3 mb-6 text-sm text-foreground/80">
                    {industry.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={`/industries/${industry.id}`} className="text-sm font-semibold text-primary hover:text-primary/80">
                  {industry.cta.label} →
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
