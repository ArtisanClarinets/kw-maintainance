import { z } from 'zod';

// --- Auth & Users ---
export const RoleEnum = z.enum(['tech', 'supervisor', 'gm', 'vp_ops', 'procurement', 'security_admin']);
export type Role = z.infer<typeof RoleEnum>;

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: RoleEnum,
  tenantId: z.string(),
  propertyIds: z.array(z.string()), // Scoping
  passwordHash: z.string().optional(), // For demo auth
});
export type User = z.infer<typeof UserSchema>;

// --- Organization ---
export const TenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});
export type Tenant = z.infer<typeof TenantSchema>;

export const PropertySchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  name: z.string(),
  address: z.string(),
  timezone: z.string().default("UTC"),
});
export type Property = z.infer<typeof PropertySchema>;

// --- Assets ---
export const AssetTypeEnum = z.enum(['region', 'property', 'building', 'floor', 'zone', 'system', 'asset', 'component']);
export const AssetSchema = z.object({
  id: z.string(),
  parentId: z.string().nullable(),
  tenantId: z.string(),
  propertyId: z.string(),
  name: z.string(),
  type: AssetTypeEnum,
  status: z.enum(['active', 'down', 'maintenance', 'retired']),
  cost: z.number().default(0),
  replacementCost: z.number().default(0), // For TCO bad actor calc
  installationDate: z.string().optional(), // ISO date
  warrantyExpiration: z.string().optional(), // ISO date
  modelNumber: z.string().optional(),
  serialNumber: z.string().optional(),
  location: z.string().optional(),
});
export type Asset = z.infer<typeof AssetSchema>;

// --- Work Orders ---
export const WorkOrderStatusEnum = z.enum([
  'Draft', 'Dispatch Confirmed', 'In Progress', 'On Hold - Supply Chain', 'On Hold - Occupancy', 'QC Pending', 'Financial Close'
]);
export const WorkOrderPriorityEnum = z.enum(['Low', 'Medium', 'High', 'Critical']);
export const WorkOrderCategoryEnum = z.enum(['Plumbing', 'Electrical', 'HVAC', 'Appliance', 'General', 'Predictive', 'Preventative']);

export const WorkOrderTaskSchema = z.object({
  id: z.string(),
  description: z.string(),
  completed: z.boolean(),
  required: z.boolean().default(true),
});

export const WorkOrderSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  propertyId: z.string(),
  assetId: z.string().optional(),
  title: z.string(),
  description: z.string(),
  priority: WorkOrderPriorityEnum,
  status: WorkOrderStatusEnum,
  category: WorkOrderCategoryEnum,
  assignedUserId: z.string().optional(),
  createdAt: z.string(), // ISO
  updatedAt: z.string(), // ISO
  scheduledStart: z.string().optional(), // ISO
  scheduledEnd: z.string().optional(), // ISO
  tasks: z.array(WorkOrderTaskSchema).default([]),
  linkedWorkOrderIds: z.array(z.string()).default([]), // For duplicates
  isDuplicate: z.boolean().default(false),
  qcRequired: z.boolean().default(false),
});
export type WorkOrder = z.infer<typeof WorkOrderSchema>;

// --- Inventory ---
export const PartSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  name: z.string(),
  sku: z.string(),
  category: z.string(),
  cost: z.number(),
  minStockLevel: z.number(),
});
export type Part = z.infer<typeof PartSchema>;

export const WarehouseSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  propertyId: z.string(),
  name: z.string(),
  type: z.enum(['Main', 'Satellite', 'Truck']),
  location: z.string(),
});
export type Warehouse = z.infer<typeof WarehouseSchema>;

export const StockLevelSchema = z.object({
  id: z.string(),
  warehouseId: z.string(),
  partId: z.string(),
  quantity: z.number(),
  updatedAt: z.string(),
});
export type StockLevel = z.infer<typeof StockLevelSchema>;

// --- Vendors ---
export const VendorSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  name: z.string(),
  type: z.enum(['Service', 'Supply', 'Software']),
  status: z.enum(['Active', 'Probation', 'Non-Compliant']),
  complianceScore: z.number(), // 0-100
  lastAuditDate: z.string().optional(),
});
export type Vendor = z.infer<typeof VendorSchema>;

// --- Audit & Security ---
export const AuditLogSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  actorId: z.string(),
  actorName: z.string(),
  action: z.string(),
  entityType: z.string(),
  entityId: z.string(),
  details: z.string().optional(),
  timestamp: z.string(),
});
export type AuditLog = z.infer<typeof AuditLogSchema>;

// --- Scheduling ---
export const AppointmentSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  propertyId: z.string(),
  workOrderId: z.string().optional(),
  startAt: z.string(), // ISO
  endAt: z.string(), // ISO
  title: z.string(),
  resourceId: z.string().optional(), // Tech user ID
  status: z.enum(['scheduled', 'cancelled', 'completed']),
});
export type Appointment = z.infer<typeof AppointmentSchema>;

export const SchedulingRulesSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  propertyId: z.string().optional(), // If null, global/tenant default
  minimumLeadTimeMinutes: z.number().default(180),
  minimumGapMinutes: z.number().default(120),
  defaultDurationMinutes: z.number().default(60),
});
export type SchedulingRules = z.infer<typeof SchedulingRulesSchema>;

export const DatabaseSchema = z.object({
  users: z.array(UserSchema),
  tenants: z.array(TenantSchema),
  properties: z.array(PropertySchema),
  assets: z.array(AssetSchema),
  workOrders: z.array(WorkOrderSchema),
  parts: z.array(PartSchema),
  warehouses: z.array(WarehouseSchema),
  stockLevels: z.array(StockLevelSchema),
  vendors: z.array(VendorSchema),
  auditLogs: z.array(AuditLogSchema),
  appointments: z.array(AppointmentSchema),
  schedulingRules: z.array(SchedulingRulesSchema),
});
export type Database = z.infer<typeof DatabaseSchema>;
