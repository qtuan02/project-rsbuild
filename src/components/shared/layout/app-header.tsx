import { Bell, PanelLeft, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import { routeMetadata, routes } from '@/config/routes';
import { cn } from '@/lib/utils';

const resolveHeaderContent = (pathname: string) => {
  if (pathname.startsWith(routes.rooms)) {
    return routeMetadata[routes.rooms];
  }

  if (pathname.startsWith(routes.tenants)) {
    return routeMetadata[routes.tenants];
  }

  if (pathname.startsWith(routes.contracts)) {
    return routeMetadata[routes.contracts];
  }

  if (pathname.startsWith(routes.invoices)) {
    return routeMetadata[routes.invoices];
  }

  if (pathname.startsWith(routes.settings)) {
    return routeMetadata[routes.settings];
  }

  return routeMetadata[routes.home];
};

export const AppHeader = () => {
  const location = useLocation();
  const metadata = resolveHeaderContent(location.pathname);
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <header className="sticky top-0 z-10 flex h-15 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md lg:h-[60px] lg:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleSidebar}
          className="hidden text-muted-foreground hover:text-foreground md:inline-flex"
        >
          <PanelLeft
            className={cn(
              'h-5 w-5 transition-transform duration-300',
              isCollapsed && 'rotate-180',
            )}
          />
          <span className="sr-only">Toggle Sidebar</span>
        </Button>

        <Separator
          orientation="vertical"
          className="hidden h-5 md:block self-center!"
        />

        <div className="min-w-0">
          <h1 className="truncate text-sm font-semibold tracking-tight">
            {metadata.title}
          </h1>
          <p className="hidden truncate text-xs text-muted-foreground sm:block">
            {metadata.description}
          </p>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right: Search + Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="relative hidden h-8 w-56 justify-start rounded-md border-border bg-background text-sm text-muted-foreground shadow-none hover:bg-muted hover:text-foreground lg:flex lg:w-64"
        >
          <Search className="mr-2 h-3.5 w-3.5" />
          <span>Tìm kiếm...</span>
          <kbd className="pointer-events-none absolute top-1.5 right-1.5 hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground hover:text-foreground lg:hidden"
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Tìm kiếm</span>
        </Button>

        <Separator orientation="vertical" className="h-5 self-center!" />

        <Button
          size="icon-sm"
          variant="ghost"
          aria-label="Thông báo"
          className="relative text-muted-foreground hover:text-foreground"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
            3
          </span>
        </Button>

        <Avatar className="h-8 w-8 cursor-pointer rounded-lg border border-border shadow-sm transition-shadow hover:shadow-md">
          <AvatarFallback className="rounded-lg bg-primary/10 text-xs font-semibold text-primary">
            NA
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
