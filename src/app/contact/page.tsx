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
                <h1 className="text-4xl md:text-5xl font-extrabold font-serif mb-6">Contact Us</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Get a free estimate or schedule a service today.
                </p>
            </div>
        </div>

        <div className="container-custom px-4 py-20 grid md:grid-cols-2 gap-12 lg:gap-24">
            <div>
                <h2 className="text-2xl font-bold font-serif mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                    We prefer text messages or calls for the fastest response. If we don&apos;t pick up immediately, we are likely on a job site. Please leave a detailed message or send a text, and we will get back to you as soon as possible.
                </p>

                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <Phone className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="font-semibold">Call or Text</div>
                            <a href={`tel:${siteConfig.phone.replace(/[^0-9]/g, '')}`} className="text-lg hover:text-primary transition-colors">
                                {siteConfig.contactPerson}: {siteConfig.phone}
                            </a>
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

            <div className="bg-card p-8 rounded-2xl border border-border shadow-sm">
                <h3 className="text-xl font-bold mb-6">Request a Quote Online</h3>
                {/*
                  In a real app, this would be a form connected to an API route.
                  For now, we'll keep it simple or use a mailto link / text link since backend isn't specified in detail.
                */}
                <form className="space-y-4" action={`mailto:${siteConfig.email}`} method="post" encType="text/plain">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Name</label>
                            <input type="text" id="name" name="name" required className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                            <input type="tel" id="phone" name="phone" required className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="service" className="text-sm font-medium">Service Needed</label>
                        <select id="service" name="service" className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                            <option value="Handyman">Handyman Services</option>
                            <option value="Installations">Installations</option>
                            <option value="Painting">Painting</option>
                            <option value="TV Mounting">TV Mounting</option>
                            <option value="Moving/Trash">Moving & Trash Disposal</option>
                            <option value="Hauling">Truck & Trailer Haul</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">Details</label>
                        <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring" placeholder="Please describe what you need help with..."></textarea>
                    </div>

                    <Button type="submit" className="w-full" size="lg">Send Request</Button>
                    <p className="text-xs text-muted-foreground text-center mt-4">
                        Clicking send will open your email client. Alternatively, text photos to {siteConfig.phone}.
                    </p>
                </form>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
