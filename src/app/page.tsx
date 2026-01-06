import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { testimonials } from "@/../content/testimonials";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { modules } from "@/../content/modules";
import { personas } from "@/../content/personas";
import { kpis } from "@/../content/kpis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1">
        <Hero />

        {/* KPIs Section */}
        <section className="py-12 bg-muted/10 border-b border-border/10">
            <div className="container-custom px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {kpis.map((kpi, idx) => (
                        <div key={idx} className="text-center">
                            <div className="text-4xl font-bold text-primary mb-2">{kpi.metric}</div>
                            <div className="font-semibold text-foreground mb-1">{kpi.label}</div>
                            <p className="text-sm text-muted-foreground">{kpi.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Strategic Systems Teaser */}
        <section id="modules" className="py-20 md:py-32 container-custom px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
             <div>
                <h2 className="text-3xl md:text-4xl font-extrabold font-serif mb-4 text-foreground">Strategic Systems</h2>
                <p className="text-lg text-muted-foreground max-w-xl">
                  A comprehensive ecosystem designed for the elite hospitality institution.
                </p>
             </div>
             <Link href="/platform" className="flex items-center font-semibold text-primary hover:text-primary/80 transition-colors group">
                View Operational Brief
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {modules.map((module) => (
               <div key={module.slug} className="h-full">
                <ServiceCard
                    slug={module.slug}
                    title={module.title}
                    description={module.description}
                    icon={<module.icon className="h-6 w-6" />}
                    features={module.features}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Personas Section */}
        <section className="py-20 bg-muted/20">
            <div className="container-custom px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold font-serif mb-4">Built for Operations Leaders</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Empowering every stakeholder in the hospitality ecosystem with role-specific tools.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {personas.map((persona) => (
                        <Card key={persona.id} className="bg-card border-border/50">
                            <CardHeader>
                                <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <persona.icon className="h-6 w-6" />
                                </div>
                                <CardTitle className="text-xl">{persona.title}</CardTitle>
                                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{persona.role}</p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xl italic text-muted-foreground mb-6">&quot;{persona.valueProp}&quot;</p>
                                <ul className="space-y-2">
                                    {persona.painPoints.map((point, idx) => (
                                        <li key={idx} className="flex items-start text-sm">
                                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 shrink-0 mt-0.5" />
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
           <div className="container-custom px-4 mb-12 text-center">
             <h2 className="text-3xl md:text-4xl font-extrabold font-serif mb-4 text-foreground">Trusted by Global Brands</h2>
             <p className="text-lg text-muted-foreground">Powering operations for the world&apos;s leading hospitality groups.</p>
           </div>
           <Marquee testimonials={testimonials} />
        </section>

      </main>
      <Footer />
    </div>
  );
}
