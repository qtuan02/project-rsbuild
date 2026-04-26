import {
  Building,
  Building2,
  CheckSquare,
  Droplet,
  BarChart3,
  Shield,
  MessageSquare,
  Home,
  ReceiptText,
  ScrollText,
  Settings,
  Users,
  Wallet,
  Banknote,
} from "lucide-react";

import { BuildingListPage } from "@/features/buildings/pages/building-list-page";
import { CommunicationsPage } from "@/features/communications/pages/communications-page";
import { ComplianceDashboardPage } from "@/features/compliance/pages/compliance-dashboard-page";
import { ContractListPage } from "@/features/contracts/pages/contract-list-page";
import { DashboardPage } from "@/features/dashboard/pages/dashboard-page";
import { ExpenseListPage } from "@/features/expenses/pages/expense-list-page";
import { InvoiceListPage } from "@/features/invoices/pages/invoice-list-page";
import { ReportsOverviewPage } from "@/features/reports/pages/reports-overview-page";
import { RoomListPage } from "@/features/rooms/pages/room-list-page";
import { SettingsPage } from "@/features/settings/pages/settings-page";
import { ReconciliationPage } from "@/features/supplier-bills/pages/reconciliation-page";
import { SupplierBillListPage } from "@/features/supplier-bills/pages/supplier-bill-list-page";
import { TaskCenterPage } from "@/features/tasks/pages/task-center-page";
import { TenantListPage } from "@/features/tenants/pages/tenant-list-page";
import { UtilityListPage } from "@/features/utilities/pages/utility-list-page";

import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

export const routes = {
  home: "/",
  buildings: "/buildings",
  rooms: "/rooms",
  tenants: "/tenants",
  contracts: "/contracts",
  invoices: "/invoices",
  utilities: "/utilities",
  tasks: "/tasks",
  reports: "/reports",
  compliance: "/compliance",
  communications: "/communications",
  settings: "/settings",
  authLogin: "/auth/login",
  authRegister: "/auth/register",
  onboarding: "/onboarding",
  supplierBills: "/supplier-bills",
  expenses: "/expenses",
  reconciliation: "/reconciliation",
} as const;

export const routePathBuilders = {
  buildingDetail: (buildingId: string) => `${routes.buildings}/${buildingId}`,
  roomDetail: (roomId: string) => `${routes.rooms}/${roomId}`,
  tenantDetail: (tenantId: string) => `${routes.tenants}/${tenantId}`,
  contractDetail: (contractId: string) => `${routes.contracts}/${contractId}`,
  contractRenew: (contractId: string) =>
    `${routes.contracts}/${contractId}/renew`,
  contractLiquidation: (contractId: string) =>
    `${routes.contracts}/${contractId}/liquidation`,
  invoiceDetail: (invoiceId: string) => `${routes.invoices}/${invoiceId}`,
  utilityDetail: (utilityId: string) => `${routes.utilities}/${utilityId}`,
  supplierBillDetail: (billId: string) => `${routes.supplierBills}/${billId}`,
  expenseDetail: (expenseId: string) => `${routes.expenses}/${expenseId}`,
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
    key: "buildings",
    path: routes.buildings,
    routePath: "buildings/*",
    title: "Tòa nhà",
    description: "Quản lý danh sách tòa nhà.",
    icon: Building,
    group: "main",
    implemented: true,
    component: BuildingListPage,
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
    key: "utilities",
    path: routes.utilities,
    routePath: "utilities/*",
    title: "Tiện ích",
    description: "Quản lý chỉ số điện nước.",
    icon: Droplet,
    group: "management",
    implemented: true,
    component: UtilityListPage,
  },
  {
    key: "supplierBills",
    path: routes.supplierBills,
    routePath: "supplier-bills/*",
    title: "Hóa đơn nhà cung cấp",
    description: "Quản lý hóa đơn từ nhà cung cấp dịch vụ.",
    icon: ReceiptText,
    group: "management",
    implemented: true,
    component: SupplierBillListPage,
  },
  {
    key: "expenses",
    path: routes.expenses,
    routePath: "expenses/*",
    title: "Chi phí vận hành",
    description: "Quản lý các khoản chi phí hoạt động.",
    icon: Wallet,
    group: "management",
    implemented: true,
    component: ExpenseListPage,
  },
  {
    key: "reconciliation",
    path: routes.reconciliation,
    routePath: "reconciliation",
    title: "Đối soát chi phí",
    description: "Đối soát thu chi theo tòa nhà.",
    icon: Banknote,
    group: "management",
    implemented: true,
    component: ReconciliationPage,
  },
  {
    key: "tasks",
    path: routes.tasks,
    routePath: "tasks/*",
    title: "Trung tâm nhiệm vụ",
    description: "Xem các nhiệm vụ cần xử lý.",
    icon: CheckSquare,
    group: "main",
    implemented: true,
    component: TaskCenterPage,
  },
  {
    key: "reports",
    path: routes.reports,
    routePath: "reports/*",
    title: "Báo cáo",
    description: "Xem báo cáo doanh thu, chi phí và hiệu suất.",
    icon: BarChart3,
    group: "management",
    implemented: true,
    component: ReportsOverviewPage,
  },
  {
    key: "compliance",
    path: routes.compliance,
    routePath: "compliance/*",
    title: "Tuân thủ",
    description: "Quản lý khai báo nơi ở và kiểm tra an toàn.",
    icon: Shield,
    group: "system",
    implemented: true,
    component: ComplianceDashboardPage,
  },
  {
    key: "communications",
    path: routes.communications,
    routePath: "communications/*",
    title: "Liên lạc",
    description: "Gửi thông báo cho khách thuê.",
    icon: MessageSquare,
    group: "system",
    implemented: true,
    component: CommunicationsPage,
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
