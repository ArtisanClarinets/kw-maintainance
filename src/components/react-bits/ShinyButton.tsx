'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ShinyButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
    asChild?: boolean;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
}

export function ShinyButton({ children, className, onClick, asChild, size, variant, ...props }: ShinyButtonProps) {
    return (
        <motion.div
            initial={{ "--x": "100%", scale: 1 } as any}
            animate={{ "--x": "-100%" } as any}
            whileTap={{ scale: 0.97 }}
            transition={{
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 1,
                type: "spring",
                stiffness: 20,
                damping: 15,
                mass: 2,
                scale: {
                    type: "spring",
                    stiffness: 10,
                    damping: 5,
                    mass: 0.1,
                },
            }}
            className={cn(
                "relative rounded-md overflow-hidden bg-primary px-0 py-0 text-primary-foreground", // Remove default padding on container
                className
            )}
        >
             <motion.div
                className="absolute inset-0 z-0 w-full h-full -translate-x-full"
                animate={{ translateX: ["100%", "-100%"] }}
                transition={{
                    repeat: Infinity,
                    duration: 2, // Faster for more visibility
                    ease: "linear",
                    repeatDelay: 0.5
                }}
                style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                }}
            />

            <Button
                variant={variant || "default"}
                size={size}
                className={cn("relative z-10 w-full h-full border-0 shadow-none", className)}
                style={{ backgroundColor: 'transparent' }} // Force transparency so shine is visible
                onClick={onClick}
                asChild={asChild}
                {...props}
            >
                {children}
            </Button>
        </motion.div>
    );
}
