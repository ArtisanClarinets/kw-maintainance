
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { commercialServiceDetails } from "@/../content/commercial";
import { siteConfig } from "@/../content/site";
import { Button } from "@/components/ui/button";
import { Phone, CheckCircle, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return Object.values(commercialServiceDetails).map((service) => ({
        id: service.id,
    }));
}

export default async function CommercialDetailPage({ params }: PageProps) {
  const { id } = await params;
  const service = commercialServiceDetails[id as keyof typeof commercialServiceDetails];

  if (!service) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-slate-900 text-white py-16 md:py-24 border-b border-border/10">
            <div className="container-custom px-4">
                <Link href="/commercial" className="text-sm font-medium text-slate-400 hover:text-white mb-6 flex items-center transition-colors">
                    &larr; Back to Commercial Services
                </Link>
                <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-extrabold font-serif mb-6 leading-tight">{service.title}</h1>
                        <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed">
                            {service.longDescription}
                        </p>
                    </div>
                     {/* Quick Action Card on Hero for Desktop */}
                     <div className="hidden lg:block p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 min-w-[300px]">
                        <h3 className="font-bold text-lg mb-2">Need this service?</h3>
                        <p className="text-sm text-slate-300 mb-4">Contact our commercial dispatch.</p>
                        <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white border-none">
                            <Link href="/contact">Request Proposal</Link>
                        </Button>
                     </div>
                </div>
            </div>
        </div>

        <div className="container-custom px-4 py-20 grid md:grid-cols-3 gap-12 lg:gap-24">
            <div className="md:col-span-2 space-y-16">
                {/* Benefits / Included */}
                <section>
                    <h2 className="text-2xl font-bold font-serif mb-6 text-foreground">Service Scope</h2>
                    <ul className="grid sm:grid-cols-2 gap-4">
                        {service.included.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border/50 hover:border-blue-500/30 transition-colors">
                                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
                                <span className="text-foreground/90 font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Process */}
                <section>
                    <h2 className="text-2xl font-bold font-serif mb-8 text-foreground">Our Commercial Process</h2>
                    <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border/50">
                        {service.processSteps.map((step, idx) => (
                            <div key={idx} className="relative flex gap-6 group">
                                <div className="h-10 w-10 rounded-full bg-background border-2 border-blue-600 flex items-center justify-center font-bold text-blue-600 shrink-0 z-10 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    {idx + 1}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 transition-colors">{step.title}</h3>
                                    <p className="text-muted-foreground">{step.body}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Sidebar CTA */}
            <div className="space-y-8">
                <div className="p-6 bg-muted/30 rounded-2xl border border-border/10 sticky top-24 shadow-sm">
                    <h3 className="text-xl font-bold font-serif mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        Commercial Booking
                    </h3>
                    <p className="text-muted-foreground mb-6">
                        Ready to schedule {service.title.toLowerCase()}?
                    </p>
                    <div className="space-y-3">
                         <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                            <Link href="/contact">Get a Quote</Link>
                        </Button>
                        <Button asChild className="w-full" variant="outline" size="lg">
                            <a href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}>
                                <Phone className="mr-2 h-4 w-4" />
                                {siteConfig.phone}
                            </a>
                        </Button>
                    </div>

                    <div className="mt-8 space-y-4">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Detailed Invoicing Available</span>
                        </div>
                         <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>COI Provided on Request</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
