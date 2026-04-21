import type { Tenant } from '@/types/tenant';

import { mockTenants } from './tenant.mock';

export const getTenants = (): Tenant[] => mockTenants;
