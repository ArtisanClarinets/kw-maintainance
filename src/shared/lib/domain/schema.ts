import { z } from 'zod';

// --- Auth & Users ---
export const RoleEnum = z.enum(['tech', 'supervisor', 'gm', 'vp_ops', 'procurement', 'security_admin', 'tenant_admin', 'dispatcher', 'property_manager', 'auditor']);
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

// --- Organization & Geography ---
export const ServiceZoneSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  name: z.string(), // e.g., "Pensacola", "Destin/Fort Walton"
  centralHubLocation: z.string(), // Coordinates or address
  coverageRadiusKm: z.number().optional(),
});
export type ServiceZone = z.infer<typeof ServiceZoneSchema>;

export const TenantSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});
export type Tenant = z.infer<typeof TenantSchema>;

export const PropertySchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  zoneId: z.string().optional(), // Link to ServiceZone
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

// --- Work Orders & Costs ---
export const WorkOrderStatusEnum = z.enum([
  'Request Received',
  'Estimation',
  'Scheduled',
  'En Route',
  'In Progress',
  'Completion & Verification',
  'Invoiced',
  'Cancelled',
  'Draft' // Kept for legacy compatibility
]);

export const WorkOrderPriorityEnum = z.enum(['Low', 'Medium', 'High', 'Critical']);
export const WorkOrderCategoryEnum = z.enum(['Plumbing', 'Electrical', 'HVAC', 'Appliance', 'General', 'Predictive', 'Preventative', 'Hauling', 'Project']);

export const WorkOrderTaskSchema = z.object({
  id: z.string(),
  description: z.string(),
  completed: z.boolean(),
  required: z.boolean().default(true),
});

export const DisposalDetailsSchema = z.object({
  volumeCubicYards: z.number().optional(),
  weightLbs: z.number().optional(),
  disposalFee: z.number().optional(),
  dumpSiteName: z.string().optional(),
  dumpReceiptUrl: z.string().optional(),
});

export const WorkOrderCostSchema = z.object({
  laborCost: z.number().default(0),
  materialCost: z.number().default(0),
  disposalFee: z.number().default(0),
  otherExpenses: z.number().default(0),
  totalCost: z.number().default(0),
  priceCharged: z.number().default(0),
  margin: z.number().default(0),
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
  linkedWorkOrderIds: z.array(z.string()).default([]), // For bundling
  bundleId: z.string().optional(), // Explicit bundle grouping
  isDuplicate: z.boolean().default(false),
  qcRequired: z.boolean().default(false),
  disposalDetails: DisposalDetailsSchema.optional(),
  costing: WorkOrderCostSchema.optional(),
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
  isVanStock: z.boolean().default(false), // Track if common van item
});
export type Part = z.infer<typeof PartSchema>;

export const WarehouseSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  propertyId: z.string().optional(),
  name: z.string(),
  type: z.enum(['Main', 'Satellite', 'Truck']),
  location: z.string(),
  vehicleId: z.string().optional(), // If type is Truck
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
  insuranceExpiration: z.string().optional(), // Track insurance
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


// --- Technicians & Certifications ---
export const CertificationSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  technicianId: z.string().optional(),
  name: z.string(),
  authority: z.string().optional(),
  issuedAt: z.string().optional(),
  expiresAt: z.string().optional(),
});
export type Certification = z.infer<typeof CertificationSchema>;

export const TechnicianSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  userId: z.string().optional(),
  name: z.string(),
  skills: z.array(z.string()).default([]),
  qualificationTags: z.array(z.string()).default([]), // E.g. "Carpentry", "Heavy Lifting"
  certifications: z.array(CertificationSchema).default([]),
  hourlyRate: z.number().optional(),
  active: z.boolean().default(true),
  vehicleId: z.string().optional(),
  homeZoneId: z.string().optional(), // Preferred zone
  phone: z.string().optional(),
});
export type Technician = z.infer<typeof TechnicianSchema>;

// --- Work Order Templates ---
export const WorkOrderTemplateSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  title: z.string(),
  category: WorkOrderCategoryEnum,
  defaultSLA: z.string().optional(),
  tasks: z.array(WorkOrderTaskSchema).default([]),
  requiredCertifications: z.array(z.string()).default([]),
  defaultParts: z.array(z.string()).default([]),
  createdAt: z.string().optional(),
});
export type WorkOrderTemplate = z.infer<typeof WorkOrderTemplateSchema>;

// --- Purchasing & Timesheets ---
export const PurchaseOrderLineSchema = z.object({
  partId: z.string(),
  quantity: z.number(),
  unitCost: z.number(),
});
export const PurchaseOrderSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  vendorId: z.string(),
  propertyId: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
  status: z.enum(['Draft', 'Open', 'Approved', 'Received', 'Closed', 'Cancelled']),
  lines: z.array(PurchaseOrderLineSchema).default([]),
  total: z.number().optional(),
  requestedById: z.string().optional(),
  requestedAt: z.string().optional(),
  approvalNotes: z.string().optional(),
  approvedById: z.string().optional(),
  approvedAt: z.string().optional(),
  receivedAt: z.string().optional(),
});
export type PurchaseOrder = z.infer<typeof PurchaseOrderSchema>;

export const TimesheetSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  technicianId: z.string(),
  workOrderId: z.string().optional(),
  date: z.string(),
  hours: z.number(),
  notes: z.string().optional(),
  approved: z.boolean().default(false),
});
export type Timesheet = z.infer<typeof TimesheetSchema>;

// --- IoT Rules ---
export const IoTRuleSchema = z.object({
  id: z.string(),
  tenantId: z.string(),
  deviceId: z.string(),
  assetId: z.string().optional(),
  metric: z.string(),
  operator: z.enum(['>', '<', '>=', '<=', '===', '!==']),
  threshold: z.number(),
  severity: z.enum(['Low', 'Medium', 'High', 'Critical']).default('High'),
  action: z.enum(['create_work_order', 'notify', 'alert']).default('create_work_order'),
  active: z.boolean().default(true),
});
export type IoTRule = z.infer<typeof IoTRuleSchema>;

// --- Leads ---
export const LeadSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  serviceType: z.string().optional(),
  message: z.string().optional(),
  address: z.string().optional(),
  companyName: z.string().optional(), // For commercial
  portfolioSize: z.string().optional(), // For commercial
  status: z.enum(['New', 'Contacted', 'Closed']).default('New'),
  createdAt: z.string(), // ISO
});
export type Lead = z.infer<typeof LeadSchema>;

// --- Database ---
export const DatabaseSchema = z.object({
  users: z.array(UserSchema),
  tenants: z.array(TenantSchema),
  serviceZones: z.array(ServiceZoneSchema).default([]),
  properties: z.array(PropertySchema),
  assets: z.array(AssetSchema),
  workOrders: z.array(WorkOrderSchema),
  workOrderTemplates: z.array(WorkOrderTemplateSchema),
  technicians: z.array(TechnicianSchema),
  certifications: z.array(CertificationSchema),
  parts: z.array(PartSchema),
  warehouses: z.array(WarehouseSchema),
  stockLevels: z.array(StockLevelSchema),
  vendors: z.array(VendorSchema),
  purchaseOrders: z.array(PurchaseOrderSchema),
  timesheets: z.array(TimesheetSchema),
  iotRules: z.array(IoTRuleSchema),
  auditLogs: z.array(AuditLogSchema),
  appointments: z.array(AppointmentSchema),
  schedulingRules: z.array(SchedulingRulesSchema),
  leads: z.array(LeadSchema).default([]),
});
export type Database = z.infer<typeof DatabaseSchema>;
