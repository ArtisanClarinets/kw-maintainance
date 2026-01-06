import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import Link from "next/link";
import { integrations } from "@/../content/integrations";
import { Globe, Server, Database, Layers } from "lucide-react";

export const metadata = {
  title: "Ecosystem Connectivity",
  description: "Seamlessly integrate KW Enterprise with Oracle Opera, Micros Simphony, SAP, and other hospitality infrastructure.",
};

export default function IntegrationsPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-muted/20 border-b border-border/10">
            <div className="container-custom px-4 text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold font-serif mb-6 text-foreground">
                    Operational <span className="text-primary">Synergy</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                    KW Enterprise orchestrates your entire property ecosystem. We harmonize with your existing PMS, POS, and financial infrastructure to eliminate operational silos.
                </p>
            </div>
        </section>

        <section className="py-20 container-custom px-4">
            <div className="grid md:grid-cols-2 gap-8">
                {integrations.map((cat) => (
                    <div key={cat.id} className="border border-border/40 rounded-2xl p-8 bg-card hover:shadow-lg transition-shadow">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                                {cat.id === 'pms' && <Globe className="h-5 w-5" />}
                                {cat.id === 'pos' && <Server className="h-5 w-5" />}
                                {cat.id === 'erp' && <Database className="h-5 w-5" />}
                                {cat.id === 'ipaas' && <Layers className="h-5 w-5" />}
                            </div>
                            <h2 className="text-2xl font-bold">{cat.category}</h2>
                        </div>
                        <p className="text-muted-foreground mb-6">{cat.description}</p>
                        
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-3">Supported Partners</h3>
                            <div className="flex flex-wrap gap-2">
                                {cat.partners.map(p => (
                                    <span key={p} className="px-3 py-1 bg-muted text-xs font-medium rounded-full border border-border">
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-3">Key Capabilities</h3>
                            <ul className="space-y-2">
                                {cat.capabilities.map((cap, i) => (
                                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        {cap}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-20 text-center bg-accent/5 rounded-2xl p-12 border border-accent/10">
                <h2 className="text-3xl font-bold mb-4">Don&apos;t see your system?</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Our API-first architecture and iPaaS support means we can connect to virtually any system with a modern interface.
                </p>
                <Button asChild size="lg">
                    <Link href="/request-demo">Discuss Custom Integrations</Link>
                </Button>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
