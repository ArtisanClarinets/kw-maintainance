
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MapPin } from "lucide-react";
import { Button } from "@/components/Button";
import Link from "next/link";

const areas = [
  "Fort Walton Beach",
  "Destin",
  "Miramar Beach",
  "Mary Esther",
  "Shalimar",
  "Okaloosa Island",
  "Niceville",
  "Cinco Bayou"
];

export default function ServiceAreaPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1">
        <div className="bg-muted/30 py-16 md:py-24">
            <div className="container-custom px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold font-serif mb-6">Service Area</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    We proudly serve homeowners and businesses across the Emerald Coast.
                </p>
            </div>
        </div>

        <section className="py-20 container-custom px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold font-serif mb-6">Where We Work</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Our team is based in Fort Walton Beach, but we travel throughout Okaloosa and Walton counties to help our customers.
                    </p>
                    <ul className="grid grid-cols-2 gap-4">
                        {areas.map((area) => (
                            <li key={area} className="flex items-center gap-2 text-foreground/80">
                                <MapPin className="h-4 w-4 text-primary shrink-0" />
                                {area}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-8">
                         <Button size="lg" asChild>
                            <Link href="/request-demo">Check Availability</Link>
                        </Button>
                    </div>
                </div>
                <div className="h-[400px] bg-muted rounded-2xl border border-border/50 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-grid-small-black/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                    <span className="text-muted-foreground font-medium z-10">Map of Fort Walton Beach & Surrounding Areas</span>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
