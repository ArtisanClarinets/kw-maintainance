
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { services } from "@/../content/services";
import { SpotlightCard } from "@/react-bits/SpotlightCard";

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-1 py-12 container-custom px-4">
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-muted-fg">
            We provide a wide range of hospitality and maintenance solutions tailored to your needs. Browse our offerings below.
          </p>
        </div>

        <div className="grid gap-8">
          {services.map((service) => (
            <SpotlightCard key={service.id} className="p-8">
              <div className="flex flex-col md:flex-row justify-between gap-8 items-start">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-3 uppercase tracking-wide">{service.title}</h2>
                  <p className="text-lg text-muted-fg mb-6">{service.description}</p>

                  <div>
                    <h4 className="font-semibold mb-2">What we offer:</h4>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-muted-fg">
                          <span className="mr-2 text-primary">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center p-8 bg-muted/20 rounded-full shrink-0 rotate-[-5deg]">
                  <h3 className="text-xl font-black text-muted-fg/20 uppercase tracking-tighter transform scale-150">
                    {service.title.split(' ')[0]}
                  </h3>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
