import 'server-only';
import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16;

function getMasterKey(): Buffer {
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

export function encrypt(text: string): string {
  const masterKey = getMasterKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, masterKey, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const tag = cipher.getAuthTag();

  // Format: iv:authTag:encryptedData
  return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`;
}

export function decrypt(text: string): string {
  const masterKey = getMasterKey();
  const parts = text.split(':');
  if (parts.length !== 3) {
    throw new Error('Invalid encrypted text format');
  }

  const iv = Buffer.from(parts[0], 'hex');
  const tag = Buffer.from(parts[1], 'hex');
  const encryptedText = parts[2];

  const decipher = crypto.createDecipheriv(ALGORITHM, masterKey, iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

// Helper to determine if a string looks encrypted (basic check)
export function isEncrypted(text: string): boolean {
    return /^[0-9a-f]{32}:[0-9a-f]{32}:[0-9a-f]+$/i.test(text);
}
