import { describe, it, expect, beforeEach, vi } from 'vitest';
import { resetDb, getDb } from '@/lib/demo/persistence';
import * as techActions from '@/app/admin/technicians/actions';
import * as templateActions from '@/app/admin/work-order-templates/actions';


// Stub next/cache revalidation used by server actions
vi.mock('next/cache', () => ({ revalidatePath: () => {} }));

const mockGetUser = vi.fn();
vi.mock('@/lib/auth', () => ({ getUser: () => mockGetUser() }));

beforeEach(async () => {
  mockGetUser.mockReset();
  await resetDb();
});

describe('RBAC / Tenant-scoped checks', () => {
  it('createTechnician should 401 if unauthenticated', async () => {
    mockGetUser.mockResolvedValue(null);
    await expect(
      techActions.createTechnician({ tenantId: 't1', name: 'Test Tech', skills: [], certifications: [], hourlyRate: 10, active: true })
    ).rejects.toMatchObject({ status: 401 });
  });

  it('createTechnician should 403 for low-role users', async () => {
    mockGetUser.mockResolvedValue({ id: 'u1', name: 'Tech User', email: 'tech@example.com', role: 'tech', tenantId: 't1', propertyIds: ['p1'] });
    await expect(
      techActions.createTechnician({ tenantId: 't1', name: 'Test Tech', skills: [], certifications: [], hourlyRate: 10, active: true })
    ).rejects.toMatchObject({ status: 403 });
  });

  it('createTechnician should succeed for tenant_admin', async () => {
    mockGetUser.mockResolvedValue({ id: 'u2', name: 'Tenant Admin', email: 'admin@example.com', role: 'tenant_admin', tenantId: 't1', propertyIds: ['p1'] });
    const res = await techActions.createTechnician({ tenantId: 't1', name: 'New Tech', skills: [], certifications: [], hourlyRate: 22, active: true });
    expect(res.success).toBe(true);
    const db = await getDb();
    expect(db.technicians.some(t => t.name === 'New Tech')).toBe(true);
  });

  it('createWorkOrderTemplate should 401 if unauthenticated', async () => {
    mockGetUser.mockResolvedValue(null);
    await expect(
      templateActions.createWorkOrderTemplate({ tenantId: 't1', title: 'Test Template', category: 'General', defaultSLA: '24h', tasks: [] })
    ).rejects.toMatchObject({ status: 401 });
  });

  it('createWorkOrderTemplate should 403 for low-role users', async () => {
    mockGetUser.mockResolvedValue({ id: 'u1', name: 'Tech User', email: 'tech@example.com', role: 'tech', tenantId: 't1', propertyIds: ['p1'] });
    await expect(
      templateActions.createWorkOrderTemplate({ tenantId: 't1', title: 'Test Template', category: 'General', defaultSLA: '24h', tasks: [] })
    ).rejects.toMatchObject({ status: 403 });
  });

  it('createWorkOrderTemplate should succeed for gm', async () => {
    mockGetUser.mockResolvedValue({ id: 'u3', name: 'GM User', email: 'gm@example.com', role: 'gm', tenantId: 't1', propertyIds: ['p1'] });
    const res = await templateActions.createWorkOrderTemplate({ tenantId: 't1', title: 'New Template', category: 'General', defaultSLA: '48h', tasks: [] });
    expect(res.success).toBe(true);
    const db = await getDb();
    expect(db.workOrderTemplates.some(t => t.title === 'New Template')).toBe(true);
  });

  it('createVendor should enforce RBAC and tenant scoping', async () => {
    mockGetUser.mockResolvedValue(null);
    await expect(
      (await import('@/app/admin/vendors/actions')).createVendor({ tenantId: 't1', name: 'Vendor X', type: 'Service', status: 'Active', complianceScore: 90 })
    ).rejects.toMatchObject({ status: 401 });

    mockGetUser.mockResolvedValue({ id: 'u1', name: 'Tech User', email: 'tech@example.com', role: 'tech', tenantId: 't1', propertyIds: ['p1'] });
    await expect(
      (await import('@/app/admin/vendors/actions')).createVendor({ tenantId: 't1', name: 'Vendor X', type: 'Service', status: 'Active', complianceScore: 90 })
    ).rejects.toMatchObject({ status: 403 });

    mockGetUser.mockResolvedValue({ id: 'u4', name: 'Procurement', email: 'proc@example.com', role: 'procurement', tenantId: 't1', propertyIds: ['p1'] });
    const vendorRes = await (await import('@/app/admin/vendors/actions')).createVendor({ tenantId: 't1', name: 'Vendor X', type: 'Service', status: 'Active', complianceScore: 90 });
    expect(vendorRes.success).toBe(true);
  });

  it('createPart and createPurchaseOrder RBAC checks', async () => {
    // createPart
    mockGetUser.mockResolvedValue(null);
    await expect(
      (await import('@/app/admin/parts/actions')).createPart({ tenantId: 't1', name: 'Filter', sku: 'F-001', category: 'Filters', cost: 12.5, minStockLevel: 2 })
    ).rejects.toMatchObject({ status: 401 });

    mockGetUser.mockResolvedValue({ id: 'u1', name: 'Tech User', email: 'tech@example.com', role: 'tech', tenantId: 't1', propertyIds: ['p1'] });
    await expect(
      (await import('@/app/admin/parts/actions')).createPart({ tenantId: 't1', name: 'Filter', sku: 'F-001', category: 'Filters', cost: 12.5, minStockLevel: 2 })
    ).rejects.toMatchObject({ status: 403 });

    mockGetUser.mockResolvedValue({ id: 'u5', name: 'Procurement', email: 'procure@example.com', role: 'procurement', tenantId: 't1', propertyIds: ['p1'] });
    const partRes = await (await import('@/app/admin/parts/actions')).createPart({ tenantId: 't1', name: 'Filter', sku: 'F-001', category: 'Filters', cost: 12.5, minStockLevel: 2 });
    expect(partRes.success).toBe(true);

    // createPurchaseOrder
    mockGetUser.mockResolvedValue(null);
    await expect(
      (await import('@/app/admin/purchase-orders/actions')).createPurchaseOrder({ tenantId: 't1', vendorId: 'v1', propertyId: 'p1', status: 'Draft', lines: [] })
    ).rejects.toMatchObject({ status: 401 });

    mockGetUser.mockResolvedValue({ id: 'u1', name: 'Tech User', email: 'tech@example.com', role: 'tech', tenantId: 't1', propertyIds: ['p1'] });
    await expect(
      (await import('@/app/admin/purchase-orders/actions')).createPurchaseOrder({ tenantId: 't1', vendorId: 'v1', propertyId: 'p1', status: 'Draft', lines: [] })
    ).rejects.toMatchObject({ status: 403 });

    mockGetUser.mockResolvedValue({ id: 'u6', name: 'Procurement User', email: 'po@example.com', role: 'procurement', tenantId: 't1', propertyIds: ['p1'] });
    const poRes = await (await import('@/app/admin/purchase-orders/actions')).createPurchaseOrder({ tenantId: 't1', vendorId: 'v1', propertyId: 'p1', status: 'Draft', lines: [] });
    expect(poRes.success).toBe(true);
  });
});
