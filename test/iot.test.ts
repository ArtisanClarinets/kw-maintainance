import { describe, it, expect, beforeEach } from 'vitest';
import { resetDb, getDb } from '@/lib/demo/persistence';
import { processDeviceEvent } from '@/lib/iot/executor';

beforeEach(async () => {
  await resetDb();
});

describe('IoT executor', () => {
  it('should create a work order when event crosses threshold', async () => {
    const res = await processDeviceEvent({ tenantId: 't1', deviceId: 's-1', metric: 'temperature', value: 50, timestamp: new Date().toISOString() });
    expect(res.length).toBeGreaterThan(0);
    const db = await getDb();
    expect(db.workOrders.length).toBeGreaterThan(0);
    expect(db.auditLogs.some(a => a.action === 'IOT_TRIGGER')).toBe(true);
  });

  it('should not trigger when threshold not reached', async () => {
    const res = await processDeviceEvent({ tenantId: 't1', deviceId: 's-1', metric: 'temperature', value: 30, timestamp: new Date().toISOString() });
    expect(res.length).toBe(0);
    const db = await getDb();
    expect(db.workOrders.length).toBe(0);
  });
});
