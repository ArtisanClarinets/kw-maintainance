import { z } from 'zod';

export const LeadSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  companyName: z.string().min(1, "Company name is required"),
  role: z.string().optional(),
  portfolioSize: z.string().optional(),
  propertyType: z.string().optional(),
  service: z.string().optional(),
  units: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  company: z.string().max(0, "Bot detected").optional(),
  timestamp: z.number().int().optional(),
});
