
import { siteConfig } from '@/../content/site';
import { Facebook, Instagram, MapPin, Phone, Mail, ShieldCheck, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from './Button';

export function Footer() {
  return (
    <footer className="border-t bg-muted/10 relative overflow-hidden">
        {/* Decorative blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom py-16 md:py-24 relative z-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand Column */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold tracking-tight text-primary">{siteConfig.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock size={16} className="text-primary" />
              <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
            </div>
            <div className="flex gap-4">
              <a href={siteConfig.socials.facebook} className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href={siteConfig.socials.instagram} className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Our Services</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/services" className="hover:text-primary transition-colors">All Services</Link></li>
              <li><Link href="/services/handyman-services" className="hover:text-primary transition-colors">General Repairs</Link></li>
              <li><Link href="/services/installations" className="hover:text-primary transition-colors">Installations</Link></li>
              <li><Link href="/services/painting" className="hover:text-primary transition-colors">Painting</Link></li>
              <li><Link href="/services/tv-mounting" className="hover:text-primary transition-colors">TV Mounting</Link></li>
              <li><Link href="/services/moving-and-trash-disposal" className="hover:text-primary transition-colors">Hauling & Trash</Link></li>
            </ul>
          </div>

           {/* Quick Links Column */}
           <div className="space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/service-area" className="hover:text-primary transition-colors">Service Area</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary transition-colors">How It Works</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/request-demo" className="hover:text-primary transition-colors">Request a Quote</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">Contact Us</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-primary mt-0.5 shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-primary transition-colors font-medium text-foreground">{siteConfig.phone}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-primary mt-0.5 shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-primary transition-colors">{siteConfig.email}</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
            <div className="pt-2">
                 <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/request-demo">Get a Free Quote</Link>
                 </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>

          <div className="flex items-center gap-6 text-xs text-muted-foreground bg-muted/30 px-4 py-2 rounded-full border border-border/50">
            <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                <span>Fully Licensed</span>
            </div>
            <div className="w-px h-3 bg-border" />
            <div className="flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                <span>Insured</span>
            </div>
          </div>

          <div className="flex gap-6 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
