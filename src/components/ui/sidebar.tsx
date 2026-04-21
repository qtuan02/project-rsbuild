import { cva, type VariantProps } from 'class-variance-authority';
import { PanelLeftIcon } from 'lucide-react';
import { Slot } from 'radix-ui';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/cn';

type SidebarState = 'expanded' | 'collapsed';

interface SidebarContextValue {
  isMobile: boolean;
  state: SidebarState;
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

const SIDEBAR_COOKIE_KEY = 'dashboard.sidebar.open';
const MOBILE_BREAKPOINT = 768;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    );

    const update = () => {
      setIsMobile(mediaQueryList.matches);
    };

    update();
    mediaQueryList.addEventListener('change', update);

    return () => {
      mediaQueryList.removeEventListener('change', update);
    };
  }, []);

  return isMobile;
};

export const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within SidebarProvider.');
  }
  return context;
};

interface SidebarProviderProps extends React.ComponentProps<'div'> {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const SidebarProvider = ({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);

  const open = openProp ?? internalOpen;
  const setOpen = React.useCallback(
    (value: boolean) => {
      if (setOpenProp) {
        setOpenProp(value);
      } else {
        setInternalOpen(value);
      }

      document.cookie = `${SIDEBAR_COOKIE_KEY}=${value}; path=/; max-age=604800`;
    },
    [setOpenProp],
  );

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((current) => !current);
      return;
    }

    setOpen(!open);
  }, [isMobile, open, setOpen]);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [toggleSidebar]);

  const state: SidebarState = open ? 'expanded' : 'collapsed';

  const contextValue = React.useMemo<SidebarContextValue>(
    () => ({
      isMobile,
      state,
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [isMobile, state, open, setOpen, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        data-state={state}
        className={cn(
          'group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar',
          className,
        )}
        style={
          {
            '--sidebar-width': '16rem',
            '--sidebar-width-icon': '4rem',
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
};

interface SidebarProps extends React.ComponentProps<'div'> {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}

export const Sidebar = ({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: SidebarProps) => {
  const { isMobile, openMobile, setOpenMobile, state } = useSidebar();

  if (collapsible === 'none') {
    return (
      <div
        data-slot="sidebar"
        className={cn(
          'bg-sidebar text-sidebar-foreground flex h-svh w-[var(--sidebar-width)] flex-col border-r border-sidebar-border',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side={side}
          showCloseButton={false}
          className="bg-sidebar text-sidebar-foreground w-(--sidebar-width) p-0 [&>button]:hidden"
        >
          <div data-mobile="true" className="flex h-full flex-col">
            {children}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      data-slot="sidebar"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      className={cn('group peer hidden md:block', className)}
      {...props}
    >
      <div
        className={cn(
          'relative h-svh bg-transparent transition-[width] duration-200 ease-linear',
          side === 'left'
            ? 'w-(--sidebar-width)'
            : 'w-(--sidebar-width) rotate-180',
          state === 'collapsed' && collapsible === 'icon'
            ? 'w-(--sidebar-width-icon)'
            : '',
        )}
      />
      <div
        className={cn(
          'fixed inset-y-0 z-10 hidden h-svh transition-[left,right,width] duration-200 ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          state === 'collapsed' && collapsible === 'icon'
            ? 'w-(--sidebar-width-icon)'
            : 'w-(--sidebar-width)',
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]'
            : '',
        )}
      >
        <div
          data-slot="sidebar-inner"
          className={cn(
            'bg-sidebar text-sidebar-foreground flex h-full w-full flex-col border-sidebar-border',
            variant === 'floating' && 'rounded-lg border shadow-sm',
            variant === 'inset' && 'rounded-lg border shadow-xs',
            variant === 'sidebar' && 'border-r',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const SidebarInset = ({
  className,
  ...props
}: React.ComponentProps<'main'>) => {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        'bg-background relative flex min-h-svh min-w-0 flex-1 flex-col',
        'peer-data-[variant=inset]:m-2 peer-data-[variant=inset]:ml-0 peer-data-[variant=inset]:rounded-xl peer-data-[variant=inset]:shadow-xs',
        className,
      )}
      {...props}
    />
  );
};

export const SidebarTrigger = ({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      className={cn('size-7', className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

export const SidebarRail = ({
  className,
  ...props
}: React.ComponentProps<'button'>) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      aria-label="Toggle Sidebar"
      data-slot="sidebar-rail"
      className={cn(
        'absolute inset-y-0 z-20 hidden w-2 -translate-x-1/2 cursor-ew-resize bg-transparent transition-colors hover:bg-border/70 md:block',
        className,
      )}
      onClick={toggleSidebar}
      {...props}
    />
  );
};

export const SidebarHeader = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="sidebar-header"
      className={cn(
        'flex flex-col gap-2 border-b border-sidebar-border p-3',
        className,
      )}
      {...props}
    />
  );
};

export const SidebarFooter = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn('mt-auto border-t border-sidebar-border p-3', className)}
      {...props}
    />
  );
};

export const SidebarContent = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2',
        className,
      )}
      {...props}
    />
  );
};

export const SidebarGroup = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="sidebar-group"
      className={cn('relative flex w-full min-w-0 flex-col gap-1', className)}
      {...props}
    />
  );
};

export const SidebarGroupLabel = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        'text-sidebar-foreground/70 px-2 py-1 text-xs font-medium tracking-wide uppercase',
        className,
      )}
      {...props}
    />
  );
};

export const SidebarGroupContent = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="sidebar-group-content"
      className={cn('w-full text-sm', className)}
      {...props}
    />
  );
};

export const SidebarMenu = ({
  className,
  ...props
}: React.ComponentProps<'ul'>) => {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn('flex w-full min-w-0 flex-col gap-1', className)}
      {...props}
    />
  );
};

export const SidebarMenuItem = ({
  className,
  ...props
}: React.ComponentProps<'li'>) => {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  );
};

const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md px-2 py-1.5 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0',
  {
    variants: {
      variant: {
        default: 'text-sidebar-foreground',
        outline:
          'bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm',
      },
      isActive: {
        true: 'bg-sidebar-accent text-sidebar-accent-foreground font-medium',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      isActive: false,
    },
  },
);

interface SidebarMenuButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean;
  tooltip?: string;
}

export const SidebarMenuButton = ({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  ...props
}: SidebarMenuButtonProps) => {
  const Comp = asChild ? Slot.Root : 'button';
  const { state, isMobile } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-active={isActive}
      className={cn(
        sidebarMenuButtonVariants({ variant, size, isActive }),
        className,
      )}
      {...props}
    />
  );

  if (!tooltip || state !== 'collapsed' || isMobile) {
    return button;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right">{tooltip}</TooltipContent>
    </Tooltip>
  );
};

export const SidebarSeparator = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="sidebar-separator"
      className={cn('bg-sidebar-border my-2 h-px w-full', className)}
      {...props}
    />
  );
};
