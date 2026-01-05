
import Link from 'next/link';
import { siteConfig } from '@/../content/site';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-xl tracking-tight">K&W</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">Home</Link>
          <Link href="/services" className="transition-colors hover:text-foreground/80 text-foreground/60">Services</Link>
          <Link href="/gallery" className="transition-colors hover:text-foreground/80 text-foreground/60">Gallery</Link>
          <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">About</Link>
          <Link href="/contact" className="transition-colors hover:text-foreground/80 text-foreground/60">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Get a Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
