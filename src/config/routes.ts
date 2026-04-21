export const routes = {
  home: '/',
  rooms: '/rooms',
  tenants: '/tenants',
  contracts: '/contracts',
  invoices: '/invoices',
  settings: '/settings',
} as const;

type AppRoutePath = (typeof routes)[keyof typeof routes];
export type AppRouteKey = keyof typeof routes;

interface RouteMeta {
  title: string;
  description: string;
}

export interface AppRouteConfig extends RouteMeta {
  key: AppRouteKey;
  path: AppRoutePath;
  routePath: string;
  implemented: boolean;
  comingSoonTitle?: string;
}

export const appRouteConfigs: AppRouteConfig[] = [
  {
    key: 'home',
    path: routes.home,
    routePath: '',
    title: 'Tổng quan',
    description: 'Tổng quan hoạt động quản lý phòng trọ.',
    implemented: true,
  },
  {
    key: 'rooms',
    path: routes.rooms,
    routePath: 'rooms/*',
    title: 'Phòng trọ',
    description: 'Quản lý danh sách phòng và trạng thái.',
    implemented: true,
  },
  {
    key: 'tenants',
    path: routes.tenants,
    routePath: 'tenants/*',
    title: 'Khách thuê',
    description: 'Theo dõi thông tin khách thuê.',
    implemented: true,
  },
  {
    key: 'contracts',
    path: routes.contracts,
    routePath: 'contracts/*',
    title: 'Hợp đồng',
    description: 'Quản lý hợp đồng cho thuê.',
    implemented: false,
    comingSoonTitle: 'Quản lý hợp đồng',
  },
  {
    key: 'invoices',
    path: routes.invoices,
    routePath: 'invoices/*',
    title: 'Hóa đơn',
    description: 'Theo dõi thanh toán và công nợ.',
    implemented: false,
    comingSoonTitle: 'Quản lý hóa đơn',
  },
  {
    key: 'settings',
    path: routes.settings,
    routePath: 'settings/*',
    title: 'Cài đặt',
    description: 'Cấu hình hệ thống.',
    implemented: false,
    comingSoonTitle: 'Cài đặt hệ thống',
  },
] as const;

export const routeMetadata: Record<AppRoutePath, RouteMeta> = {
  [routes.home]: {
    title: 'Tổng quan',
    description: 'Tổng quan hoạt động quản lý phòng trọ.',
  },
  [routes.rooms]: {
    title: 'Phòng trọ',
    description: 'Quản lý danh sách phòng và trạng thái.',
  },
  [routes.tenants]: {
    title: 'Khách thuê',
    description: 'Theo dõi thông tin khách thuê.',
  },
  [routes.contracts]: {
    title: 'Hợp đồng',
    description: 'Quản lý hợp đồng cho thuê.',
  },
  [routes.invoices]: {
    title: 'Hóa đơn',
    description: 'Theo dõi thanh toán và công nợ.',
  },
  [routes.settings]: {
    title: 'Cài đặt',
    description: 'Cấu hình hệ thống.',
  },
};

const isRouteMatch = (pathname: string, routePath: AppRoutePath): boolean => {
  if (routePath === routes.home) {
    return pathname === routes.home;
  }

  return pathname === routePath || pathname.startsWith(`${routePath}/`);
};

export const resolveRouteMetadata = (pathname: string): RouteMeta => {
  const matchedConfig = appRouteConfigs
    .filter((config) => config.path !== routes.home)
    .sort((first, second) => second.path.length - first.path.length)
    .find((config) => isRouteMatch(pathname, config.path));

  if (matchedConfig) {
    return {
      title: matchedConfig.title,
      description: matchedConfig.description,
    };
  }

  return routeMetadata[routes.home];
};
