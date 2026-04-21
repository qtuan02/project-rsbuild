import type { TenantStatusConfig } from '@/types/tenant';

export const tenantStatusConfig: TenantStatusConfig = {
  active: {
    label: 'Đang thuê',
    className:
      'border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
  },
  pending: {
    label: 'Chờ vào',
    className:
      'border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800',
  },
  overdue: {
    label: 'Nợ cước',
    className:
      'border-red-200 bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800',
  },
  ended: {
    label: 'Đã trả',
    className:
      'border-zinc-200 bg-zinc-50 text-zinc-500 dark:bg-zinc-900/50 dark:text-zinc-400 dark:border-zinc-700',
  },
};
