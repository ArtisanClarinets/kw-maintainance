import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import Link from "next/link";
import { modules } from "@/../content/modules";

export const metadata = {
  title: "Operational Ecosystem",
  description: "A unified command center for elite property management, asset stewardship, and infrastructure oversight.",
};

export default function PlatformPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-muted/20 border-b border-border/10">
            <div className="container-custom px-4 text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold font-serif mb-6 text-foreground">
                    One Ecosystem. <span className="text-primary">Absolute Oversight.</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                    KW Enterprise unifies every dimension of property infrastructure into a single, high-fidelity command center. From mechanical plant rooms to luxury guest suites, we provide the clarity required for elite stewardship.
                </p>
                <div className="flex justify-center gap-4">
                    <Button asChild size="lg">
                        <Link href="/request-demo">Request Consultation</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section className="py-20 container-custom px-4 space-y-24">
            {modules.map((module, index) => {
                const isEven = index % 2 === 0;
                return (
                    <div key={module.slug} id={module.slug} className="grid md:grid-cols-2 gap-16 items-center scroll-mt-24">
                        <div className={isEven ? "order-1" : "order-1 md:order-2"}>
                            <div className="h-12 w-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6">
                                <module.icon className="h-6 w-6" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">{module.title}</h2>
                            <p className="text-muted-foreground text-lg mb-6">
                                {module.description}
                            </p>
                            <ul className="space-y-3 mb-8">
                                {module.features.slice(0, 3).map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2 text-sm">
                                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Button variant="outline" asChild>
                                <Link href={`/modules/${module.slug}`}>Explore Module</Link>
                            </Button>
                        </div>
                        <div className={`${isEven ? "order-2" : "order-2 md:order-1"} bg-muted rounded-2xl h-[400px] border border-border/50 flex items-center justify-center relative overflow-hidden group`}>
                             <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-muted/50" />
                             <span className="relative z-10 text-muted-foreground font-mono text-sm uppercase tracking-widest border border-dashed border-muted-foreground/30 p-4 rounded group-hover:border-primary/50 group-hover:text-primary transition-colors">
                                UI_PREVIEW: {module.slug.toUpperCase()}
                            </span>
                        </div>
                    </div>
                );
            })}
        </section>
      </main>
      <Footer />
    </div>
  );
}
