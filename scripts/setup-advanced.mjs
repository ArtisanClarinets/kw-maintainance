#!/usr/bin/env node
/*
  Fortune-500-grade setup script
  - Supports environments: development, staging, production
  - Non-interactive and interactive modes
  - Dry-run, backups, rotation helper, admin user creation with secure hashing
  - Enforces secure file permissions and performs validation
*/

import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { spawnSync } from 'child_process';

const ROOT = process.cwd();
const ENV_EXAMPLE = path.join(ROOT, '.env.example');
const ENV_LOCAL = path.join(ROOT, '.env.local');
const DATA_DIR = path.join(ROOT, 'data');
const SERVER_CONFIG = path.join(DATA_DIR, 'server-config.json');
const DEMO_DB = path.join(DATA_DIR, 'demo-db.json');
const BACKUPS_DIR = path.join(DATA_DIR, 'backups');
const LOG_FILE = path.join(DATA_DIR, 'setup.log');

const DEFAULT_PBKDF2_ITERS = 200000;

function now() {
  return new Date().toISOString();
}

async function log(message, level = 'INFO') {
  const line = `[${now()}] [${level}] ${message}\n`;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(LOG_FILE, line, { encoding: 'utf8', mode: 0o600 });
  } catch {
    // best-effort
  }
  if (level === 'ERROR') console.error(message);
  else console.log(message);
}

function parseArgs(argv = process.argv.slice(2)) {
  const opts = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--env' && argv[i + 1]) { opts.env = argv[++i]; continue; }
    if (a === '--non-interactive' || a === '--ci') { opts.nonInteractive = true; continue; }
    if (a === '--dry-run') { opts.dryRun = true; continue; }
    if (a === '--yes' || a === '-y') { opts.yes = true; continue; }
    if (a === '--force') { opts.force = true; continue; }
    if (a === '--admin-email' && argv[i + 1]) { opts.adminEmail = argv[++i]; continue; }
    if (a === '--admin-password' && argv[i + 1]) { opts.adminPassword = argv[++i]; continue; }
    if (a === '--backup') { opts.backup = true; continue; }
    if (a === '--rotate-keys') { opts.rotateKeys = true; continue; }
    if (a === '--old-key' && argv[i + 1]) { opts.oldKey = argv[++i]; continue; }
    if (a === '--new-key' && argv[i + 1]) { opts.newKey = argv[++i]; continue; }
    if (a === '--help' || a === '-h') { opts.help = true; continue; }
    if (a.startsWith('--')) {
      const eq = a.indexOf('=');
      if (eq !== -1) {
        opts[a.slice(2, eq)] = a.slice(eq + 1);
        continue;
      }
      // unknown flag: store raw
      opts._.push(a);
      continue;
    }
    opts._.push(a);
  }
  opts.env = (opts.env || process.env.NODE_ENV || 'development').toLowerCase();
  return opts;
}

function parseEnv(content) {
  const out = {};
  for (const raw of content.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx === -1) continue;
    const k = line.slice(0, idx).trim();
    const v = line.slice(idx + 1);
    out[k] = v;
  }
  return out;
}

async function fileExists(p) {
  try { await fs.access(p); return true; } catch { return false; }
}

function genBase64Key() { return crypto.randomBytes(32).toString('base64'); }

function validateMasterKey(keyBase64) {
  try {
    const buf = Buffer.from(keyBase64, 'base64');
    return buf.length === 32;
  } catch { return false; }
}

