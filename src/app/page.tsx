
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { testimonials } from "@/../content/testimonials";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceCard } from "@/components/ServiceCard";
import { services } from "@/../content/services";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1">
        <Hero />

        {/* Services Teaser */}
        <section className="py-20 md:py-32 container-custom px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
             <div>
                <h2 className="text-3xl md:text-4xl font-extrabold font-serif mb-4 text-foreground">Our Services</h2>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Comprehensive hospitality and maintenance solutions for your home or business.
                </p>
             </div>
             <Link href="/services" className="flex items-center font-semibold text-primary hover:text-primary/80 transition-colors group">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.slice(0, 3).map((service) => (
               <div key={service.id} className="h-full">
                <ServiceCard
                    id={service.id}
                    title={service.title}
                    description={service.description}
                    iconName={service.icon}
                    features={service.features}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-muted/20">
           <div className="container-custom px-4 mb-12 text-center">
             <h2 className="text-3xl md:text-4xl font-extrabold font-serif mb-4 text-foreground">Trusted by Locals</h2>
             <p className="text-lg text-muted-foreground">See what our neighbors in Fort Walton Beach have to say.</p>
           </div>
           <Marquee testimonials={testimonials} />
        </section>

      </main>
      <Footer />
    </div>
  );
}
