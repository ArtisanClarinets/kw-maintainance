"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  companyName: z.string().min(1, "Company name is required"),
  role: z.string().optional(),
  portfolioSize: z.string().optional(),
  message: z.string().min(10, "Please provide some details about your needs"),
  company: z.string().optional(), // Honeypot
});

type FormData = z.infer<typeof formSchema>;

function RequestDemoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Add timestamp and honeypot check logic handled by API, but we send the field
      const payload = {
        ...data,
        timestamp: Date.now(),
      };

      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      setIsSuccess(true);
      reset();
    } catch (err) {
      setError("Something went wrong. Please try again or contact enterprise sales directly.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <input type="text" className="hidden" {...register("company")} tabIndex={-1} autoComplete="off" />
      
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2 group">
          <label htmlFor="name" className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Full Name</label>
          <input
            {...register("name")}
            id="name"
            className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-all shadow-sm"
            placeholder="Jane Smith"
          />
          {errors.name && <p className="text-sm text-destructive font-medium">{errors.name.message}</p>}
        </div>
        <div className="space-y-2 group">
          <label htmlFor="email" className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Work Email</label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-all shadow-sm"
            placeholder="jane@company.com"
          />
          {errors.email && <p className="text-sm text-destructive font-medium">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2 group">
          <label htmlFor="phone" className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Phone Number</label>
          <input
            {...register("phone")}
            id="phone"
            type="tel"
            className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-all shadow-sm"
            placeholder="+1 (555) 000-0000"
          />
          {errors.phone && <p className="text-sm text-destructive font-medium">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2 group">
          <label htmlFor="companyName" className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Company Name</label>
          <input
            {...register("companyName")}
            id="companyName"
            className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-all shadow-sm"
            placeholder="Global Hospitality Group"
          />
          {errors.companyName && <p className="text-sm text-destructive font-medium">{errors.companyName.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2 group">
          <label htmlFor="role" className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Job Title</label>
          <input
            {...register("role")}
            id="role"
            className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-all shadow-sm"
            placeholder="VP of Operations"
          />
        </div>
        <div className="space-y-2 group">
          <label htmlFor="portfolioSize" className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Portfolio Size</label>
          <select
            {...register("portfolioSize")}
            id="portfolioSize"
            className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-all shadow-sm appearance-none"
          >
            <option value="" className="text-muted-foreground">Select number of properties...</option>
            <option value="1-5">1-5 Properties</option>
            <option value="6-20">6-20 Properties</option>
            <option value="21-50">21-50 Properties</option>
            <option value="50+">50+ Properties</option>
          </select>
        </div>
      </div>

      <div className="space-y-2 group">
        <label htmlFor="message" className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">How can we help?</label>
        <textarea
          {...register("message")}
          id="message"
          className="flex min-h-[120px] w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-all shadow-sm resize-y"
          placeholder="Tell us about your current challenges or what you'd like to see in the demo..."
        />
        {errors.message && <p className="text-sm text-destructive font-medium">{errors.message.message}</p>}
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 text-destructive rounded-lg flex items-center gap-2 text-sm">
           <AlertCircle className="w-4 h-4" />
           {error}
        </div>
      )}

      <Button type="submit" size="lg" className="w-full text-base h-12 relative overflow-hidden" disabled={isSubmitting || isSuccess}>
        <AnimatePresence mode="wait">
            {isSubmitting ? (
                <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2"
                >
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing Request...</span>
                </motion.div>
            ) : isSuccess ? (
                <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2 text-green-100"
                >
                    <CheckCircle2 className="h-5 w-5" />
                    <span>Request Sent!</span>
                </motion.div>
            ) : (
                <motion.span
                     key="default"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                >
                    Schedule Demo
                </motion.span>
            )}
        </AnimatePresence>
      </Button>
      <div className="mt-8 pt-8 border-t border-border/20">
        <p className="text-sm text-muted-foreground">
          By submitting this form, you agree to our privacy policy and terms of service. We&apos;ll never sell your data.
        </p>
      </div>
    </form>
  );
}

export default function RequestDemoPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-muted/20 -z-10" />
        
        <div className="container-custom py-20 px-4">
            <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                {/* Content Left */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold font-serif mb-6 text-foreground tracking-tight">
                            Experience the <span className="text-primary">Next Generation</span> of Hospitality Ops
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            See how KW Enterprise transforms complex property operations into a streamlined, data-driven advantage.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <span className="font-bold">1</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-1">Tailored Walkthrough</h3>
                                <p className="text-sm text-muted-foreground">We&apos;ll focus on the modules that matter most to your specific portfolio needs.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <span className="font-bold">2</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-1">Technical Deep Dive</h3>
                                <p className="text-sm text-muted-foreground">Review API capabilities, security architecture, and integration patterns with our engineers.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <span className="font-bold">3</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-1">ROI Analysis</h3>
                                <p className="text-sm text-muted-foreground">Get a custom projection of efficiency gains and cost savings based on your data.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Right */}
                <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                     {/* Glow effect */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-6">Request a Demo</h2>
                        <RequestDemoForm />
                    </div>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