function encryptWithKey(masterKeyBase64, text) {
  const key = Buffer.from(masterKeyBase64, 'base64');
  if (key.length !== 32) throw new Error('Invalid master key length');
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([cipher.update(Buffer.from(text, 'utf8')), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString('hex')}:${tag.toString('hex')}:${enc.toString('hex')}`;
}

function isEncrypted(text) {
  return /^[0-9a-f]{32}:[0-9a-f]{32}:[0-9a-f]+$/i.test(text);
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const iters = DEFAULT_PBKDF2_ITERS;
  const derived = crypto.pbkdf2Sync(password, salt, iters, 64, 'sha512');
  return `pbkdf2$${iters}$${salt}$${derived.toString('hex')}`;
}

async function backupFiles(files = []) {
  if (!files.length) return null;
  const ts = Date.now();
  const dir = path.join(BACKUPS_DIR, String(ts));
  await fs.mkdir(dir, { recursive: true });
  for (const f of files) {
    try {
      if (await fileExists(f)) {
        const base = path.basename(f);
        await fs.copyFile(f, path.join(dir, base));
      }
    } catch (e) {
      await log(`Backup failed for ${f}: ${e.message}`, 'ERROR');
    }
  }
  await log(`Backups written to ${dir}`);
  return dir;
}

async function ensureEnv(opts) {
  if (!(await fileExists(ENV_LOCAL))) {
    if (await fileExists(ENV_EXAMPLE)) {
      await fs.copyFile(ENV_EXAMPLE, ENV_LOCAL);
      await log('Created .env.local from .env.example');
    } else {
      await fs.writeFile(ENV_LOCAL, '', 'utf8');
      await log('Created empty .env.local');
    }
    // enforce permission
    try { await fs.chmod(ENV_LOCAL, 0o600); } catch {}
  }

  const raw = await fs.readFile(ENV_LOCAL, 'utf8');
  const env = parseEnv(raw);

  if (!env.SERVER_CONFIG_MASTER_KEY) {
    if (opts.env === 'production' && !opts.force && !opts.yes) {
      throw new Error('SERVER_CONFIG_MASTER_KEY is required in production. Re-run with --force to auto-generate (not recommended) or set it in your environment.');
    }
    const key = genBase64Key();
    if (!opts.dryRun) await fs.appendFile(ENV_LOCAL, `\nSERVER_CONFIG_MASTER_KEY=${key}\n`, 'utf8');
    await log('Generated SERVER_CONFIG_MASTER_KEY');
  } else {
    if (!validateMasterKey(env.SERVER_CONFIG_MASTER_KEY)) {
      throw new Error('Invalid SERVER_CONFIG_MASTER_KEY format in .env.local');
    }
  }

  // AUTH_JWT_SECRET
  if (!env.AUTH_JWT_SECRET) {
    const jwt = genBase64Key();
    if (!opts.dryRun) await fs.appendFile(ENV_LOCAL, `AUTH_JWT_SECRET=${jwt}\n`, 'utf8');
    await log('Generated AUTH_JWT_SECRET');
  }

  if (!env.ADMIN_BEARER_TOKEN) {
    const token = crypto.randomBytes(24).toString('hex');
    if (!opts.dryRun) await fs.appendFile(ENV_LOCAL, `ADMIN_BEARER_TOKEN=${token}\n`, 'utf8');
    await log('Generated ADMIN_BEARER_TOKEN');
  }
}

async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.chmod(DATA_DIR, 0o700);
  } catch {
    // ignore
  }
}

async function ensureServerConfig(opts) {
  const defaultConfig = {
    leadProcessing: { enabled: true, rateLimit: { windowMs: 60000, maxRequests: 5 }, spamControl: { honeypotField: 'company', minSubmitTimeMs: 2000 } },
    notification: { method: 'log-only', email: { to: ['admin@example.com'], from: 'noreply@example.com' } },
    admin: { enabled: true, authMode: 'token' }
  };

  if (!(await fileExists(SERVER_CONFIG))) {
    if (!opts.dryRun) {
      const tmp = `${SERVER_CONFIG}.tmp.${Date.now()}`;
      await fs.writeFile(tmp, JSON.stringify(defaultConfig, null, 2), { mode: 0o600 });
      await fs.rename(tmp, SERVER_CONFIG);
      await fs.chmod(SERVER_CONFIG, 0o600);
    }
    await log('Created data/server-config.json with admin enabled');
    return;
  }

  // If exists, ensure admin enabled
  try {
    const raw = await fs.readFile(SERVER_CONFIG, 'utf8');
    const cfg = JSON.parse(raw);
    if (!cfg.admin || !cfg.admin.enabled) {
      cfg.admin = cfg.admin || {};
      cfg.admin.enabled = true;
      cfg.admin.authMode = cfg.admin.authMode || 'token';
      if (!opts.dryRun) {
        const tmp = `${SERVER_CONFIG}.tmp.${Date.now()}`;
        await fs.writeFile(tmp, JSON.stringify(cfg, null, 2), { mode: 0o600 });
        await fs.rename(tmp, SERVER_CONFIG);
        await fs.chmod(SERVER_CONFIG, 0o600);
      }
      await log('Updated data/server-config.json to enable admin portal');
    } else {
      await log('Existing server-config.json found and admin already enabled');
    }
  } catch (e) {
    await log(`Failed to parse server-config.json, rewriting defaults: ${e.message}`, 'ERROR');
    if (!opts.dryRun) {
      const tmp = `${SERVER_CONFIG}.tmp.${Date.now()}`;
      await fs.writeFile(tmp, JSON.stringify(defaultConfig, null, 2), { mode: 0o600 });
      await fs.rename(tmp, SERVER_CONFIG);
    }
  }
}

function decryptWithKey(masterKeyBase64, text) {
  const key = Buffer.from(masterKeyBase64, 'base64');
  if (key.length !== 32) throw new Error('Invalid master key length');
  const parts = text.split(':');
  if (parts.length !== 3) throw new Error('Invalid encrypted text format');
  const iv = Buffer.from(parts[0], 'hex');
  const tag = Buffer.from(parts[1], 'hex');
  const encryptedText = parts[2];
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

async function rotateServerConfigKeys(oldKey, newKey, opts) {
  if (!validateMasterKey(oldKey) || !validateMasterKey(newKey)) {
    throw new Error('Old or new master key is invalid');
  }

  if (!(await fileExists(SERVER_CONFIG))) {
    throw new Error('server-config.json not found, cannot rotate keys');
  }

  // Backup current config
  await backupFiles([SERVER_CONFIG]);

  const raw = await fs.readFile(SERVER_CONFIG, 'utf8');
  let cfg;
  try { cfg = JSON.parse(raw); } catch (err) { throw new Error('Invalid JSON in server-config.json: ' + (err && err.message ? err.message : String(err))); }

  let changed = false;

  function walk(obj) {
    if (Array.isArray(obj)) {
      return obj.map(walk);
    } else if (obj && typeof obj === 'object') {
      const out = {};
      for (const [k, v] of Object.entries(obj)) {
        out[k] = walk(v);
      }
      return out;
    } else if (typeof obj === 'string') {
      if (isEncrypted(obj)) {
        // Decrypt with old, re-encrypt with new
        try {
          const plain = decryptWithKey(oldKey, obj);
          const reenc = encryptWithKey(newKey, plain);
          changed = true;
          return reenc;
        } catch (e) {
          throw new Error(`Failed to decrypt field during rotation: ${e.message}`);
        }
      }
      return obj;
    }
    return obj;
  }

  const newCfg = walk(cfg);

  if (!changed) {
    await log('No encrypted fields found to rotate.');
    return true;
  }

  if (!opts.dryRun) {
    const tmp = `${SERVER_CONFIG}.tmp.${Date.now()}`;
    await fs.writeFile(tmp, JSON.stringify(newCfg, null, 2), { mode: 0o600 });
    await fs.rename(tmp, SERVER_CONFIG);
    await fs.chmod(SERVER_CONFIG, 0o600);
  }

  await log('Rotation complete: server-config.json re-encrypted with new master key');

  // Optionally update .env.local if it contains the old key
  try {
    if (await fileExists(ENV_LOCAL)) {
      const envRaw = await fs.readFile(ENV_LOCAL, 'utf8');
      const env = parseEnv(envRaw);
      if (env.SERVER_CONFIG_MASTER_KEY && env.SERVER_CONFIG_MASTER_KEY === oldKey) {
        if (opts.env === 'production' && !opts.force && !opts.yes) {
          await log('Detected SERVER_CONFIG_MASTER_KEY in .env.local but not updating in production without --force', 'WARN');
        } else {
          const backupEnv = `${ENV_LOCAL}.bak.${Date.now()}`;
          await fs.copyFile(ENV_LOCAL, backupEnv);
          const newContent = envRaw.replace(/(^SERVER_CONFIG_MASTER_KEY=).*$/m, `$1${newKey}`);
          if (!opts.dryRun) await fs.writeFile(ENV_LOCAL, newContent, 'utf8');
          await log(`Updated ${ENV_LOCAL} with new SERVER_CONFIG_MASTER_KEY (backup saved to ${backupEnv})`);
        }
      } else {
        await log('.env.local does not contain the old master key or not present; skipping env update');
      }
    }
  } catch (e) {
    await log(`Failed to update .env.local: ${e.message}`, 'ERROR');
  }

  return true;
}

async function ensureDemoDb(opts) {
  const defaultDb = {
    users: [
      { id: 'u1', name: 'Tech User', email: 'tech@example.com', role: 'tech', tenantId: 't1', propertyIds: ['p1'], passwordHash: hashPassword('password') },
      { id: 'u2', name: 'Admin User', email: 'admin@example.com', role: 'security_admin', tenantId: 't1', propertyIds: ['p1'], passwordHash: hashPassword('password') },
      { id: 'u3', name: 'Supervisor', email: 'super@example.com', role: 'supervisor', tenantId: 't1', propertyIds: ['p1'], passwordHash: hashPassword('password') }
    ],
    tenants: [ { id: 't1', name: 'Acme Hospitality', slug: 'acme' } ],
    properties: [ { id: 'p1', tenantId: 't1', name: 'Grand Hotel', address: '123 Main St', timezone: 'America/New_York' } ],
    assets: [], workOrders: [], parts: [], warehouses: [], stockLevels: [],
    vendors: [
      { id: 'v1', tenantId: 't1', name: 'Acme HVAC Services', type: 'Service', status: 'Active', complianceScore: 98, lastAuditDate: '2023-12-01' },
      { id: 'v2', tenantId: 't1', name: 'Global Supply Co', type: 'Supply', status: 'Active', complianceScore: 100, lastAuditDate: '2023-11-15' },
      { id: 'v3', tenantId: 't1', name: 'Legacy Software', type: 'Software', status: 'Probation', complianceScore: 75, lastAuditDate: '2023-10-20' }
    ],
    auditLogs: [], appointments: [], schedulingRules: [ { id: 'sr1', tenantId: 't1', minimumLeadTimeMinutes: 180, minimumGapMinutes: 120, defaultDurationMinutes: 60 } ]
  };

  if (!(await fileExists(DEMO_DB))) {
    if (!opts.dryRun) {
      const tmp = `${DEMO_DB}.tmp.${Date.now()}`;
      await fs.writeFile(tmp, JSON.stringify(defaultDb, null, 2), { mode: 0o600 });
      await fs.rename(tmp, DEMO_DB);
      await fs.chmod(DEMO_DB, 0o600);
    }
    await log('Created data/demo-db.json with default demo users');
    return;
  }

  // If admin creation requested, add or update admin
  if (opts.adminEmail) {
    try {
      const raw = await fs.readFile(DEMO_DB, 'utf8');
      const db = JSON.parse(raw);
      db.users = db.users || [];
      const existing = db.users.find(u => u.email === opts.adminEmail);
      if (existing) {
        if (opts.adminPassword) {
          existing.passwordHash = hashPassword(opts.adminPassword);
          await log(`Updated password for existing admin user ${opts.adminEmail}`);
        } else {
          await log(`Admin user ${opts.adminEmail} already exists`);
        }
      } else {
        const id = `u_${Date.now()}`;
        const newUser = { id, name: 'Auto Admin', email: opts.adminEmail, role: 'security_admin', tenantId: 't1', propertyIds: ['p1'], passwordHash: opts.adminPassword ? hashPassword(opts.adminPassword) : hashPassword(crypto.randomBytes(16).toString('hex')) };
        db.users.push(newUser);
        await log(`Created admin user ${opts.adminEmail}`);
      }
      if (!opts.dryRun) {
        const tmp = `${DEMO_DB}.tmp.${Date.now()}`;
        await fs.writeFile(tmp, JSON.stringify(db, null, 2), { mode: 0o600 });
        await fs.rename(tmp, DEMO_DB);
      }
    } catch (e) {
      await log(`Failed to update demo DB: ${e.message}`, 'ERROR');
    }
  } else {
    await log('Demo DB exists; no admin changes requested');
  }
}

async function runValidationWithEnv(envVars) {
  // Run `node scripts/server-config.mjs validate` with provided env vars merged
  try {
    const res = spawnSync('node', ['scripts/server-config.mjs', 'validate'], { env: { ...process.env, ...envVars }, stdio: 'inherit' });
    return res.status === 0;
  } catch (e) {
    await log(`Validation failed: ${e.message}`, 'ERROR');
    return false;
  }
}

async function checkSystemDeps() {
  const checks = [ 'openssl', 'git' ];
  for (const cmd of checks) {
    const res = spawnSync('which', [cmd]);
    if (res.status !== 0) {
      await log(`Warning: system command '${cmd}' not found in PATH. Some features may be limited.`, 'WARN');
    }
  }
}

async function ensurePermissions() {
  try { await fs.mkdir(DATA_DIR, { recursive: true, mode: 0o700 }); } catch {}
}

async function printHelp() {
  console.log(`Usage: node scripts/setup.mjs [options]

Options:
  --env <development|staging|production>  Environment to provision (default: development)
  --non-interactive                      Run without prompts (CI friendly)
  --dry-run                              Perform checks without writing changes
  --yes, -y                              Assume yes for prompts
  --force                                Force destructive actions in production
  --admin-email <email>                  Create or update admin user with this email
  --admin-password <password>            Password for the admin user (use carefully)
  --backup                               Create backups of existing config/db
  --rotate-keys --old-key <old> --new-key <new>  Rotate server-config master key (requires access to old key)
  --help, -h                             Show this help
`);
}

async function main() {
  const opts = parseArgs();
  if (opts.help) { await printHelp(); return; }
  await ensurePermissions();
  await log(`Starting setup (env=${opts.env}, dryRun=${!!opts.dryRun})`);
  if (opts.backup) {
    await backupFiles([SERVER_CONFIG, DEMO_DB]);
  }
  try {
    await ensureEnv(opts);
    const envRaw = await fs.readFile(ENV_LOCAL, 'utf8');
    const envVars = parseEnv(envRaw);
    await ensureDataDir();
    await ensureServerConfig(opts);

    // Key rotation flow (optional)
    if (opts.rotateKeys) {
      const oldKey = opts.oldKey || process.env.OLD_SERVER_CONFIG_MASTER_KEY;
      const newKey = opts.newKey || process.env.NEW_SERVER_CONFIG_MASTER_KEY;
      if (!oldKey || !newKey) {
        throw new Error('rotate-keys requested but --old-key and --new-key (or env OLD_SERVER_CONFIG_MASTER_KEY/NEW_SERVER_CONFIG_MASTER_KEY) were not provided');
      }
      await log('Starting master key rotation...');
      await rotateServerConfigKeys(oldKey, newKey, opts);
    }

    await ensureDemoDb(opts);
    await checkSystemDeps();

    const validated = await runValidationWithEnv(envVars);
    if (!validated) {
      await log('Validation failed; please inspect the above output', 'ERROR');
      if (opts.env === 'production' && !opts.force) throw new Error('Validation failed in production');
    } else {
      await log('Server configuration validated successfully');
    }

    await log('Setup complete. Demo admin: admin@example.com (email-only demo).');
  } catch (e) {
    await log(`Setup error: ${e.message}`, 'ERROR');
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith('setup.mjs')) {
  main();
}
