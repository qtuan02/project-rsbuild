import { PanelLeft } from "lucide-react";
import { useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { resolveRouteMetadata } from "@/config/routes";
import { cn } from "@/libs/cn";

import { BuildingSelector } from "./building-selector";
import { NotificationPanel } from "./notification-panel";
import { SearchDialog } from "./search-dialog";

export const AppHeader = () => {
  const location = useLocation();
  const metadata = resolveRouteMetadata(location.pathname);
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <header className="sticky top-0 z-10 flex h-15 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md lg:h-[60px] lg:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleSidebar}
          className="text-muted-foreground hover:text-foreground"
        >
          <PanelLeft
            className={cn(
              "h-5 w-5 transition-transform duration-300",
              isCollapsed && "rotate-180",
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

      <div className="flex-1" />

      <div className="flex items-center gap-2">
        {/* Search */}
        <SearchDialog />

        {/* Building selector */}
        <div className="border rounded-lg">
          <BuildingSelector />
        </div>

        <Separator orientation="vertical" className="h-5 self-center!" />

        {/* Notifications */}
        <NotificationPanel />
      </div>
    </header>
  );
};
