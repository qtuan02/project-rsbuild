export const tenantQueryKeys = {
  all: ['tenants'] as const,
  lists: () => [...tenantQueryKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) =>
    [...tenantQueryKeys.lists(), filters] as const,
  detail: (id: string) => [...tenantQueryKeys.all, 'detail', id] as const,
} as const;
