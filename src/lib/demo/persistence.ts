import fs from 'fs/promises';
import path from 'path';
import { Database, DatabaseSchema } from '@/lib/domain/schema';

const DB_PATH = path.join(process.cwd(), 'data', 'demo-db.json');

const DEFAULT_DB: Database = {
  users: [
    { id: 'u1', name: 'Tech User', email: 'tech@example.com', role: 'tech', tenantId: 't1', propertyIds: ['p1'], passwordHash: 'password' },
    { id: 'u2', name: 'Admin User', email: 'admin@example.com', role: 'security_admin', tenantId: 't1', propertyIds: ['p1'], passwordHash: 'password' },
    { id: 'u3', name: 'Supervisor', email: 'super@example.com', role: 'supervisor', tenantId: 't1', propertyIds: ['p1'], passwordHash: 'password' }
  ],
  tenants: [
    { id: 't1', name: 'Acme Hospitality', slug: 'acme' }
  ],
  properties: [
    { id: 'p1', tenantId: 't1', name: 'Grand Hotel', address: '123 Main St', timezone: 'America/New_York' }
  ],
  assets: [],
  workOrders: [],
  parts: [],
  warehouses: [],
  stockLevels: [],
  vendors: [
      { id: 'v1', tenantId: 't1', name: 'Acme HVAC Services', type: 'Service', status: 'Active', complianceScore: 98, lastAuditDate: '2023-12-01' },
      { id: 'v2', tenantId: 't1', name: 'Global Supply Co', type: 'Supply', status: 'Active', complianceScore: 100, lastAuditDate: '2023-11-15' },
      { id: 'v3', tenantId: 't1', name: 'Legacy Software', type: 'Software', status: 'Probation', complianceScore: 75, lastAuditDate: '2023-10-20' }
  ],
  auditLogs: [],
  appointments: [],
  schedulingRules: [
      { id: 'sr1', tenantId: 't1', minimumLeadTimeMinutes: 180, minimumGapMinutes: 120, defaultDurationMinutes: 60 }
  ]
};

export async function getDb(): Promise<Database> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const json = JSON.parse(data);
    const result = DatabaseSchema.safeParse(json);
    if (!result.success) {
        console.error("DB Validation Error", result.error);
        // Fallback to default if corrupted, or throw?
        // For demo, let's recover with default if it fails badly, or just return partial
        return json as Database; // Try to cast, but risky.
    }
    return result.data;
  } catch (error) {
    void error;
    // If file doesn't exist, return default
    return DEFAULT_DB;
  }
}

export async function saveDb(db: Database): Promise<void> {
  // Ensure data dir exists
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

export async function resetDb(): Promise<void> {
    await saveDb(DEFAULT_DB);
}
