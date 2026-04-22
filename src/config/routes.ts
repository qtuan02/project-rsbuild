import {
  Building2,
  Home,
  ReceiptText,
  ScrollText,
  Settings,
  Users,
} from "lucide-react";

import { DashboardPage } from "@/features/dashboard/pages/dashboard-page";
import { RoomListPage } from "@/features/rooms/pages/room-list-page";
import { TenantListPage } from "@/features/tenants/pages/tenant-list-page";
import { ContractListPage } from "@/features/contracts/pages/contract-list-page";
import { InvoiceListPage } from "@/features/invoices/pages/invoice-list-page";
import { SettingsPage } from "@/features/settings/pages/settings-page";

import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

export const routes = {
  home: "/",
  rooms: "/rooms",
  tenants: "/tenants",
  contracts: "/contracts",
  invoices: "/invoices",
  settings: "/settings",
} as const;

export type AppRoutePath = (typeof routes)[keyof typeof routes];
export type AppRouteKey = keyof typeof routes;
export type AppNavigationGroup = "main" | "management" | "system";

interface AppRouteMeta {
  title: string;
  description: string;
}

export interface AppRouteManifestItem extends AppRouteMeta {
  key: AppRouteKey;
  path: AppRoutePath;
  routePath: string;
  icon: LucideIcon;
  group: AppNavigationGroup;
  implemented: boolean;
  comingSoonTitle?: string;
  component?: ComponentType;
}

export const appRouteManifest: AppRouteManifestItem[] = [
  {
    key: "home",
    path: routes.home,
    routePath: "",
    title: "Tổng quan",
    description: "Tổng quan hoạt động quản lý phòng trọ.",
    icon: Home,
    group: "main",
    implemented: true,
    component: DashboardPage,
  },
  {
    key: "rooms",
    path: routes.rooms,
    routePath: "rooms/*",
    title: "Phòng trọ",
    description: "Quản lý danh sách phòng và trạng thái.",
    icon: Building2,
    group: "main",
    implemented: true,
    component: RoomListPage,
  },
  {
    key: "tenants",
    path: routes.tenants,
    routePath: "tenants/*",
    title: "Khách thuê",
    description: "Theo dõi thông tin khách thuê.",
    icon: Users,
    group: "main",
    implemented: true,
    component: TenantListPage,
  },
  {
    key: "contracts",
    path: routes.contracts,
    routePath: "contracts/*",
    title: "Hợp đồng",
    description: "Quản lý hợp đồng cho thuê.",
    icon: ScrollText,
    group: "management",
    implemented: true,
    component: ContractListPage,
  },
  {
    key: "invoices",
    path: routes.invoices,
    routePath: "invoices/*",
    title: "Hóa đơn",
    description: "Theo dõi thanh toán và công nợ.",
    icon: ReceiptText,
    group: "management",
    implemented: true,
    component: InvoiceListPage,
  },
  {
    key: "settings",
    path: routes.settings,
    routePath: "settings/*",
    title: "Cài đặt",
    description: "Cấu hình hệ thống.",
    icon: Settings,
    group: "system",
    implemented: true,
    component: SettingsPage,
  },
] as const;

export const navigationGroupLabels: Record<AppNavigationGroup, string> = {
  main: "Chính",
  management: "Quản lý",
  system: "Hệ thống",
};

export const navigationSections = (
  Object.keys(navigationGroupLabels) as AppNavigationGroup[]
).map((group) => ({
  key: group,
  label: navigationGroupLabels[group],
  items: appRouteManifest.filter((routeItem) => routeItem.group === group),
}));

const isRouteMatch = (pathname: string, routePath: AppRoutePath): boolean => {
  if (routePath === routes.home) {
    return pathname === routes.home;
  }

  return pathname === routePath || pathname.startsWith(`${routePath}/`);
};

export const resolveRouteMetadata = (pathname: string): AppRouteMeta => {
  const matchedRoute = appRouteManifest
    .filter((routeItem) => routeItem.path !== routes.home)
    .sort((first, second) => second.path.length - first.path.length)
    .find((routeItem) => isRouteMatch(pathname, routeItem.path));

  return matchedRoute
    ? {
        title: matchedRoute.title,
        description: matchedRoute.description,
      }
    : {
        title: appRouteManifest[0].title,
        description: appRouteManifest[0].description,
      };
};
