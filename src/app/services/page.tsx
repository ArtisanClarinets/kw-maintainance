
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { services } from "@/../content/services";
import { ServiceCard } from "@/components/ServiceCard";

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background selection:bg-accent/30">
      <Header />

      <main className="flex-1 py-20 md:py-32 container-custom">
        {/* Header Section */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-serif mb-6 text-foreground">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We provide a wide range of hospitality and maintenance solutions tailored to your needs.
            From quick fixes to major installations, we&apos;ve got you covered.
          </p>
        </div>

        {/* Bento/Spotlight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <div key={service.id} className="h-full">
               <ServiceCard
                 title={service.title}
                 description={service.description}
                 iconName={service.icon}
                 features={service.features}
               />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
