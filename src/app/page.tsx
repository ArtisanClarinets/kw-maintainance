'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { testimonials } from "@/../content/testimonials";
import Link from "next/link";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/../content/services";
import { kpis } from "@/../content/kpis";
import { industries } from "@/../content/industries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Clock, MapPin, Briefcase, RotateCw, ClipboardCheck, Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/react-bits/SpotlightCard";
import { ShinyButton } from "@/components/react-bits/ShinyButton";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1">
        <Hero />

        {/* KPIs Section */}
        <section className="py-12 bg-muted/10 border-b border-border/10">
            <div className="container-custom px-4">
                <div className="flex md:grid md:grid-cols-4 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                    {kpis.map((kpi, idx) => (
                        <div key={idx} className="min-w-[40vw] md:min-w-0 snap-center">
                            <SpotlightCard className="text-center p-6 bg-transparent border-transparent h-full flex flex-col justify-center">
                                <div className="text-3xl md:text-4xl font-bold text-primary mb-2 whitespace-nowrap">{kpi.metric}</div>
                                <div className="font-semibold text-foreground mb-1 text-sm md:text-base">{kpi.label}</div>
                                <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{kpi.description}</p>
                            </SpotlightCard>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 container-custom px-4">
          <div className="text-center mb-10 md:mb-16">
             <h2 className="text-3xl md:text-4xl font-extrabold font-serif mb-4 text-foreground">Residential Services</h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
               Professional, reliable, and affordable services for your home in Fort Walton Beach and surrounding areas.
             </p>
          </div>

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
            {services.map((service) => (
               <div key={service.id} className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center h-full">
                <SpotlightCard className="h-full bg-card rounded-xl border border-border/50">
                  <div className="p-1 h-full">
                    <ServiceCard
                        slug={service.id}
                        title={service.title}
                        description={service.description}
                        icon={<service.icon className="h-6 w-6" />}
                        features={service.features}
                    />
                  </div>
                </SpotlightCard>
              </div>
            ))}
          </div>

          <div className="mt-8 md:mt-12 text-center">
            <Link href="/services" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 py-2 w-full md:w-auto">
                View All Services
            </Link>
          </div>
        </section>

        {/* Commercial/B2B Teaser */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
             {/* Background logic */}
             <div className="absolute inset-0 opacity-20">
                 <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
                 <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 to-transparent" />
            </div>

             <div className="container-custom px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
                 <div className="flex-1 space-y-6">
                      <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300">
                        <Briefcase className="mr-2 h-4 w-4" />
                        For Property Managers & Businesses
                    </div>
                     <h2 className="text-3xl md:text-5xl font-extrabold font-serif leading-tight">Commercial Maintenance Solutions</h2>
                     <p className="text-lg text-slate-300 leading-relaxed">
                         We provide dedicated support for HOAs, hotels, retail, and office buildings.
                         Enjoy priority scheduling, net 30 billing, and a single point of contact for all your facility needs.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-4 pt-4">
                         <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-none shadow-lg shadow-blue-900/20">
                            <Link href="/commercial">Explore Commercial Services</Link>
                         </Button>
                     </div>
                 </div>
                 <div className="flex-1 w-full">
                     <div className="grid grid-cols-2 gap-4">
                         <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                             <ShieldCheck className="h-8 w-8 text-blue-400 mb-4" />
                             <h3 className="font-bold mb-1">Preventative</h3>
                             <p className="text-sm text-slate-400">Scheduled audits & care</p>
                         </div>
                         <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                             <RotateCw className="h-8 w-8 text-blue-400 mb-4" />
                             <h3 className="font-bold mb-1">Turnovers</h3>
                             <p className="text-sm text-slate-400">Rapid unit prep</p>
                         </div>
                         <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                             <ClipboardCheck className="h-8 w-8 text-blue-400 mb-4" />
                             <h3 className="font-bold mb-1">Compliance</h3>
                             <p className="text-sm text-slate-400">Safety & asset reports</p>
                         </div>
                         <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                             <Hammer className="h-8 w-8 text-blue-400 mb-4" />
                             <h3 className="font-bold mb-1">Repairs</h3>
                             <p className="text-sm text-slate-400">On-demand handyman</p>
                         </div>
                     </div>
                 </div>
             </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-muted/20">
            <div className="container-custom px-4">
                <div className="text-center mb-10 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold font-serif mb-4">Why Choose K&W Maintenance?</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We take pride in our work and treat your home with the respect it deserves.
                    </p>
                </div>
                
                <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                    <div className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center h-full">
                        <SpotlightCard className="rounded-xl bg-card h-full">
                            <Card className="bg-transparent border-0 h-full">
                                <CardHeader>
                                    <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary transition-all">
                                        <ShieldCheck className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">Licensed & Insured</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Rest easy knowing that we are fully licensed and insured professionals. We prioritize safety and quality in every job we do.
                                    </p>
                                </CardContent>
                            </Card>
                        </SpotlightCard>
                    </div>

                    <div className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center h-full">
                        <SpotlightCard className="rounded-xl bg-card h-full">
                            <Card className="bg-transparent border-0 h-full">
                                <CardHeader>
                                    <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary transition-all">
                                        <Clock className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">Reliable & Punctual</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        We value your time. Our team arrives on schedule and completes projects efficiently without cutting corners.
                                    </p>
                                </CardContent>
                            </Card>
                        </SpotlightCard>
                    </div>

                    <div className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center h-full">
                        <SpotlightCard className="rounded-xl bg-card h-full">
                            <Card className="bg-transparent border-0 h-full">
                                <CardHeader>
                                    <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary transition-all">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">Locally Owned</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        As a local Fort Walton Beach business, we are committed to serving our neighbors and community with integrity.
                                    </p>
                                </CardContent>
                            </Card>
                        </SpotlightCard>
                    </div>
                </div>
            </div>
        </section>

        {/* Industries */}
        <section className="py-20 container-custom px-4">
            <div className="flex flex-col gap-2 text-center mb-10 md:mb-12">
                <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Industries Served</p>
                <h2 className="text-3xl md:text-4xl font-extrabold font-serif text-foreground">Expert Support for Every Property</h2>
            </div>
            <div className="flex md:grid md:grid-cols-2 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                {industries.map((industry) => (
                    <div key={industry.id} className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center h-full">
                        <SpotlightCard className="bg-card rounded-2xl h-full">
                            <div className="p-8 h-full">
                                <h3 className="text-2xl font-bold mb-3 text-foreground">{industry.title}</h3>
                                <p className="text-muted-foreground mb-6">{industry.description}</p>
                                <ul className="space-y-2 mb-6 text-sm text-foreground/80">
                                    {industry.highlights.map((highlight) => (
                                        <li key={highlight} className="flex items-start gap-2">
                                            <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1" />
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                                <Link href={industry.cta.href} className="text-sm font-semibold text-primary hover:text-primary/80">
                                    {industry.cta.label} →
                                </Link>
                            </div>
                        </SpotlightCard>
                    </div>
                ))}
            </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
           <div className="container-custom px-4 mb-12 text-center">
             <h2 className="text-3xl md:text-4xl font-extrabold font-serif mb-4 text-foreground">What Our Clients Say</h2>
             <p className="text-lg text-muted-foreground">Trusted by homeowners and businesses across the Emerald Coast.</p>
           </div>
           <Marquee testimonials={testimonials} />
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
             <div className="container-custom px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to get started?</h2>
                <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                    Contact us today for a free quote on your next project. We are here to help!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <div className="w-full sm:w-auto">
                        <ShinyButton className="w-full bg-background text-primary hover:bg-background/90" asChild>
                             <Link href="/request-demo">Get a Free Quote</Link>
                        </ShinyButton>
                    </div>
                    <Link href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-white/10 h-11 px-8 text-white border-white">
                        Contact Us
                    </Link>
                </div>
             </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
