import { z } from 'zod';

export const ServerConfigSchema = z.object({
  leadProcessing: z.object({
    enabled: z.boolean().default(true),
    rateLimit: z.object({
      windowMs: z.number().int().positive().default(60000), // 1 minute
      maxRequests: z.number().int().positive().default(5),
    }).default({
      windowMs: 60000,
      maxRequests: 5
    }),
    spamControl: z.object({
      honeypotField: z.string().default('company'),
      minSubmitTimeMs: z.number().int().positive().default(2000), // 2 seconds
    }).default({
      honeypotField: 'company',
      minSubmitTimeMs: 2000
    }),
  }).default({
     enabled: true,
     rateLimit: { windowMs: 60000, maxRequests: 5 },
     spamControl: { honeypotField: 'company', minSubmitTimeMs: 2000 }
  }),
  notification: z.object({
    method: z.enum(['smtp', 'log-only']).default('smtp'),
    email: z.object({
      to: z.array(z.string().email()).min(1, "At least one destination email is required"),
      from: z.string().email().optional(), // Defaults to user in SMTP config if not set
    }),
  }),
  admin: z.object({
    enabled: z.boolean().default(false),
    authMode: z.enum(['token', 'basic']).default('token'),
  }).default({
      enabled: false,
      authMode: 'token'
  }),
  smtp: z.object({
    host: z.string().min(1),
    port: z.number().int().positive(),
    secure: z.boolean().default(true),
    user: z.string().min(1),
    pass: z.string().min(1), // This will be encrypted in the file
  }).optional(),
});

export type ServerConfig = z.infer<typeof ServerConfigSchema>;

export const EnvConfigSchema = z.object({
  SERVER_CONFIG_MASTER_KEY: z.string().min(32, "Master key must be at least 32 characters (base64 encoded 32 bytes)"),
  ENABLE_ADMIN_UI: z.enum(['true', 'false']).transform((v) => v === 'true').optional(),
  ADMIN_BEARER_TOKEN: z.string().optional(),
  // Add other env vars if needed
});

export type EnvConfig = z.infer<typeof EnvConfigSchema>;
