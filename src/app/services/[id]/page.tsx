import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { serviceDetails } from "@/../content/service-details";
import { siteConfig } from "@/../content/site";
import { Button } from "@/components/ui/button";
import { Phone, CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return serviceDetails.map((service) => ({
        id: service.id,
    }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const service = serviceDetails.find((s) => s.id === id);

  if (!service) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-muted/30 py-16 md:py-24 border-b border-border/10">
            <div className="container-custom px-4">
                <Link href="/services" className="text-sm font-medium text-muted-foreground hover:text-primary mb-6 flex items-center">
                    &larr; Back to Services
                </Link>
                <h1 className="text-4xl md:text-5xl font-extrabold font-serif mb-6">{service.title}</h1>
                <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                    {service.longDescription}
                </p>
                <div className="mt-8 flex gap-4">
                     <Button asChild size="lg">
                        <Link href="/contact">Request Quote</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                        <a href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}>
                            <Phone className="mr-2 h-4 w-4" />
                            Call William
                        </a>
                    </Button>
                </div>
            </div>
        </div>

        <div className="container-custom px-4 py-20 grid md:grid-cols-3 gap-12 lg:gap-24">
            <div className="md:col-span-2 space-y-16">
                {/* Benefits */}
                <section>
                    <h2 className="text-2xl font-bold font-serif mb-6">What We Do</h2>
                    <ul className="grid sm:grid-cols-2 gap-4">
                        {service.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border/50">
                                <CheckCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                                <span className="text-foreground/90">{benefit}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Process */}
                <section>
                    <h2 className="text-2xl font-bold font-serif mb-8">What to Expect</h2>
                    <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border/50">
                        {service.process.map((step, idx) => (
                            <div key={idx} className="relative flex gap-6">
                                <div className="h-10 w-10 rounded-full bg-background border-2 border-primary flex items-center justify-center font-bold text-primary shrink-0 z-10">
                                    {idx + 1}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {service.note && (
                    <div className="p-6 bg-accent/10 border border-accent/20 rounded-lg text-accent-foreground/80">
                        <strong>Note:</strong> {service.note}
                    </div>
                )}
            </div>

            {/* Sidebar CTA */}
            <div className="space-y-8">
                <div className="p-6 bg-muted/30 rounded-2xl border border-border/10 sticky top-24">
                    <h3 className="text-xl font-bold font-serif mb-4">Ready to schedule?</h3>
                    <p className="text-muted-foreground mb-6">
                        Contact us today for a free estimate or to book your service.
                    </p>
                    <div className="space-y-3">
                         <Button asChild className="w-full" size="lg">
                            <Link href="/contact">Get a Quote</Link>
                        </Button>
                        <Button asChild className="w-full" variant="outline" size="lg">
                            <a href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}>
                                <Phone className="mr-2 h-4 w-4" />
                                {siteConfig.phone}
                            </a>
                        </Button>
                    </div>
                    <div className="mt-6 pt-6 border-t border-border/10 text-center">
                        <p className="text-sm text-muted-foreground">
                            Serving Fort Walton Beach & surrounding areas.
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
