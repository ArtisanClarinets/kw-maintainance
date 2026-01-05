
"use client";

import Link from 'next/link';
import { siteConfig } from '@/../content/site';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40
      }
    }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      }
    })
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" }, // Assuming exists or placeholder
    { href: "/about", label: "About" },     // Assuming exists
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-16 items-center justify-between">
        {/* Brand */}
        <Link href="/" className="mr-6 flex items-center space-x-2 z-50 relative" onClick={() => setIsOpen(false)}>
          <span className="font-serif font-bold text-2xl tracking-tight text-foreground">K&W</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary text-muted-foreground"
            >
                {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Button asChild size="sm">
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
            className="md:hidden z-50 p-2 text-foreground focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
        >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="fixed inset-0 top-0 left-0 z-40 h-screen w-screen bg-background flex flex-col items-center justify-center p-8 md:hidden"
            >
              <nav className="flex flex-col items-center gap-8 text-lg font-medium">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={linkVariants}
                  >
                    <Link
                        href={link.href}
                        onClick={toggleMenu}
                        className="text-2xl font-serif text-foreground hover:text-primary transition-colors"
                    >
                        {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                    custom={navLinks.length}
                    variants={linkVariants}
                    className="mt-8"
                >
                    <Button asChild size="lg" className="w-full px-12">
                        <Link href="/contact" onClick={toggleMenu}>Get a Quote</Link>
                    </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
