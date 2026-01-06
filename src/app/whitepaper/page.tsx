import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import Link from "next/link";
import { ArrowLeft, BookOpen, Zap, BarChart, Server } from "lucide-react";

export const metadata = {
  title: "Platform Specification | KW Enterprise",
  description: "Technical architecture and strategic vision for the Next-Generation Enterprise Hospitality Maintenance Platform.",
};

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-background font-sans flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 border-b border-border/10 py-16 md:py-24">
            <div className="container-custom px-4 max-w-4xl mx-auto text-center">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Link>
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6 text-primary">
                    <BookOpen className="h-8 w-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold font-serif tracking-tight mb-6 text-foreground">
                    The Future of Hospitality Operations
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Technical Specification & Strategic Vision for the Modern Enterprise.
                </p>
            </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24 container-custom px-4 max-w-4xl mx-auto">
            <article className="prose prose-invert prose-lg max-w-none space-y-16">
                
                {/* Executive Summary */}
                <div className="bg-card border border-border/40 rounded-2xl p-8 md:p-12 shadow-sm">
                    <h2 className="text-3xl font-bold font-serif mb-6 flex items-center gap-3">
                        <Zap className="h-6 w-6 text-yellow-500" />
                        Executive Summary
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                        The hospitality industry has long struggled with fragmented maintenance operations, relying on disparate systems for work orders, asset management, and guest services. 
                        This fragmentation leads to operational inefficiencies, uncaptured warranty claims, and suboptimal guest experiences.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                        <strong>KW Enterprise</strong> introduces a unified &quot;Next-Generation Enterprise Hospitality Maintenance Platform&quot; designed to orchestrate operations across entire portfolios with military-grade precision.
                    </p>
                </div>

                {/* Core Architecture */}
                <div>
                    <h2 className="text-3xl font-bold font-serif mb-6 flex items-center gap-3">
                        <Server className="h-6 w-6 text-primary" />
                        Core Architecture
                    </h2>
                    <p className="text-muted-foreground mb-6">
                        Built on a modern, cloud-native stack, the platform ensures scalability, security, and performance for Fortune 500 enterprises.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-muted/20 p-6 rounded-xl border border-border/30">
                            <h3 className="font-bold text-foreground mb-2">Frontend</h3>
                            <p className="text-sm text-muted-foreground">Next.js App Router for high-performance, server-rendered views with dynamic hydration.</p>
                        </div>
                        <div className="bg-muted/20 p-6 rounded-xl border border-border/30">
                            <h3 className="font-bold text-foreground mb-2">Styling</h3>
                            <p className="text-sm text-muted-foreground">Tailwind CSS implementation of a &quot;Dark Ops&quot; aesthetic for low-light control room environments.</p>
                        </div>
                        <div className="bg-muted/20 p-6 rounded-xl border border-border/30">
                            <h3 className="font-bold text-foreground mb-2">Type Safety</h3>
                            <p className="text-sm text-muted-foreground">Strict TypeScript with Zod schema validation for all domain models and API inputs.</p>
                        </div>
                        <div className="bg-muted/20 p-6 rounded-xl border border-border/30">
                            <h3 className="font-bold text-foreground mb-2">Security</h3>
                            <p className="text-sm text-muted-foreground">SOC2-aligned RBAC, signed JWT authentication, and immutable audit logging.</p>
                        </div>
                    </div>
                </div>

                {/* Module Specifications */}
                <div>
                    <h2 className="text-3xl font-bold font-serif mb-8 flex items-center gap-3">
                        <BarChart className="h-6 w-6 text-primary" />
                        Module Specifications
                    </h2>
                    
                    <div className="space-y-12">
                        <div className="border-l-2 border-primary pl-6">
                            <h3 className="text-2xl font-bold mb-3">1. Intelligent Work Orders</h3>
                            <p className="text-muted-foreground mb-4">
                                Moving beyond simple ticketing, the Work Order engine implements a strict state machine to enforce Standard Operating Procedures (SOPs).
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>State Machine:</strong> Enforces transitions (e.g., QC Pending &rarr; Financial Close).</li>
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Deduplication:</strong> Algorithmic detection of duplicate requests within time windows.</li>
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Evidence Locker:</strong> Mandatory photo/video proof for completion verification.</li>
                            </ul>
                        </div>

                        <div className="border-l-2 border-primary pl-6">
                            <h3 className="text-2xl font-bold mb-3">2. Algorithmic Dispatch</h3>
                            <p className="text-muted-foreground mb-4">
                                The platform replaces manual assignment with constraint-based optimization.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Hard Constraints:</strong> Technician certification and skill tags.</li>
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Soft Constraints:</strong> Proximity, SLA pressure, and workload balancing.</li>
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Simulation:</strong> &quot;Mass Reshuffle&quot; capabilities for emergency response scenarios.</li>
                            </ul>
                        </div>

                        <div className="border-l-2 border-primary pl-6">
                            <h3 className="text-2xl font-bold mb-3">3. Asset Lifecycle & TCO</h3>
                            <p className="text-muted-foreground mb-4">
                                A hierarchical registry providing deep visibility into capital equipment health.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Hierarchy:</strong> Region &rarr; Property &rarr; Building &rarr; System &rarr; Asset &rarr; Component.</li>
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>TCO Analysis:</strong> Real-time tracking of Total Cost of Ownership vs. Replacement Value.</li>
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Bad Actor Detection:</strong> Automated flagging of assets exceeding maintenance spend thresholds.</li>
                            </ul>
                        </div>

                        <div className="border-l-2 border-primary pl-6">
                            <h3 className="text-2xl font-bold mb-3">4. Multi-Echelon Inventory</h3>
                            <p className="text-muted-foreground mb-4">
                                Supply chain management tailored for distributed hospitality operations.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Locations:</strong> Central warehouses, satellite closets, and mobile truck stock.</li>
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Replenishment:</strong> Min/max triggers and automated purchase request generation.</li>
                            </ul>
                        </div>

                         <div className="border-l-2 border-primary pl-6">
                            <h3 className="text-2xl font-bold mb-3">5. IoT & Predictive Maintenance</h3>
                            <p className="text-muted-foreground mb-4">
                                Bridging the gap between physical systems and digital workflows.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Telemetry Ingestion:</strong> Support for BACnet, Modbus, and MQTT streams.</li>
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Edge Rules:</strong> Local computation to filter noise and trigger alerts.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-primary/5 rounded-2xl p-12 text-center border border-primary/10 mt-16">
                    <h2 className="text-3xl font-bold font-serif mb-4">Ready to Transform Your Operations?</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Experience the power of KW Enterprise firsthand. Schedule a personalized demonstration with our solution architects.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" asChild>
                            <Link href="/request-demo">Request Demo</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/platform">Explore Platform</Link>
                        </Button>
                    </div>
                </div>

            </article>
        </section>
      </main>
      <Footer />
    </div>
  );
}
