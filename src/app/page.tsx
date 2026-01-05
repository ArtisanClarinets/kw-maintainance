
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <main className="flex-1">
        <Hero />
        {/* Services Teaser */}
        <section className="py-20 container-custom px-4">
          <h2 className="text-3xl font-bold mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* We will populate this from content */}
            <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">Handyman Services</h3>
              <p className="text-muted-fg">Reliable repairs for home and business.</p>
            </div>
            <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">Installations</h3>
              <p className="text-muted-fg">Professional installation for appliances and fixtures.</p>
            </div>
             <div className="p-6 border rounded-xl hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2">More Services</h3>
              <p className="text-muted-fg">Explore our full range of offerings.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
