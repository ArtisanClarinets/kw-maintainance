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
import { ShieldCheck, Clock, MapPin } from "lucide-react";

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

        {/* Services Section */}
        <section id="services" className="py-20 container-custom px-4">
          <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-extrabold font-serif mb-4 text-foreground">Our Services</h2>
             <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
               Professional, reliable, and affordable services for your home or business in Fort Walton Beach and surrounding areas.
             </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
               <div key={service.id} className="h-full">
                <ServiceCard
                    slug={service.id}
                    title={service.title}
                    description={service.description}
                    icon={<service.icon className="h-6 w-6" />}
                    features={service.features}
                />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/services" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-8 py-2">
                View All Services
            </Link>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-muted/20">
            <div className="container-custom px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold font-serif mb-4">Why Choose K&W Maintenance?</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        We take pride in our work and treat your home with the respect it deserves.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="bg-card border-border/50">
                        <CardHeader>
                            <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
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
                    <Card className="bg-card border-border/50">
                        <CardHeader>
                            <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
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
                    <Card className="bg-card border-border/50">
                        <CardHeader>
                            <div className="mb-4 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
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
                </div>
            </div>
        </section>

        {/* Industries */}
        <section className="py-20 container-custom px-4">
            <div className="flex flex-col gap-2 text-center mb-12">
                <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">Industries Served</p>
                <h2 className="text-3xl md:text-4xl font-extrabold font-serif text-foreground">Expert Support for Every Property</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {industries.map((industry) => (
                    <div key={industry.id} className="bg-card border border-border/40 rounded-2xl p-8 h-full">
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
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/request-demo" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-background text-primary shadow hover:bg-background/90 h-11 px-8">
                        Get a Free Quote
                    </Link>
                    <Link href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-11 px-8 text-white border-white hover:bg-white/10">
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
