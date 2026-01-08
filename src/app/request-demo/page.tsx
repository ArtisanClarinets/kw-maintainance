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
  serviceType: z.string().min(1, "Service type is required"),
  message: z.string().min(10, "Please provide some details about your needs"),
  address: z.string().optional(),
  company: z.string().optional(), // Honeypot
});

type FormData = z.infer<typeof formSchema>;

function RequestQuoteForm() {
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
      setError("Something went wrong. Please try again or give us a call directly.");
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
            placeholder="John Doe"
          />
          {errors.name && <p className="text-sm text-destructive font-medium">{errors.name.message}</p>}
        </div>
        <div className="space-y-2 group">
          <label htmlFor="email" className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Email</label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-all shadow-sm"
            placeholder="john@example.com"
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
            placeholder="(850) 555-0123"
          />
          {errors.phone && <p className="text-sm text-destructive font-medium">{errors.phone.message}</p>}
        </div>
        <div className="space-y-2 group">
          <label htmlFor="serviceType" className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Service Needed</label>
          <select
            {...register("serviceType")}
            id="serviceType"
            className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-all shadow-sm appearance-none"
          >
            <option value="" className="text-muted-foreground">Select a service...</option>
            <option value="Handyman Repair">General Handyman Repair</option>
            <option value="Painting">Painting</option>
            <option value="TV Mounting">TV Mounting</option>
            <option value="Moving/Hauling">Moving or Hauling</option>
            <option value="Installation">Installation</option>
            <option value="Other">Other</option>
          </select>
          {errors.serviceType && <p className="text-sm text-destructive font-medium">{errors.serviceType.message}</p>}
        </div>
      </div>

      <div className="space-y-2 group">
          <label htmlFor="address" className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Property Address (Optional)</label>
          <input
            {...register("address")}
            id="address"
            className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-all shadow-sm"
            placeholder="123 Main St, Fort Walton Beach, FL"
          />
      </div>

      <div className="space-y-2 group">
        <label htmlFor="message" className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Project Details</label>
        <textarea
          {...register("message")}
          id="message"
          className="flex min-h-[120px] w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-all shadow-sm resize-y"
          placeholder="Please describe what you need help with..."
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
                    <span>Sending...</span>
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
                    Get My Free Quote
                </motion.span>
            )}
        </AnimatePresence>
      </Button>
      <div className="mt-8 pt-8 border-t border-border/20">
        <p className="text-sm text-muted-foreground">
          By submitting this form, you agree to allow us to contact you regarding your quote request. We respect your privacy.
        </p>
      </div>
    </form>
  );
}

export default function RequestQuotePage() {
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
                            Request a <span className="text-primary">Free Quote</span>
                        </h1>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Tell us about your project and we will get back to you with a competitive price and a plan to get it done.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <span className="font-bold">1</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-1">Tell Us What You Need</h3>
                                <p className="text-sm text-muted-foreground">Fill out the form with details about your repair or installation project.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <span className="font-bold">2</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-1">Get a Quote</h3>
                                <p className="text-sm text-muted-foreground">We will review your request and provide an estimate or schedule a visit.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <span className="font-bold">3</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-1">Job Done Right</h3>
                                <p className="text-sm text-muted-foreground">Our professional team will complete the work to your satisfaction.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Right */}
                <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                     {/* Glow effect */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold mb-6">Project Details</h2>
                        <RequestQuoteForm />
                    </div>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
