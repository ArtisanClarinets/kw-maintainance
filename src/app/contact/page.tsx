import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/../content/site";
import { Phone, Mail, MapPin } from "lucide-react";
import ContactForm from "./ContactForm";
import { SplitText } from "@/components/react-bits/SplitText";
import { SpotlightCard } from "@/components/react-bits/SpotlightCard";
import { AnimatedGridPattern } from "@/components/react-bits/AnimatedGridPattern";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background relative">
      <Header />
      <main className="flex-1 relative">
         <AnimatedGridPattern
              numSquares={30}
              maxOpacity={0.1}
              duration={3}
              repeatDelay={1}
              className="text-primary/20 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
          />
        <div className="bg-muted/30 py-16 md:py-24 relative z-10">
            <div className="container-custom px-4 text-center">
                <SplitText
                    text="Contact Us"
                    className="text-4xl md:text-5xl font-extrabold font-serif mb-6 text-foreground justify-center"
                    delay={0.03}
                />
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Get in touch today for a free quote or to schedule a service.
                </p>
            </div>
        </div>

        <div className="container-custom px-4 py-20 grid md:grid-cols-2 gap-12 lg:gap-24 relative z-10">
            <div>
                <h2 className="text-2xl font-bold font-serif mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                    We are here to answer any questions you may have about our services. Call, email, or fill out the form below.
                </p>

                <div className="space-y-6">
                    <SpotlightCard className="bg-card rounded-xl border border-border/50">
                        <div className="flex items-center gap-4 p-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="font-semibold uppercase tracking-wider text-xs text-muted-foreground mb-1">Phone</div>
                                <a href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`} className="text-xl font-bold hover:text-primary transition-colors">
                                    {siteConfig.phone}
                                </a>
                                <div className="text-sm text-muted-foreground mt-1">Ask for {siteConfig.contactPerson}</div>
                            </div>
                        </div>
                    </SpotlightCard>

                    <SpotlightCard className="bg-card rounded-xl border border-border/50">
                        <div className="flex items-center gap-4 p-4">
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
                    </SpotlightCard>

                    <SpotlightCard className="bg-card rounded-xl border border-border/50">
                        <div className="flex items-center gap-4 p-4">
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
                    </SpotlightCard>
                </div>
            </div>

            <SpotlightCard className="bg-card rounded-2xl border border-border/80 shadow-lg h-fit">
                <div className="p-8">
                    <h3 className="text-xl font-bold font-serif mb-6 text-foreground">Send Us a Message</h3>
                    <ContactForm />
                </div>
            </SpotlightCard>
        </div>
      </main>
      <Footer />
    </div>
  );
}
