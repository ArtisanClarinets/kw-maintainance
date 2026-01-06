import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import Link from "next/link";
import { ArrowLeft, BookOpen, Zap, BarChart, Server } from "lucide-react";

export const metadata = {
  title: "Operational Blueprint | KW Enterprise",
  description: "Strategic framework and vision for elite hospitality maintenance and infrastructure management.",
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
                    The Modern Hospitality Operations Blueprint
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Strategic Framework for Institutional Performance & Asset Stewardship.
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
                        The hospitality sector faces a critical gap in infrastructure management. Fragmented protocols for work orders, asset life cycles, and guest services lead to uncaptured warranty equity and diminished guest satisfaction scores.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                        <strong>KW Enterprise</strong> delivers a unified operational ecosystem designed to orchestrate property management across entire global portfolios with absolute precision.
                    </p>
                </div>

                {/* Engineering Excellence */}
                <div>
                    <h2 className="text-3xl font-bold font-serif mb-6 flex items-center gap-3">
                        <Server className="h-6 w-6 text-primary" />
                        Infrastructure Excellence
                    </h2>
                    <p className="text-muted-foreground mb-6">
                        Our underlying architecture is engineered for 24/7 reliability, providing a resilient infrastructure for decision-makers and stewards of elite property.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-muted/20 p-6 rounded-xl border border-border/30">
                            <h3 className="font-bold text-foreground mb-2">Interface Precision</h3>
                            <p className="text-sm text-muted-foreground">High-fidelity, server-optimized views for instantaneous data retrieval and operational oversight.</p>
                        </div>
                        <div className="bg-muted/20 p-6 rounded-xl border border-border/30">
                            <h3 className="font-bold text-foreground mb-2">Ergonomic Design</h3>
                            <p className="text-sm text-muted-foreground">Low-fatigue visual aesthetics optimized for professional command centes and low-light control environments.</p>
                        </div>
                        <div className="bg-muted/20 p-6 rounded-xl border border-border/30">
                            <h3 className="font-bold text-foreground mb-2">Model Validation</h3>
                            <p className="text-sm text-muted-foreground">Rigorous schema enforcement for all domain models, ensuring data integrity across every property node.</p>
                        </div>
                        <div className="bg-muted/20 p-6 rounded-xl border border-border/30">
                            <h3 className="font-bold text-foreground mb-2">Institutional Security</h3>
                            <p className="text-sm text-muted-foreground">Hierarchical access control, cryptographic verification, and immutable operational ledgering.</p>
                        </div>
                    </div>
                </div>

                {/* Operational Capabilities */}
                <div>
                    <h2 className="text-3xl font-bold font-serif mb-8 flex items-center gap-3">
                        <BarChart className="h-6 w-6 text-primary" />
                        Operational Capabilities
                    </h2>
                    
                    <div className="space-y-12">
                        <div className="border-l-2 border-primary pl-6">
                            <h3 className="text-2xl font-bold mb-3">1. Precision Work Orchestration</h3>
                            <p className="text-muted-foreground mb-4">
                                Our orchestration engine implements a strict operational state machine, enforcing adherence to elite brand standards and safety protocols.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Standardized Transitions:</strong> Enforces mandatory quality control before financial closure.</li>
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Intelligent Deduplication:</strong> Analytical detection of parallel requests to optimize resource deployment.</li>
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Evidence Custody:</strong> Verification protocols requiring visual confirmation of service excellence.</li>
                            </ul>
                        </div>

                        <div className="border-l-2 border-primary pl-6">
                            <h3 className="text-2xl font-bold mb-3">2. Smart Resource Deployment</h3>
                            <p className="text-muted-foreground mb-4">
                                Replaces manual assignment with constraint-driven optimization of professional labor.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Skill-Based Routing:</strong> Matching technician certifications with specific asset requirements.</li>
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Wait-Time Mitigation:</strong> Dynamic prioritizing based on Service Level Agreements (SLAs).</li>
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Incident Simulation:</strong> Rapid redistribution capabilities for emergency property response.</li>
                            </ul>
                        </div>

                        <div className="border-l-2 border-primary pl-6">
                            <h3 className="text-2xl font-bold mb-3">3. Asset Stewardship & TCO Modeling</h3>
                            <p className="text-muted-foreground mb-4">
                                A hierarchical framework for deep visibility into the long-term health of capital equipment.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Portfolio Hierarchy:</strong> From regional oversight down to individual component health.</li>
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Value Optimization:</strong> Real-time Total Cost of Ownership analysis to inform replacement cycles.</li>
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Liability Detection:</strong> Automated identification of assets that fall below performance thresholds.</li>
                            </ul>
                        </div>

                        <div className="border-l-2 border-primary pl-6">
                            <h3 className="text-2xl font-bold mb-3">4. Multi-Node Inventory Logistics</h3>
                            <p className="text-muted-foreground mb-4">
                                Supply chain precision tailored for distributed hospitality environments.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Strategic Staging:</strong> Centralized hubs, property closets, and mobile service stock.</li>
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Dynamic Replenishment:</strong> Threshold-based triggers to ensure mission-critical parts availability.</li>
                            </ul>
                        </div>

                         <div className="border-l-2 border-primary pl-6">
                            <h3 className="text-2xl font-bold mb-3">5. Predictive Infrastructure Monitoring</h3>
                            <p className="text-muted-foreground mb-4">
                                Integrating physical systems with intelligent digital workflows.
                            </p>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Telemetry Ingestion:</strong> Comprehensive support for institutional building automation protocols.</li>
                                <li className="flex gap-2"><span className="text-primary font-bold">•</span> <strong>Pre-emptive Action:</strong> Predictive modeling to trigger interventions before guest experience is impacted.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-primary/5 rounded-2xl p-12 text-center border border-primary/10 mt-16">
                    <h2 className="text-3xl font-bold font-serif mb-4">Advance Your Operational Maturity</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Consult with our operational architects to design a maintenance ecosystem tailored to your portfolio&apos;s unique demands.
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
