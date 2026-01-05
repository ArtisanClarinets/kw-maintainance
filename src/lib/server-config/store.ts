import 'server-only';
import fs from 'fs/promises';
import path from 'path';
import { type ServerConfig } from './schema';
import { encrypt, decrypt, isEncrypted } from './crypto';

const CONFIG_DIR = path.join(process.cwd(), 'data');
const CONFIG_FILE = path.join(CONFIG_DIR, 'server-config.json');

// Helper to recursively encrypt sensitive fields
// For now, we only encrypt smtp.pass
function encryptSecrets(config: Record<string, unknown>): Record<string, unknown> {
  const smtp = config.smtp as Record<string, unknown> | undefined;
  if (smtp && typeof smtp.pass === 'string' && !isEncrypted(smtp.pass)) {
    smtp.pass = encrypt(smtp.pass);
  }
  return config;
}

// Helper to recursively decrypt sensitive fields
function decryptSecrets(config: Record<string, unknown>): Record<string, unknown> {
  const smtp = config.smtp as Record<string, unknown> | undefined;
  if (smtp && typeof smtp.pass === 'string' && isEncrypted(smtp.pass)) {
     try {
        smtp.pass = decrypt(smtp.pass);
     } catch {
         console.error("Failed to decrypt SMTP password. Check MASTER_KEY.");
         // Fallback or throw? We'll leave it as is, validation will likely fail or connection will fail.
     }
  }
  return config;
}

export async function readConfigFile(): Promise<Partial<ServerConfig> | null> {
  try {
    const fileContent = await fs.readFile(CONFIG_FILE, 'utf-8');
    const rawConfig = JSON.parse(fileContent);
    // Decrypt secrets before returning
    return decryptSecrets(rawConfig) as unknown as Partial<ServerConfig>;
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

export async function writeConfigFile(config: Partial<ServerConfig>): Promise<void> {
  // Ensure directory exists
  try {
      await fs.mkdir(CONFIG_DIR, { recursive: true, mode: 0o700 }); // Restrictive permissions
  } catch {}

  // Encrypt secrets before saving
  // We clone the config to avoid mutating the in-memory object passed in if it's used elsewhere
  const configToSave = encryptSecrets(JSON.parse(JSON.stringify(config)));

  const content = JSON.stringify(configToSave, null, 2);
  const tempFile = `${CONFIG_FILE}.tmp.${Date.now()}`;

  await fs.writeFile(tempFile, content, { mode: 0o600 }); // Read/write only by owner
  await fs.rename(tempFile, CONFIG_FILE);
}
