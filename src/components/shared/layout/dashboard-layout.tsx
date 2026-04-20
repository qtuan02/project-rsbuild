import { Outlet } from 'react-router-dom';

import { AppHeader } from '@/components/shared/layout/app-header';
import { AppSidebar } from '@/components/shared/layout/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export const DashboardLayout = () => {
  return (
    <div className="bg-background flex h-dvh w-full">
      <SidebarProvider defaultOpen>
        <AppSidebar />
        <SidebarInset className="min-h-0 ">
          <div className="flex h-full flex-col overflow-hidden">
            <AppHeader />
            <main className="flex-1 overflow-auto">
              <div className="mx-auto flex w-full max-w-7xl flex-col p-4 lg:p-6">
                <Outlet />
              </div>
            </main>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};
