export const routes = {
  home: '/',
  rooms: '/rooms',
  tenants: '/tenants',
  contracts: '/contracts',
  invoices: '/invoices',
  settings: '/settings',
} as const;

type AppRoutePath = (typeof routes)[keyof typeof routes];

interface RouteMeta {
  title: string;
  description: string;
}

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
