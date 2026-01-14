
import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";
import { SplitText } from "@/shared/ui/react-bits/SplitText";
import { SpotlightCard } from "@/shared/ui/react-bits/SpotlightCard";
import { AnimatedGridPattern } from "@/shared/ui/react-bits/AnimatedGridPattern";
import { MapPin } from "lucide-react";
import Link from "next/link";

const locations = [
    "Fort Walton Beach, FL",
    "Destin, FL",
    "Mary Esther, FL",
    "Niceville, FL",
    "Miramar Beach, FL",
    "Shalimar, FL",
    "Okaloosa Island",
];

export default function ServiceAreaPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background relative">
      <Header />
      <main className="flex-1 py-12 container-custom px-4 relative">
         <AnimatedGridPattern
              numSquares={30}
              maxOpacity={0.1}
              duration={3}
              repeatDelay={1}
              className="text-primary/20 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
          />
        <div className="relative z-10">
            <SplitText
                text="Service Area"
                className="text-4xl md:text-5xl font-extrabold font-serif mb-8 text-foreground"
                delay={0.03}
            />
            <div className="max-w-4xl">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                We are proud to serve the entire <strong>Fort Walton Beach</strong> area and surrounding communities.
                Our team is local and ready to assist with your hospitality and maintenance needs in the following locations:
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {locations.map((loc, idx) => (
                    <SpotlightCard key={idx} className="bg-card rounded-xl border border-border/50">
                        <div className="flex items-center gap-3 p-4">
                            <MapPin className="text-primary h-5 w-5 shrink-0" />
                            <span className="font-medium">{loc}</span>
                        </div>
                    </SpotlightCard>
                ))}
            </div>

            <p className="text-lg text-muted-foreground">
                Not sure if we cover your area? <Link href="/contact" className="text-primary hover:underline font-medium">Contact us</Link> and we&apos;ll let you know!
            </p>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
