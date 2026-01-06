import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import Link from "next/link";
import { Shield, Lock, FileCheck, Eye, ShieldCheck } from "lucide-react";

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
                    Enterprise-Grade <span className="text-primary">Security</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                    Your data is your most valuable asset. We protect it with banking-grade encryption, strict access controls, and comprehensive audit logging.
                </p>
            </div>
        </section>

        <section className="py-20 container-custom px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-20">
                <div className="bg-card border border-border/40 p-8 rounded-2xl text-center">
                    <div className="mx-auto h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                        <Lock className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">SOC 2 Type II</h3>
                    <p className="text-muted-foreground text-sm">
                        Independently audited controls for security, availability, and confidentiality. We maintain strict compliance standards year-round.
                    </p>
                </div>
                <div className="bg-card border border-border/40 p-8 rounded-2xl text-center">
                    <div className="mx-auto h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                        <FileCheck className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">GDPR & CCPA</h3>
                    <p className="text-muted-foreground text-sm">
                        Built-in tools for PII management, data retention policies, and &quot;right to be forgotten&quot; requests.
                    </p>
                </div>
                <div className="bg-card border border-border/40 p-8 rounded-2xl text-center">
                    <div className="mx-auto h-12 w-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                        <Eye className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Audit Trails</h3>
                    <p className="text-muted-foreground text-sm">
                        Every action in the system is logged to an immutable append-only ledger. Know exactly who did what, and when.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto prose prose-invert">
                <h2 className="text-3xl font-bold font-serif mb-6 flex items-center gap-3">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    Our &quot;Zero-Trust&quot; Philosophy
                </h2>
                <p>
                    KW Enterprise is hosted on a secure, multi-tenant cloud infrastructure designed for high availability and disaster recovery.
                </p>
                <ul>
                    <li><strong>Encryption:</strong> AES-256 encryption at rest and TLS 1.3 in transit.</li>
                    <li><strong>Authentication:</strong> Support for SAML 2.0 / SSO (Okta, Azure AD) and MFA.</li>
                    <li><strong>RBAC:</strong> Granular role-based access control down to the field level.</li>
                    <li><strong>Network Security:</strong> WAF protection, DDoS mitigation, and private VPC peering.</li>
                </ul>

                <h2>Compliance Documentation</h2>
                <p>
                    Our full security package is available to enterprise customers under NDA.
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
