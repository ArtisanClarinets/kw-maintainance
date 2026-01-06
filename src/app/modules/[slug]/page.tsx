import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import Link from "next/link";
import { modules } from "@/../content/modules";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

export function generateStaticParams() {
  return modules.map((module) => ({
    slug: module.slug,
  }));
}

export default function ModulePage({ params }: { params: { slug: string } }) {
  const moduleData = modules.find((m) => m.slug === params.slug);

  if (!moduleData) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-muted/20 border-b border-border/10 py-16 md:py-24">
            <div className="container-custom px-4">
                <Link href="/platform" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Platform
                </Link>
                <div className="flex flex-col md:flex-row gap-8 md:items-start">
                    <div className="h-16 w-16 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                        <moduleData.icon className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold font-serif mb-4 text-foreground">{moduleData.title}</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl">{moduleData.description}</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-20 container-custom px-4">
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Key Capabilities</h2>
                    <div className="space-y-6">
                        {moduleData.features.map((feature, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-lg border border-border/40 bg-card hover:border-primary/20 transition-colors">
                                <div className="mt-1">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                </div>
                                <span className="font-medium">{feature}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-12">
                         <Button asChild size="lg">
                            <Link href="/request-demo">Schedule a Demo</Link>
                        </Button>
                    </div>
                </div>
                <div className="bg-muted rounded-2xl min-h-[400px] border border-border/50 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-muted/50" />
                    <span className="relative z-10 text-muted-foreground font-mono text-sm uppercase tracking-widest border border-dashed border-muted-foreground/30 p-4 rounded group-hover:border-primary/50 group-hover:text-primary transition-colors">
                        Interactive Demo: {moduleData.slug.toUpperCase()}
                    </span>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
