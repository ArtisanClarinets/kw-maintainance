import { User } from '@/lib/domain/schema';
import { UnauthorizedError, ForbiddenError } from './errors';

export function assertAuthenticated(user: User | null): asserts user is User {
  if (!user) throw new UnauthorizedError('Authentication required');
}

export function assertHasRole(user: User | null, allowedRoles: string[] | string): void {
  assertAuthenticated(user);
  const arr = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  if (!arr.includes(user.role)) {
    throw new ForbiddenError('Insufficient role');
  }
}

export function assertTenantAccess(user: User | null, tenantId: string): void {
  assertAuthenticated(user);
  // security_admin has global access
  if (user.role === 'security_admin') return;
  if (user.tenantId !== tenantId) throw new ForbiddenError('Tenant access required');
}

export function assertCanManageTechnicians(user: User | null, tenantId: string): void {
  assertAuthenticated(user);
  const allowed = ['security_admin', 'tenant_admin', 'supervisor', 'gm', 'vp_ops'];
  if (allowed.includes(user.role) && (user.role === 'security_admin' || user.tenantId === tenantId)) return;
  throw new ForbiddenError('Not allowed to manage technicians');
}

export function assertCanManageTemplates(user: User | null, tenantId: string): void {
  assertAuthenticated(user);
  const allowed = ['security_admin', 'tenant_admin', 'gm', 'supervisor', 'vp_ops'];
  if (allowed.includes(user.role) && (user.role === 'security_admin' || user.tenantId === tenantId)) return;
  throw new ForbiddenError('Not allowed to manage templates');
}

export function assertCanManageVendors(user: User | null, tenantId: string): void {
  assertAuthenticated(user);
  const allowed = ['security_admin', 'tenant_admin', 'procurement', 'gm', 'vp_ops'];
  if (allowed.includes(user.role) && (user.role === 'security_admin' || user.tenantId === tenantId)) return;
  throw new ForbiddenError('Not allowed to manage vendors');
}

export function assertCanManageParts(user: User | null, tenantId: string): void {
  assertAuthenticated(user);
  const allowed = ['security_admin', 'tenant_admin', 'procurement', 'gm', 'vp_ops'];
  if (allowed.includes(user.role) && (user.role === 'security_admin' || user.tenantId === tenantId)) return;
  throw new ForbiddenError('Not allowed to manage parts');
}

export function assertCanManagePurchaseOrders(user: User | null, tenantId: string): void {
  assertAuthenticated(user);
  const allowed = ['security_admin', 'tenant_admin', 'procurement'];
  if (allowed.includes(user.role) && (user.role === 'security_admin' || user.tenantId === tenantId)) return;
  throw new ForbiddenError('Not allowed to manage purchase orders');
}
