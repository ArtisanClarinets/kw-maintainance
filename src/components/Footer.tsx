
import { siteConfig } from '@/../content/site';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container-custom py-12 md:py-16 px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold mb-4">{siteConfig.name}</h3>
            <p className="text-sm text-muted-fg max-w-xs leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex gap-4 mt-6">
              <a href={siteConfig.socials.facebook} className="text-muted-fg hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href={siteConfig.socials.instagram} className="text-muted-fg hover:text-primary">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-muted-fg">
              <li><Link href="/services" className="hover:text-fg">Handyman Services</Link></li>
              <li><Link href="/services" className="hover:text-fg">Installations</Link></li>
              <li><Link href="/services" className="hover:text-fg">Painting</Link></li>
              <li><Link href="/services" className="hover:text-fg">TV Mounting</Link></li>
              <li><Link href="/services" className="hover:text-fg">Moving & Trash</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-fg">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-fg">{siteConfig.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-fg">{siteConfig.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{siteConfig.address}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-fg">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-fg">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-fg">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
