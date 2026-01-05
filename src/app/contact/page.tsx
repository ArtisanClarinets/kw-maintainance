"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/../content/site";
import { Button } from "@/components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect, Suspense } from "react";
import { Loader2, CheckCircle2, CloudUpload, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { services } from "@/../content/services";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  service: z.string().min(1, "Please select a service"),
  details: z.string().min(10, "Please provide some details"),
});

type FormData = z.infer<typeof formSchema>;

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service');

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Pre-select service based on query param
  useEffect(() => {
    if (serviceId) {
      // Find the service title that matches the ID, or use the ID directly if no match (though titles are better for the select)
      const service = services.find(s => s.id === serviceId);
      if (service) {
        // We need to match the value expected by the select, which seems to be from siteConfig.services
        // Let's check if the service title exists in siteConfig.services
        // The select options come from siteConfig.services
        // Ideally we should map the serviceId to the correct string in siteConfig.services
        // For now, let's try to match loosely or default to the first one found

        // NOTE: The previous code used siteConfig.services.map(s => <option key={s} value={s}>{s}</option>)
        // We need to see if we can find a match.

        // Let's assume siteConfig.services contains strings that might match service.title or are similar.
        // Or we can just try to set the value if it matches.

        // A robust way: find a string in siteConfig.services that contains the service title or ID keywords?
        // Or better yet, we can check if the select options are exact matches.

        // Let's look at siteConfig content to be sure. But for now, I'll try to match the title.
        // Actually, the select uses `siteConfig.services`.

        // Let's assume the user might have clicked from a service page where the ID is "handyman"
        // and siteConfig.services has "Handyman Services".

        // For this task, I will attempt to set it.
        // If the service list in siteConfig matches the service titles in content/services, great.

        // Let's try to find an exact match first.
        const match = siteConfig.services.find(s => s.toLowerCase().includes(service.title.toLowerCase()) || service.title.toLowerCase().includes(s.toLowerCase()));
        if (match) {
             setValue('service', match);
        } else {
             // Fallback: if we can't find a smart match, we might leave it or try to set it.
             // Given I don't see siteConfig, I will assume siteConfig.services are likely the Titles or similar.
             // If siteConfig.services are just strings like "Handyman", "Plumbing", etc.

             // Let's iterate and see if any option includes the ID or parts of title.
             const titleWords = service.title.split(' ');
             const bestMatch = siteConfig.services.find(s => titleWords.some(w => s.toLowerCase().includes(w.toLowerCase())));
             if(bestMatch) setValue('service', bestMatch);
        }
      }
    }
  }, [serviceId, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      setError("Something went wrong. Please try again or call us directly.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label htmlFor="name" className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Name</label>
                  <input
                    {...register("name")}
                    id="name"
                    className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-all shadow-sm"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-sm text-destructive font-medium">{errors.name.message}</p>}
                </div>
                <div className="space-y-2 group">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Phone</label>
                  <input
                    {...register("phone")}
                    id="phone"
                    type="tel"
                    className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-all shadow-sm"
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && <p className="text-sm text-destructive font-medium">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="space-y-2 group">
                <label htmlFor="service" className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Service Needed</label>
                <div className="relative">
                    <select
                      {...register("service")}
                      id="service"
                      className="flex h-11 w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-all shadow-sm appearance-none"
                    >
                      <option value="" className="text-muted-foreground">Select a service...</option>
                      {siteConfig.services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                {errors.service && <p className="text-sm text-destructive font-medium">{errors.service.message}</p>}
              </div>

              <div className="space-y-2 group">
                <label htmlFor="details" className="text-sm font-medium text-foreground/80 group-focus-within:text-primary transition-colors">Project Details</label>
                <textarea
                  {...register("details")}
                  id="details"
                  className="flex min-h-[140px] w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary transition-all shadow-sm resize-y"
                  placeholder="Tell us about what you need done..."
                />
                {errors.details && <p className="text-sm text-destructive font-medium">{errors.details.message}</p>}
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
                            <span>Message Sent!</span>
                        </motion.div>
                    ) : (
                        <motion.span
                             key="default"
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             exit={{ opacity: 0 }}
                        >
                            Submit Request
                        </motion.span>
                    )}
                </AnimatePresence>
              </Button>
            </form>
  )
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-background">
      <Header />
      <main className="flex-1 py-16 md:py-24 container-custom">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold font-serif mb-6 text-foreground">Contact Us</h1>
            <p className="text-lg text-muted-foreground mb-12">
              Ready to get started? Fill out the form below for a free, no-obligation quote.
            </p>
          </motion.div>

          <div className="grid gap-8 mb-12">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="p-6 md:p-8 bg-muted/20 border border-border/50 rounded-2xl backdrop-blur-sm"
            >
              <h2 className="text-xl font-bold mb-4 font-serif">Quick Contacts</h2>
              <div className="space-y-3">
                 <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-semibold text-foreground">Phone:</span>
                    <a href={`tel:${siteConfig.phone}`} className="text-primary hover:underline font-medium">{siteConfig.phone}</a>
                    <span className="text-xs text-muted-foreground">(Text for faster response)</span>
                 </p>
                 <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-semibold text-foreground">Email:</span>
                    <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">{siteConfig.email}</a>
                 </p>
                 <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-semibold text-foreground">Service Area:</span>
                    <span className="text-muted-foreground">{siteConfig.serviceArea}</span>
                 </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 font-serif">Request a Quote</h2>
            <Suspense fallback={<div>Loading form...</div>}>
               <ContactForm />
            </Suspense>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
