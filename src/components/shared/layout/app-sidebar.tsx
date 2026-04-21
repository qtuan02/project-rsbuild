import {
  Building2,
  FileText,
  Home,
  ReceiptText,
  ScrollText,
  Settings,
  Users,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { NavUser } from '@/components/shared/layout/nav-user';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { routes } from '@/config/routes';

interface NavigationItem {
  title: string;
  href: string;
  icon: typeof Home;
}

const mainMenuItems: NavigationItem[] = [
  { title: 'Tổng quan', href: routes.home, icon: Home },
  { title: 'Phòng trọ', href: routes.rooms, icon: Building2 },
  { title: 'Khách thuê', href: routes.tenants, icon: Users },
];

const managementItems: NavigationItem[] = [
  { title: 'Hợp đồng', href: routes.contracts, icon: ScrollText },
  { title: 'Hóa đơn', href: routes.invoices, icon: ReceiptText },
];

const systemItems: NavigationItem[] = [
  { title: 'Cài đặt', href: routes.settings, icon: Settings },
];

const renderMenuItem = (item: NavigationItem, pathname: string) => {
  const isActive =
    item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

  return (
    <SidebarMenuItem key={item.href}>
      <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
        <Link to={item.href}>
          <item.icon className="shrink-0" />
          <span className="group-data-[collapsible=icon]:hidden">
            {item.title}
          </span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export const AppSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="h-14 border-b px-4 md:h-[60px] lg:px-6 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center">
        <Link
          to={routes.home}
          className="flex flex-1 items-center gap-2.5 font-semibold group-data-[collapsible=icon]:justify-center"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <FileText className="size-4" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-bold tracking-tight text-foreground">
              Phòng Trọ
            </span>
            <span className="text-[10px] leading-none text-muted-foreground">
              Quản lý cho thuê
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="overflow-hidden p-0">
        <ScrollArea className="h-full">
          <div className="space-y-1 px-3 py-3">
            <SidebarGroup>
              <SidebarGroupLabel className="mb-1 px-2 text-[11px] font-semibold tracking-wider uppercase text-foreground/60 group-data-[collapsible=icon]:hidden">
                Chính
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainMenuItems.map((item) =>
                    renderMenuItem(item, location.pathname),
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator className="mx-2" />

            <SidebarGroup>
              <SidebarGroupLabel className="mb-1 px-2 text-[11px] font-semibold tracking-wider uppercase text-foreground/60 group-data-[collapsible=icon]:hidden">
                Quản lý
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {managementItems.map((item) =>
                    renderMenuItem(item, location.pathname),
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator className="mx-2" />

            <SidebarGroup>
              <SidebarGroupLabel className="mb-1 px-2 text-[11px] font-semibold tracking-wider uppercase text-foreground/60 group-data-[collapsible=icon]:hidden">
                Hệ thống
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {systemItems.map((item) =>
                    renderMenuItem(item, location.pathname),
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter>
        <NavUser name="Nguyễn Văn A" email="admin@phongtro.vn" />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};
