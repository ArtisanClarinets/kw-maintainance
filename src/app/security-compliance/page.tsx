import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import Link from "next/link";
import { Shield, Lock, FileCheck, Eye, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Resilience & Accountability",
  description: "Institutional-grade security and accountability frameworks for hospitality operations and guest privacy.",
};

export default function SecurityCompliancePage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-muted/20 border-b border-border/10">
            <div className="container-custom px-4 text-center max-w-4xl mx-auto">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-6">
                    <Shield className="h-8 w-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold font-serif mb-6 text-foreground">
                    Operational <span className="text-primary">Resilience</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                    Hospitality trust is built on reliability. We protect your property operations and guest privacy with relentless security and comprehensive accountability.
                </p>
            </div>
        </section>

        <section className="py-20 container-custom px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-20">
                <div className="bg-card border border-border/40 p-8 rounded-2xl text-center">
                    <div className="mx-auto h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                        <Lock className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Institutional Integrity</h3>
                    <p className="text-muted-foreground text-sm">
                        Independently audited controls ensuring your operational data remains secure, available, and confidential across your entire portfolio.
                    </p>
                </div>
                <div className="bg-card border border-border/40 p-8 rounded-2xl text-center">
                    <div className="mx-auto h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                        <FileCheck className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Global Privacy Standards</h3>
                    <p className="text-muted-foreground text-sm">
                        Built-in compliance for guest data protection, adhering to stringent international privacy regulations and data sovereignty rules.
                    </p>
                </div>
                <div className="bg-card border border-border/40 p-8 rounded-2xl text-center">
                    <div className="mx-auto h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                        <Eye className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Absolute Accountability</h3>
                    <p className="text-muted-foreground text-sm">
                        Comprehensive evidence logging for every operational action. Maintain a clear, immutable record of service delivery and asset management.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto prose prose-invert">
                <h2 className="text-3xl font-bold font-serif mb-6 flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    Our &quot;Continuous Trust&quot; Framework
                </h2>
                <p>
                    KW Enterprise utilizes a hardened, multi-layered infrastructure designed to support the 24/7/365 demands of the hospitality industry.
                </p>
                <ul>
                    <li><strong>Data Fortification:</strong> Advanced multi-layer encryption at rest and in transit.</li>
                    <li><strong>Access Stewardship:</strong> Single Sign-On (SSO) and Multi-Factor Authentication (MFA) to ensure only authorized personnel access property systems.</li>
                    <li><strong>Precision Permissions:</strong> Role-based access control tailored to hospitality hierarchies, from General Managers to on-site technicians.</li>
                    <li><strong>Network Defense:</strong> Hardened perimeters, proactive threat mitigation, and isolated environment architectures.</li>
                </ul>

                <h2>Strategic Compliance Documentation</h2>
                <p>
                    Our complete operational safety and security framework is available for review by qualified stakeholders.
                </p>
                <div className="not-prose mt-8">
                    <Button asChild>
                        <Link href="/request-demo">Request Security Packet</Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
