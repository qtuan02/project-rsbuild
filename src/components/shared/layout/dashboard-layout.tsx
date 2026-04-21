import { Outlet } from 'react-router-dom';

import { AppHeader } from '@/components/shared/layout/app-header';
import { AppSidebar } from '@/components/shared/layout/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export const DashboardLayout = () => {
  return (
    <div className="bg-background flex h-dvh w-full">
      <SidebarProvider defaultOpen>
        <AppSidebar />
        <SidebarInset className="size-full overflow-hidden">
          <AppHeader />
          <main className="flex-1 overflow-auto">
            <div className="mx-auto flex max-w-7xl flex-col p-4 lg:p-6">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
