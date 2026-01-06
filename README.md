# KW Enterprise

A Next-Generation Enterprise Hospitality Maintenance Platform.

## Server Configuration Utility

This project includes a secured server configuration utility for managing operational settings and secrets.

### Setup

1. **Environment Variables**:
   Copy `.env.example` to `.env.local` and set the `SERVER_CONFIG_MASTER_KEY`.

   ```bash
   cp .env.example .env.local
   # Generate a key:
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

2. **Initialize Configuration**:
   Run the interactive init script to create `data/server-config.json`. This file contains operational settings and encrypted secrets (like SMTP passwords).

   ```bash
   npm run server:config init
   ```
   Follow the prompts.

3. **Validate Configuration**:
   To check if your environment and config file are valid:

   ```bash
   npm run server:validate
   ```

### Deployment

**Generate Nginx Config**:
```bash
npm run server:config generate nginx --domain example.com --port 3000
```
This outputs a hardened Nginx configuration.

**Generate Systemd Service**:
```bash
npm run server:config generate systemd --service-name kw-maintainance --port 3000
```

### Security Features

- **Encrypted Secrets**: SMTP passwords are encrypted at rest using AES-256-GCM.
- **Rate Limiting**: The lead endpoint is protected by IP-based rate limiting.
- **Spam Protection**: Includes honeypot fields and minimum submission time checks.
- **Secure Headers**: Hardened HTTP headers (HSTS, CSP, etc.) are applied automatically.
- **No PII Logging**: Personal information is masked in logs.

## Development

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
