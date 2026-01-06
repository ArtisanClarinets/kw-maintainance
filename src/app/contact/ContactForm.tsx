'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const SERVICE_OPTIONS = [
  { value: 'Preventative Maintenance', label: 'Preventative Maintenance Plan' },
  { value: 'Hospitality Turnover', label: 'Hospitality Turnover & Touch-ups' },
  { value: 'Facility Audits', label: 'Facility & Compliance Audits' },
  { value: 'Emergency Response', label: 'Emergency Response & Rapid Dispatch' },
  { value: 'Residential Support', label: 'Residential / Handyman Support' },
  { value: 'Installations', label: 'Install & FF&E Coordination' },
];

const PROPERTY_TYPES = [
  { value: 'hotel', label: 'Hotel / Resort Property' },
  { value: 'condo', label: 'Condo / Residential Community' },
  { value: 'rental', label: 'Short-term Rental (Airbnb, VRBO)' },
  { value: 'commercial', label: 'Commercial Facility / Office' },
  { value: 'single-family', label: 'Single-family Home' },
];

type LeadStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<LeadStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [timestamp, setTimestamp] = useState(() => Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setTimestamp(Date.now());
  }, []);

  const resetForm = useCallback(() => {
    formRef.current?.reset();
    setTimestamp(Date.now());
  }, []);

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');
    setStatusMessage('');

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get('name')?.toString().trim() ?? '',
      email: formData.get('email')?.toString().trim() ?? '',
      phone: formData.get('phone')?.toString().trim() ?? '',
      companyName: formData.get('companyName')?.toString().trim() ?? '',
      role: formData.get('role')?.toString().trim() ?? undefined,
      portfolioSize: formData.get('portfolioSize')?.toString().trim() ?? undefined,
      service: formData.get('service')?.toString().trim() ?? undefined,
      propertyType: formData.get('propertyType')?.toString().trim() ?? undefined,
      units: formData.get('units')?.toString().trim() ?? undefined,
      message: formData.get('message')?.toString().trim() ?? '',
      company: formData.get('company')?.toString().trim() ?? '',
      timestamp: Number(formData.get('timestamp') ?? Date.now()),
    };

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result?.error ?? 'We could not submit the request right now.');
      }

      setStatus('success');
      setStatusMessage('Thanks! Dispatch is reviewing your intake and will reach out within the next available slot.');
      resetForm();
    } catch (error) {
      setStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Unexpected error while sending the form.');
    }
  }, [resetForm, status]);

  const statusTone = status === 'success' ? 'text-emerald-400' : 'text-amber-400';

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
      <input type="hidden" name="company" value="" />
      <input type="hidden" name="timestamp" value={timestamp} />

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Name</span>
          <input name="name" type="text" required className="w-full px-4 py-3 rounded-lg border border-input bg-muted/20" placeholder="Dana Operations" />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Email</span>
          <input name="email" type="email" required className="w-full px-4 py-3 rounded-lg border border-input bg-muted/20" placeholder="name@institution.com" />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Phone</span>
          <input name="phone" type="tel" required className="w-full px-4 py-3 rounded-lg border border-input bg-muted/20" placeholder="(850) 555-0000" />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Property Type</span>
          <select name="propertyType" className="w-full px-4 py-3 rounded-lg border border-input bg-muted/20" required defaultValue="">
            <option value="" disabled hidden>Select property type</option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Organization / Venue</span>
          <input name="companyName" type="text" required className="w-full px-4 py-3 rounded-lg border border-input bg-muted/20" placeholder="Grand Shore Resorts" />
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Title / Role</span>
          <input name="role" type="text" className="w-full px-4 py-3 rounded-lg border border-input bg-muted/20" placeholder="Director of Engineering" />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Focus Service</span>
          <select name="service" className="w-full px-4 py-3 rounded-lg border border-input bg-muted/20" required defaultValue="">
            <option value="" disabled hidden>Select a focus service</option>
            {SERVICE_OPTIONS.map((service) => (
              <option key={service.value} value={service.value}>{service.label}</option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">Units / Rooms</span>
          <input name="units" type="number" min={1} className="w-full px-4 py-3 rounded-lg border border-input bg-muted/20" placeholder="32" />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Portfolio Size (optional)</span>
        <input name="portfolioSize" type="text" className="w-full px-4 py-3 rounded-lg border border-input bg-muted/20" placeholder="120 rooms across 3 properties" />
      </label>

      <label className="space-y-2">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Operational Request</span>
        <textarea name="message" rows={4} required className="w-full px-4 py-3 rounded-lg border border-input bg-muted/20" placeholder="Describe the operational challenge, turnover requirements, or compliance goal..." />
      </label>

      <div className="flex flex-col gap-2">
        <Button type="submit" className="w-full py-5" disabled={status === 'loading'}>
          {status === 'loading' ? 'Submitting…' : 'Send Intake to Dispatch'}
        </Button>
        {status !== 'idle' && (
          <p className={`${statusTone} text-sm font-medium`}>{statusMessage}</p>
        )}
      </div>
    </form>
  );
}
