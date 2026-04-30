import {
  Bell,
  CheckCheck,
  FileText,
  ReceiptText,
  Settings,
  Users,
  Wrench,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/libs/cn";

import type { LucideIcon } from "lucide-react";

// --- Constants ---
const NOTIFICATION_LIST_HEIGHT = "h-[320px]";

// --- Types ---
type NotificationType =
  | "invoice"
  | "contract"
  | "maintenance"
  | "tenant"
  | "system";

interface Notification {
  readonly id: string;
  readonly type: NotificationType;
  readonly title: string;
  readonly description: string;
  readonly time: string;
  read: boolean;
}

interface NotificationTypeConfig {
  readonly icon: LucideIcon;
  readonly colorClass: string;
  readonly bgClass: string;
}

interface NotificationItemProps {
  notification: Notification;
  onMarkRead: (id: string) => void;
}

// --- Config ---
const TYPE_CONFIG: Record<NotificationType, NotificationTypeConfig> = {
  invoice: {
    icon: ReceiptText,
    colorClass: "text-amber-600",
    bgClass: "bg-amber-100 dark:bg-amber-900/30",
  },
  contract: {
    icon: FileText,
    colorClass: "text-blue-600",
    bgClass: "bg-blue-100 dark:bg-blue-900/30",
  },
  maintenance: {
    icon: Wrench,
    colorClass: "text-red-600",
    bgClass: "bg-red-100 dark:bg-red-900/30",
  },
  tenant: {
    icon: Users,
    colorClass: "text-emerald-600",
    bgClass: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  system: {
    icon: Settings,
    colorClass: "text-muted-foreground",
    bgClass: "bg-muted",
  },
} as const;

// --- Mock data ---
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "invoice",
    title: "Hóa đơn quá hạn",
    description: "Phòng 204 chưa thanh toán hóa đơn tháng 4, quá hạn 2 ngày.",
    time: "5 phút trước",
    read: false,
  },
  {
    id: "2",
    type: "maintenance",
    title: "Yêu cầu bảo trì",
    description: "Phòng 108 báo cáo vòi nước bị rò rỉ, cần xử lý gấp.",
    time: "1 giờ trước",
    read: false,
  },
  {
    id: "3",
    type: "contract",
    title: "Hợp đồng sắp hết hạn",
    description: "Hợp đồng phòng 302 (Lê Thị C) sẽ hết hạn trong 3 ngày nữa.",
    time: "2 giờ trước",
    read: false,
  },
  {
    id: "4",
    type: "tenant",
    title: "Khách thuê mới",
    description: "Trần Văn B đã ký hợp đồng và nhận phòng 201 thành công.",
    time: "3 giờ trước",
    read: true,
  },
  {
    id: "5",
    type: "invoice",
    title: "Thanh toán thành công",
    description: "Phòng 105 đã thanh toán đủ hóa đơn tháng 4 – 3,000,000 đ.",
    time: "5 giờ trước",
    read: true,
  },
  {
    id: "6",
    type: "system",
    title: "Cập nhật hệ thống",
    description: "Hệ thống đã được cập nhật lên phiên bản 2.1.0 thành công.",
    time: "1 ngày trước",
    read: true,
  },
];

// --- Sub-components ---
const NotificationItem = ({
  notification,
  onMarkRead,
}: NotificationItemProps) => {
  const config = TYPE_CONFIG[notification.type];
  const Icon = config.icon;

  return (
    <button
      type="button"
      onClick={() => onMarkRead(notification.id)}
      className={cn(
        "group flex w-full gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/60",
        !notification.read && "bg-primary/5 hover:bg-primary/10",
      )}
    >
      <div
        className={cn(
          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          config.bgClass,
        )}
      >
        <Icon className={cn("h-4 w-4", config.colorClass)} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p
            className={cn(
              "text-sm leading-tight",
              notification.read
                ? "font-normal text-foreground"
                : "font-semibold text-foreground",
            )}
          >
            {notification.title}
          </p>
          {!notification.read && (
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
          )}
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
          {notification.description}
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground/70">
          {notification.time}
        </p>
      </div>
    </button>
  );
};

const EmptyUnread = () => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted mb-3">
      <Bell className="h-5 w-5 text-muted-foreground opacity-50" />
    </div>
    <p className="text-sm font-medium text-muted-foreground">
      Không có thông báo mới
    </p>
  </div>
);

// --- Main component ---
export const NotificationPanel = () => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const unreadList = notifications.filter((n) => !n.read);

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon-sm"
          variant="ghost"
          aria-label="Thông báo"
          className="relative text-muted-foreground hover:text-foreground"
        >
          <Bell
            className={cn("h-4 w-4 transition-transform", open && "scale-110")}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[380px] p-0 gap-0"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">Thông báo</h3>
            {unreadCount > 0 && (
              <Badge variant="default" className="h-5 px-1.5 text-[11px]">
                {unreadCount} mới
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground"
              onClick={markAllRead}
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Đánh dấu đã đọc
            </Button>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all">
          <div className="px-4 pt-2 pb-0">
            <TabsList className="h-8 w-full">
              <TabsTrigger value="all" className="flex-1 text-xs">
                Tất cả
                <span className="ml-1.5 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {notifications.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex-1 text-xs">
                Chưa đọc
                {unreadCount > 0 && (
                  <span className="ml-1.5 rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <ScrollArea className={NOTIFICATION_LIST_HEIGHT}>
              <div className="divide-y">
                {notifications.map((n) => (
                  <NotificationItem
                    key={n.id}
                    notification={n}
                    onMarkRead={markRead}
                  />
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="unread" className="mt-0">
            <ScrollArea className={NOTIFICATION_LIST_HEIGHT}>
              {unreadList.length === 0 ? (
                <EmptyUnread />
              ) : (
                <div className="divide-y">
                  {unreadList.map((n) => (
                    <NotificationItem
                      key={n.id}
                      notification={n}
                      onMarkRead={markRead}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <Separator />
        <div className="px-4 py-2.5">
          <Button
            variant="ghost"
            className="h-8 w-full text-xs text-muted-foreground hover:text-foreground"
          >
            Xem tất cả thông báo
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
