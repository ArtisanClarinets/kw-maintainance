'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/shared/ui/button';
import { cn } from '@/shared/lib/utils';
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
    const shouldReduceMotion = useReducedMotion();

    return (
        <motion.div
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
            }}
            className={cn(
                "relative rounded-md overflow-hidden bg-primary px-0 py-0 text-primary-foreground inline-block",
                className
            )}
        >
             {/* Only render shine if reduced motion is disabled */}
             {!shouldReduceMotion && (
                 <motion.div
                    className="absolute inset-0 z-0 w-full h-full -translate-x-full"
                    animate={{ translateX: ["100%", "-100%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 3, // Slower, more elegant shine
                        ease: "linear",
                        repeatDelay: 2
                    }}
                    style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)", // slightly more subtle
                    }}
                />
             )}

            <Button
                variant={variant || "default"}
                size={size}
                className={cn("relative z-10 w-full h-full border-0 shadow-none", className)}
                style={{ backgroundColor: 'transparent' }}
                onClick={onClick}
                asChild={!!asChild}
                {...props}
            >
                {children}
            </Button>
        </motion.div>
    );
}
