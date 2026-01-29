"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Hammer, Building2, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Services",
    href: "/services",
    icon: Hammer,
  },
  {
    name: "Commercial",
    href: "/commercial",
    icon: Building2,
  },
  {
    name: "Contact",
    href: "/request-demo",
    icon: Phone,
  },
];

export function MobileNav() {
  const pathname = usePathname();

  // Don't show on admin routes or login
  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <nav className="relative flex items-center justify-around border-t border-border/10 bg-background/80 backdrop-blur-lg px-2 pt-3 shadow-2xl supports-[backdrop-filter]:bg-background/60 pb-[calc(12px+env(safe-area-inset-bottom))]">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex flex-col items-center justify-center gap-1 rounded-xl px-4 py-1 transition-colors min-w-[64px] select-none touch-manipulation",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="relative p-1">
                <Icon
                  size={24}
                  className={cn(
                    "transition-transform duration-200 group-active:scale-95",
                    isActive && "scale-110"
                  )}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-primary"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
              </div>
              <span className="text-[10px] font-medium tracking-tight">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
