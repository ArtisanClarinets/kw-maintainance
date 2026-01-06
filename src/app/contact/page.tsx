import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/../content/site";
import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1">
        <div className="bg-muted/30 py-16 md:py-24">
            <div className="container-custom px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold font-serif mb-6 text-foreground">Operational Engagement</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Initiate a strategic assessment or schedule institutional maintenance services with elite brand-aligned protocols.
                </p>
            </div>
        </div>

        <div className="container-custom px-4 py-20 grid md:grid-cols-2 gap-12 lg:gap-24">
            <div>
                <h2 className="text-2xl font-bold font-serif mb-6">Engagement Desk</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                    We stand ready to deploy craft crews, audit teams, and emergency response drivers with the same luxury standards our hospitality partners expect.
                </p>

                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Phone className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="font-semibold uppercase tracking-wider text-xs text-muted-foreground mb-1">Priority Operations Line</div>
                            <a href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`} className="text-xl font-bold hover:text-primary transition-colors">
                                {siteConfig.phone}
                            </a>
                            <div className="text-sm text-muted-foreground mt-1">Attn: {siteConfig.contactPerson}</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Mail className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="font-semibold">Email</div>
                            <a href={`mailto:${siteConfig.email}`} className="text-lg hover:text-primary transition-colors">
                                {siteConfig.email}
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="font-semibold">Service Area</div>
                            <div className="text-lg text-muted-foreground">
                                Fort Walton Beach, Mary Esther, Shalimar, Okaloosa Island, Destin
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border/80 shadow-lg">
                <h3 className="text-xl font-bold font-serif mb-6 text-foreground">Strategic Assessment Intake</h3>
                <ContactForm />
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
