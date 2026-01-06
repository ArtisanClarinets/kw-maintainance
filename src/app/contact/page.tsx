import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/../content/site";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

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
                    We maintain high operational availability across our core service corridors. For the most immediate resource deployment, please utilize our priority line below.
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
                <form className="space-y-4" action={`mailto:${siteConfig.email}`} method="post" encType="text/plain">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Officer Name</label>
                            <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-lg border border-input bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50" placeholder="Enter full name" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Mobile Contact</label>
                            <input type="tel" id="phone" name="phone" required className="w-full px-4 py-3 rounded-lg border border-input bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50" placeholder="(555) 000-0000" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="service" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Operational Sector</label>
                        <select id="service" name="service" className="w-full px-4 py-3 rounded-lg border border-input bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer">
                            <option value="Preventative Maintenance">Preventative Maintenance Protocols</option>
                            <option value="Hospitality Turnover">Hospitality Turnover Orchestration</option>
                            <option value="Facility Audits">Strategic Facility Audits</option>
                            <option value="General Maintenance">General Infrastructure Maintenance</option>
                            <option value="Installations">Commercial FF&E Installations</option>
                            <option value="Painting">Institutional Painting & Coatings</option>
                            <option value="Other">Other Strategic Requirement</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Engagement Specifics</label>
                        <textarea id="message" name="message" rows={4} className="w-full px-4 py-3 rounded-lg border border-input bg-muted/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none placeholder:text-muted-foreground/50" placeholder="Provide high-level details regarding the required operational outcome..."></textarea>
                    </div>

                    <Button type="submit" className="w-full py-6 text-lg font-bold uppercase tracking-widest shadow-lg shadow-primary/20" size="lg">
                        Submit Engagement Request
                    </Button>
                    <p className="text-xs text-muted-foreground/60 text-center mt-6 italic">
                        Clicking submit will open your institutional email client. Alternatively, transmit visuals via encrypted text to {siteConfig.phone}.
                    </p>
                </form>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
