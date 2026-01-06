
"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, Phone, ArrowRight } from "lucide-react";
import { Service } from "@/../content/services";
import { ServiceDetail } from "@/../content/service-details";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/react-bits/Reveal";
import { SpotlightCard } from "@/react-bits/SpotlightCard";
import { MagneticButton } from "@/react-bits/MagneticButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteConfig } from "@/../content/site";
import { Button } from "@/components/Button";

interface ServiceDetailTemplateProps {
  service: Service;
  detail: ServiceDetail;
  relatedServices: Service[];
}

export function ServiceDetailTemplate({
  service,
  detail,
  relatedServices,
}: ServiceDetailTemplateProps) {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background selection:bg-accent/30">
      <Header />

      <main className="flex-1 py-20 md:py-32 container-custom">
        <Breadcrumbs
          items={[
            { label: "Services", href: "/services" },
            { label: service.title, href: `/services/${service.id}` },
          ]}
        />

        {/* Hero Section */}
        <section className="mb-20">
          <Reveal>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-serif mb-6 text-foreground">
              {service.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mb-8">
              {detail.longDescription}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
             <div className="flex flex-wrap gap-4">
               <Link href={`/contact?service=${service.id}`}>
                 <MagneticButton className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2">
                   Get a Quote <ArrowRight className="h-4 w-4" />
                 </MagneticButton>
               </Link>
               <Link href={`tel:${siteConfig.phone}`}>
                 <MagneticButton className="bg-muted text-foreground hover:bg-muted/80 px-8 py-3 rounded-full font-medium transition-colors flex items-center gap-2">
                   <Phone className="h-4 w-4" /> Call Now
                 </MagneticButton>
               </Link>
             </div>
          </Reveal>
        </section>

        {/* What We Do Section */}
        <section className="mb-24">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-10">What We Do</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {detail.included.map((item, idx) => (
              <SpotlightCard
                key={idx}
                className="bg-card border border-border/40 p-6 rounded-2xl h-full flex items-start"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-sky-600 dark:text-accent mt-0.5 shrink-0" />
                  <span className="font-medium text-foreground/90">{item}</span>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-24">
          <Reveal>
             <h2 className="text-3xl md:text-4xl font-bold font-serif mb-10">Our Process</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {detail.processSteps.map((step, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="relative pl-6 border-l-2 border-primary/20 hover:border-accent transition-colors duration-300">
                  <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-background border-2 border-accent" />
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Trust/Credibility Section */}
        <section className="mb-24 bg-muted/30 -mx-4 px-4 py-16 md:px-0 md:mx-0 md:rounded-3xl relative overflow-hidden">
           <div className="absolute inset-0 bg-grid-slate-200/20 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
           <div className="max-w-4xl mx-auto text-center">
             <Reveal>
               <h2 className="text-3xl font-bold font-serif mb-6">Why Choose K & W?</h2>
             </Reveal>
             <div className="grid sm:grid-cols-3 gap-8 text-left">
               <Reveal delay={0.1}>
                 <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-border/50">
                   <h3 className="font-bold mb-2 text-primary">Reliable & Timely</h3>
                   <p className="text-sm text-muted-foreground">We respect your time. We show up when we say we will and communicate clearly throughout the job.</p>
                 </div>
               </Reveal>
               <Reveal delay={0.2}>
                 <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-border/50">
                   <h3 className="font-bold mb-2 text-primary">Quality Workmanship</h3>
                   <p className="text-sm text-muted-foreground">We take pride in our work. From the smallest fix to the biggest haul, we do it right.</p>
                 </div>
               </Reveal>
               <Reveal delay={0.3}>
                 <div className="bg-background/80 backdrop-blur-sm p-6 rounded-xl border border-border/50">
                   <h3 className="font-bold mb-2 text-primary">Licensed & Insured</h3>
                   <p className="text-sm text-muted-foreground">Peace of mind knowing you are working with a legitimate, verified professional business.</p>
                 </div>
               </Reveal>
             </div>
           </div>
        </section>

        {/* CTA Section */}
        <section className="mb-24 text-center">
          <Reveal>
            <div className="bg-primary text-primary-foreground rounded-3xl p-10 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />

              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">Ready to get started?</h2>
                <p className="text-primary-foreground/90 text-lg mb-8">
                  Contact us today for a free quote on your {service.title.toLowerCase()} needs.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href={`/contact?service=${service.id}`} className="w-full sm:w-auto">
                    <Button variant="secondary" size="lg" className="w-full font-semibold">
                       Request a Quote
                    </Button>
                  </Link>
                  <Link href={`tel:${siteConfig.phone}`} className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                       <Phone className="mr-2 h-4 w-4" /> {siteConfig.phone}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Related Services */}
        <section className="mb-12">
           <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold font-serif">Other Services</h2>
              <Link href="/services" className="text-primary hover:underline flex items-center text-sm font-medium">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {relatedServices.map((related) => (
                <Link key={related.id} href={`/services/${related.id}`} className="group block">
                  <div className="bg-card border border-border/40 p-6 rounded-xl hover:shadow-lg transition-all duration-300 h-full hover:border-accent/50">
                    <h3 className="font-bold font-serif mb-2 group-hover:text-primary transition-colors">{related.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{related.description}</p>
                  </div>
                </Link>
             ))}
           </div>
        </section>

        <div className="mt-12 border-t border-border pt-8">
           <Link href="/services" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
             <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
           </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
