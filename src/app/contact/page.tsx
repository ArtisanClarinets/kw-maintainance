"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/../content/site";
import { Button } from "@/components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { toast, ToastProvider } from "@/react-bits/Toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  service: z.string().min(1, "Please select a service"),
  details: z.string().min(10, "Please provide some details"),
  // file handling would be more complex in real app, simplified here
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to submit');

      toast({
        title: "Request Received!",
        description: "We'll get back to you shortly.",
        type: "success",
      });
      reset();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Please try again or call us directly.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col font-sans">
        <Header />
        <main className="flex-1 py-12 container-custom px-4">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

            <div className="grid gap-8 mb-12">
              <div className="p-6 bg-muted/30 rounded-xl">
                <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                <p className="mb-2"><strong>Phone:</strong> <a href={`tel:${siteConfig.phone}`} className="text-primary hover:underline">{siteConfig.phone}</a></p>
                <p className="mb-2"><strong>Email:</strong> <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">{siteConfig.email}</a></p>
                <p><strong>Area:</strong> {siteConfig.serviceArea}</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Request a Quote</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <input
                    {...register("name")}
                    id="name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                  <input
                    {...register("phone")}
                    id="phone"
                    type="tel"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Your phone number"
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium">Service Needed</label>
                <select
                  {...register("service")}
                  id="service"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select a service...</option>
                  {siteConfig.services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.service && <p className="text-sm text-destructive">{errors.service.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="details" className="text-sm font-medium">Project Details</label>
                <textarea
                  {...register("details")}
                  id="details"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Describe your project..."
                />
                {errors.details && <p className="text-sm text-destructive">{errors.details.message}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="photos" className="text-sm font-medium">Upload Photos (Optional)</label>
                <input
                  id="photos"
                  type="file"
                  multiple
                  accept="image/*"
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-fg file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
                <p className="text-xs text-muted-fg">You can upload multiple photos of the area needing work.</p>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : "Submit Request"}
              </Button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
}
