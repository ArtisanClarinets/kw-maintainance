// scripts/server-config.mjs
// Server Configuration Utility for KW Enterprise
// This script handles environment setup and validation for the server.

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import crypto from 'crypto';

// We can't easily import the TS modules directly in Node without ts-node or a build step.
// For the CLI, we will duplicate the logic slightly or use basic validations,
// OR we can try to require the built files if they existed.
// Given the constraint "scripts/server-config.mjs (plain Node; do NOT require ts-node)",
// we will implement the logic directly here in JS.

const CONFIG_DIR = path.join(process.cwd(), 'data');
const CONFIG_FILE = path.join(CONFIG_DIR, 'server-config.json');

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;

function getMasterKey() {
  const keyBase64 = process.env.SERVER_CONFIG_MASTER_KEY;
  if (!keyBase64) {
    throw new Error('SERVER_CONFIG_MASTER_KEY is not defined in environment');
  }
  const key = Buffer.from(keyBase64, 'base64');
  if (key.length !== 32) {
    throw new Error(`Invalid master key length. Expected 32 bytes, got ${key.length}`);
  }
  return key;
}

function encrypt(text) {
  const masterKey = getMasterKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, masterKey, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const tag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`;
}

// Command processing
const args = process.argv.slice(2);
const command = args[0];

async function main() {
  if (!command) {
    console.log("Usage: node scripts/server-config.mjs [validate|init|generate]");
    process.exit(1);
  }

  try {
    switch (command) {
      case 'validate':
        await validate();
        break;
      case 'init':
        await init();
        break;
      case 'generate':
        await generate(args.slice(1));
        break;
      default:
        console.error(`Unknown command: ${command}`);
        process.exit(1);
    }
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

async function validate() {
  console.log("Validating server configuration...");

  // 1. Check Env Vars
  if (!process.env.SERVER_CONFIG_MASTER_KEY) {
    console.error("❌ SERVER_CONFIG_MASTER_KEY is missing.");
    process.exit(1);
  }
  try {
      getMasterKey(); // Validates length
  } catch (e) {
      console.error(`❌ ${e.message}`);
      process.exit(1);
  }

  // 1b. Check AUTH_JWT_SECRET (recommended/required for production)
  if (!process.env.AUTH_JWT_SECRET) {
    if (process.env.NODE_ENV === 'production') {
      console.error('❌ AUTH_JWT_SECRET is required in production.');
      process.exit(1);
    } else {
      console.warn('⚠️ AUTH_JWT_SECRET is not set. Using an insecure demo fallback in development.');
    }
  }

  // 2. Check Config File
  if (!fs.existsSync(CONFIG_FILE)) {
    console.error("❌ Config file not found at data/server-config.json");
    process.exit(1);
  }

  const content = fs.readFileSync(CONFIG_FILE, 'utf-8');
  let config;
  try {
    config = JSON.parse(content);
  } catch (e) {
    console.error("❌ Invalid JSON in config file.", e);
    process.exit(1);
  }

  // Basic schema validation (manual implementation since we don't have Zod here)
  const errors = [];
  if (!config.notification?.email?.to || !Array.isArray(config.notification.email.to)) {
      errors.push("notification.email.to must be an array of strings");
  }

  if (errors.length > 0) {
      console.error("❌ Validation errors:");
      errors.forEach(e => console.error("  - " + e));
      process.exit(1);
  }

  console.log("✅ Configuration valid.");
}

async function init() {
  console.log("Initializing server configuration...");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (query) => new Promise((resolve) => rl.question(query, resolve));

  const emailTo = await question("Destination Email (comma separated): ");
  const emails = emailTo.split(',').map(e => e.trim()).filter(e => e);

  const smtpHost = await question("SMTP Host (leave empty for log-only): ");

  let smtpConfig = undefined;
  let method = 'log-only';

  if (smtpHost) {
      method = 'smtp';
      const smtpPort = await question("SMTP Port (e.g., 587): ");
      const smtpUser = await question("SMTP User: ");
      const smtpPass = await question("SMTP Password: ");

      if (!process.env.SERVER_CONFIG_MASTER_KEY) {
          console.warn("⚠️ SERVER_CONFIG_MASTER_KEY not set. Cannot encrypt password. Please set it and run init again, or manually encrypt.");
          // We can generate a random key for them
          const newKey = crypto.randomBytes(32).toString('base64');
          console.log(`\nGenerated Master Key: ${newKey}`);
          console.log("👉 Add this to your .env.local as SERVER_CONFIG_MASTER_KEY\n");
          process.env.SERVER_CONFIG_MASTER_KEY = newKey;
      }

      smtpConfig = {
          host: smtpHost,
          port: parseInt(smtpPort, 10),
          secure: true, // simplified
          user: smtpUser,
          pass: encrypt(smtpPass)
      };
  }

  const config = {
    leadProcessing: {
        enabled: true,
        rateLimit: {
            windowMs: 60000,
            maxRequests: 5
        },
        spamControl: {
            honeypotField: 'company',
            minSubmitTimeMs: 2000
        }
    },
    notification: {
        method: method,
        email: {
            to: emails,
            from: smtpConfig ? smtpConfig.user : 'noreply@example.com'
        }
    },
    admin: {
        enabled: false,
        authMode: 'token'
    },
    smtp: smtpConfig
  };

  if (!fs.existsSync(CONFIG_DIR)) {
      fs.mkdirSync(CONFIG_DIR, { recursive: true, mode: 0o700 });
  }

  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), { mode: 0o600 });
  console.log(`✅ Configuration written to ${CONFIG_FILE}`);

  rl.close();
}

async function generate(args) {
    const subCmd = args[0];
    const opts = parseArgs(args.slice(1));
    const dryRun = opts['dry-run'];

    if (subCmd === 'nginx') {
        const domain = opts['domain'] || 'example.com';
        const port = opts['port'] || '3000';

        // Security check for inputs
        if (!/^[a-zA-Z0-9.-]+$/.test(domain)) {
            console.error("❌ Invalid domain format.");
            process.exit(1);
        }
        if (!/^[0-9]+$/.test(port)) {
            console.error("❌ Invalid port format.");
            process.exit(1);
        }

        const tmpl = `
server {
    listen 80;
    server_name ${domain};
    return 301 https://${domain}$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ${domain};

    # SSL Config (managed by Certbot usually)
    # ssl_certificate /etc/letsencrypt/live/${domain}/fullchain.pem;
    # ssl_certificate_key /etc/letsencrypt/live/${domain}/privkey.pem;

    # Hardening
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    location / {
        proxy_pass http://localhost:${port};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host ${domain};
        proxy_cache_bypass $http_upgrade;

        # IP forwarding
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
`;
        if (dryRun) {
            console.log(tmpl);
        } else {
             console.log(tmpl);

             const deployDir = path.join(process.cwd(), 'deploy', 'nginx');
             if (!fs.existsSync(deployDir)) {
                fs.mkdirSync(deployDir, { recursive: true });
             }
             fs.writeFileSync(path.join(deployDir, 'site.conf'), tmpl);
             console.log(`\n✅ Written to deploy/nginx/site.conf`);
        }
    } else if (subCmd === 'systemd') {
        const serviceName = opts['service-name'] || 'kw-maintainance';
        const port = opts['port'] || '3000';
        const user = process.env.USER || 'www-data';

        if (!/^[a-zA-Z0-9_-]+$/.test(serviceName)) {
            console.error("❌ Invalid service name.");
            process.exit(1);
        }
        if (!/^[0-9]+$/.test(port)) {
            console.error("❌ Invalid port.");
            process.exit(1);
        }

        const tmpl = `
[Unit]
Description=Next.js App (${serviceName})
After=network.target

[Service]
Type=simple
User=${user}
WorkingDirectory=${process.cwd()}
ExecStart=/usr/bin/npm start -- -p ${port}
Restart=always
RestartSec=3

# Hardening
CapabilityBoundingSet=
ProtectSystem=full
ProtectHome=true
PrivateTmp=true
NoNewPrivileges=true

[Install]
WantedBy=multi-user.target
`;
        if (dryRun) {
            console.log(tmpl);
        } else {
            console.log(tmpl);
            // Write to file?
        }
    } else {
        console.error("Unknown generate target. Use 'nginx' or 'systemd'.");
    }
}

function parseArgs(args) {
    const opts = Object.create(null); // Prevent prototype pollution
    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith('--')) {
            const key = args[i].substring(2);

            // Validate key to prevent injection or pollution
            if (!/^[a-zA-Z0-9-]+$/.test(key)) continue;
            if (['__proto__', 'prototype', 'constructor'].includes(key)) continue;

            if (args[i+1] && !args[i+1].startsWith('--')) {
                opts[key] = args[i+1];
                i++;
            } else {
                opts[key] = true;
            }
        }
    }
    return opts;
}

main();