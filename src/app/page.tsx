import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { testimonials } from "@/../content/testimonials";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/../content/services";
import { siteConfig } from "@/../content/site";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1">
        <Hero />

        {/* Services Section */}
        <section id="services" className="py-20 md:py-32 container-custom px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
             <div>
                <h2 className="text-3xl md:text-4xl font-extrabold font-serif mb-4 text-foreground">Our Services</h2>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Professional maintenance and hauling for homes and businesses.
                </p>
             </div>
             <Link href="/services" className="flex items-center font-semibold text-primary hover:text-primary/80 transition-colors group">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
               <div key={service.id} className="h-full">
                <ServiceCard
                    slug={service.id}
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    features={service.features}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-muted/20">
            <div className="container-custom px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-extrabold font-serif mb-4">How We Work</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Simple, transparent, and respectful of your time.
                    </p>
                </div>
                
                <div className="grid md:grid-cols-4 gap-8">
                    {[
                        { title: "1. Tell us what you need", desc: "Send photos for faster quoting." },
                        { title: "2. Get an Estimate", desc: "We provide questions and a range." },
                        { title: "3. Schedule", desc: "Pick a time that works for you." },
                        { title: "4. Job Done", desc: "We complete the work and clean up." }
                    ].map((step, idx) => (
                        <div key={idx} className="relative p-6 bg-card border border-border/50 rounded-xl shadow-sm">
                            <div className="text-4xl font-serif font-bold text-primary/20 absolute top-4 right-4">{idx + 1}</div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button asChild size="lg">
                        <Link href="/contact">Get Started</Link>
                    </Button>
                </div>
            </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
           <div className="container-custom px-4 mb-12 text-center">
             <h2 className="text-3xl md:text-4xl font-extrabold font-serif mb-4 text-foreground">What Our Clients Say</h2>
             <p className="text-lg text-muted-foreground">Trusted by neighbors and local businesses in Fort Walton Beach.</p>
           </div>
           <Marquee testimonials={testimonials} />
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
             {/* Decorative Background */}
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731117-104f2a863a18?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>

             <div className="container-custom px-4 relative z-10 text-center">
                <h2 className="text-3xl md:text-5xl font-extrabold font-serif mb-6">Ready to get started?</h2>
                <p className="text-xl md:text-2xl opacity-90 mb-10 max-w-2xl mx-auto">
                    Contact William today for a free estimate on your next project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" variant="secondary" className="text-primary font-bold">
                        <a href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`}>
                            <Phone className="mr-2 h-4 w-4" />
                            Call {siteConfig.phone}
                        </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                        <Link href="/contact">Request Quote Online</Link>
                    </Button>
                </div>
             </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
