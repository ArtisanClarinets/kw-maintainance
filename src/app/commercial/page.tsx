
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { commercialServices } from "@/../content/commercial";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ShieldCheck, Clock, FileText, Briefcase } from "lucide-react";
import Link from "next/link";

export default function CommercialPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1">
        {/* Commercial Hero */}
        <div className="bg-slate-900 text-white py-20 md:py-32 relative overflow-hidden">
            {/* Abstract Background */}
            <div className="absolute inset-0 opacity-20">
                 <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
                 <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900 to-transparent" />
            </div>

            <div className="container-custom px-4 relative z-10 text-center">
                <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300 mb-6">
                    <Briefcase className="mr-2 h-4 w-4" />
                    B2B & Commercial Services
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold font-serif mb-6 tracking-tight">
                    Reliable Maintenance for <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Your Business Assets</span>
                </h1>
                <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                    We partner with property managers, HOAs, and business owners to keep operations running smoothly.
                    From preventative audits to emergency repairs, we are your on-demand facilities team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white border-none shadow-lg shadow-blue-900/20">
                        <Link href="/contact">Request Commercial Proposal</Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 hover:text-white">
                        <a href="tel:+18508513640">Call Dispatch: (850) 851-3640</a>
                    </Button>
                </div>
            </div>
        </div>

        {/* Value Props */}
        <section className="py-12 md:py-16 bg-muted/10 border-b border-border/10">
            <div className="container-custom px-4">
                 <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-8 overflow-x-auto snap-x snap-mandatory pb-6 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                    <div className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center h-full">
                        <Card className="bg-card border-border/50 shadow-sm hover:shadow-md transition-shadow h-full">
                            <CardHeader>
                                <div className="mb-4 h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                    <Clock className="h-6 w-6" />
                                </div>
                                <CardTitle>Priority Scheduling</CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground">
                                Commercial accounts get front-of-line access. We understand that downtime costs you money, so we prioritize your work orders.
                            </CardContent>
                        </Card>
                    </div>
                    <div className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center h-full">
                        <Card className="bg-card border-border/50 shadow-sm hover:shadow-md transition-shadow h-full">
                            <CardHeader>
                                <div className="mb-4 h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <CardTitle>Net 30 Billing</CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground">
                                Streamlined invoicing for property managers. We offer flexible billing terms and detailed work reports for your accounting.
                            </CardContent>
                        </Card>
                    </div>
                    <div className="min-w-[85vw] sm:min-w-[60vw] md:min-w-0 snap-center h-full">
                        <Card className="bg-card border-border/50 shadow-sm hover:shadow-md transition-shadow h-full">
                            <CardHeader>
                                <div className="mb-4 h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <CardTitle>Fully Compliant</CardTitle>
                            </CardHeader>
                            <CardContent className="text-muted-foreground">
                                Licensed, insured, and background-checked. We meet all vendor requirements for HOAs, hotels, and corporate facilities.
                            </CardContent>
                        </Card>
                    </div>
                 </div>
            </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 container-custom px-4">
            <div className="text-center mb-16">
                 <h2 className="text-3xl md:text-4xl font-extrabold font-serif mb-4">Commercial Solutions</h2>
                 <p className="text-muted-foreground max-w-2xl mx-auto">
                     Scalable maintenance packages tailored to your industry.
                 </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {commercialServices.map((service) => (
                    <div key={service.id} className="h-full">
                        <ServiceCard
                            slug={service.id}
                            title={service.title}
                            description={service.description}
                            icon={<service.icon className="h-6 w-6" />}
                            features={service.features}
                            basePath="/commercial"
                        />
                    </div>
                ))}
            </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-slate-900 text-white">
            <div className="container-custom px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Partner with K&W Maintenance</h2>
                <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
                    Stop juggling multiple contractors. Get a single, reliable point of contact for all your facility needs.
                </p>
                <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
                    <Link href="/contact">Set Up a Corporate Account</Link>
                </Button>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
