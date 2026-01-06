import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { industries } from '@/../content/industries';

type IndustryProps = {
  params: {
    id: string;
  };
};

export async function generateStaticParams() {
  return industries.map((industry) => ({ id: industry.id }));
}

export default function IndustryDetail({ params }: IndustryProps) {
  const industry = industries.find((item) => item.id === params.id);
  if (!industry) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Header />
      <main className="flex-1 space-y-12">
        <section className="container-custom px-4 py-16">
          <div className="max-w-4xl">
            <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground">{industry.id}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold font-serif text-foreground mt-4">{industry.title}</h1>
            <p className="mt-6 text-lg text-muted-foreground">{industry.description}</p>
            <div className="mt-10 grid lg:grid-cols-3 gap-6">
              {industry.highlights.map((highlight) => (
                <div key={highlight} className="border border-border/60 rounded-2xl p-5 bg-muted/40">
                  <p className="text-sm text-muted-foreground">Highlight</p>
                  <p className="mt-2 text-base font-semibold text-foreground">{highlight}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={industry.cta.href ?? '/contact'} className="px-6 py-3 rounded-full bg-emerald-500 text-white font-semibold">
                {industry.cta.label}
              </Link>
              <Link href="/industries" className="px-6 py-3 rounded-full border border-border text-sm text-foreground">
                Back to industries
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
