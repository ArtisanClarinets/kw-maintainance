import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { services } from "@/../content/services";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1">
        <div className="bg-muted/30 py-16 md:py-24">
            <div className="container-custom px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold font-serif mb-6">Our Services</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Comprehensive maintenance, repair, and hauling solutions for Fort Walton Beach and surrounding areas.
                </p>
            </div>
        </div>

        <section className="py-20 container-custom px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        <section className="py-20 bg-muted/10">
            <div className="container-custom px-4 text-center">
                <h2 className="text-3xl font-bold font-serif mb-6">Need something else?</h2>
                <p className="text-muted-foreground mb-8">
                    If you don&apos;t see what you need listed here, give us a call. We likely handle it or can point you in the right direction.
                </p>
                <Button asChild size="lg">
                    <Link href="/contact">Contact Us</Link>
                </Button>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
