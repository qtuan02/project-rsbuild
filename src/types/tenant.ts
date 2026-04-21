export type TenantStatus = 'active' | 'pending' | 'overdue' | 'ended';
export const TENANT_STATUSES = [
  'active',
  'pending',
  'overdue',
  'ended',
] as const;

export type TenantGender = 'male' | 'female';

export interface Tenant {
  id: string;
  name: string;
  phone: string;
  email: string;
  room: string;
  floor: number;
  rentAmount: number;
  depositAmount: number;
  moveInDate: string;
  contractEnd: string;
  status: TenantStatus;
  idNumber: string;
  gender: TenantGender;
  avatarColor: string;
}

export interface TenantStatusConfigItem {
  label: string;
  className: string;
}

export type TenantStatusConfig = Record<TenantStatus, TenantStatusConfigItem>;

export const isTenantStatus = (value: string): value is TenantStatus =>
  TENANT_STATUSES.includes(value as TenantStatus);
