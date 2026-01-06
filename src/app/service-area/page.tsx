import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/../content/site";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MapPin } from "lucide-react";

export default function ServiceAreaPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1">
        <div className="bg-muted/30 py-16 md:py-24">
            <div className="container-custom px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold font-serif mb-6">Service Area</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Proudly serving Fort Walton Beach and the surrounding communities.
                </p>
            </div>
        </div>

        <section className="py-20 container-custom px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                 <div>
                    <h2 className="text-3xl font-bold font-serif mb-6">Where We Work</h2>
                    <p className="text-lg text-muted-foreground mb-6">
                        We are a locally owned and operated business based in Fort Walton Beach. We focus on serving our neighbors with prompt and reliable service.
                    </p>
                    <ul className="space-y-4 mb-8">
                        {[
                            "Fort Walton Beach",
                            "Mary Esther",
                            "Shalimar",
                            "Okaloosa Island",
                            "Destin",
                            "Nearby Areas"
                        ].map((area, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-lg">
                                <MapPin className="h-5 w-5 text-primary" />
                                <span>{area}</span>
                            </li>
                        ))}
                    </ul>
                    <Button asChild size="lg">
                        <Link href="/contact">Check Availability</Link>
                    </Button>
                 </div>

                 {/*
                    Placeholder for a map image or embed.
                    Using a generic map visual div for now.
                 */}
                 <div className="bg-muted rounded-2xl aspect-square md:aspect-auto md:h-[400px] flex items-center justify-center border border-border">
                    <div className="text-center p-6">
                        <MapPin className="h-16 w-16 text-primary/20 mx-auto mb-4" />
                        <p className="text-muted-foreground">Map of Fort Walton Beach & Surroundings</p>
                    </div>
                 </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
