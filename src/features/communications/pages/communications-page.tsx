import { Mail, MessageSquare, Send, Bell } from "lucide-react";

import { FilterToolbar, hasActiveSearch } from "@/components/shared/filters";
import {
  EmptyPanel,
  ErrorPanel,
  LoadingPanel,
} from "@/components/shared/panels";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { SendLogTable } from "../components/send-log-table";
import { TemplateList } from "../components/template-list";
import {
  buildSendLogStats,
  filterTemplatesByChannel,
} from "../domain/communication-selectors";
import { useCommunications } from "../hooks/use-communications";

export const CommunicationsPage = () => {
  const {
    isLoading,
    error,
    templates,
    sendLogs,
    filteredLogs,
    searchTenant,
    setSearchTenant,
    filterChannel,
    setFilterChannel,
    filterStatus,
    setFilterStatus,
    clearLogFilters,
    handleSendTemplate,
  } = useCommunications();

  const stats = buildSendLogStats(sendLogs);
  const statIconMap = {
    bell: Bell,
    send: Send,
    messageSquare: MessageSquare,
    mail: Mail,
  } as const;

  if (error) {
    return (
      <div className="space-y-6">
        <ErrorPanel
          title="Không thể tải dữ liệu"
          description={error}
          action={{
            label: "Thử lại",
            onClick: () => window.location.reload(),
          }}
        />
      </div>
    );
  }

  if (isLoading) {
    return <LoadingPanel />;
  }

  const hasActiveFilters =
    hasActiveSearch(searchTenant) ||
    filterChannel !== "all" ||
    filterStatus !== "all";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Liên lạc</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Gửi thông báo cho khách thuê qua nhiều kênh.
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="overview">Tổng quan & Mẫu tin</TabsTrigger>
          <TabsTrigger value="logs">Nhật ký gửi tin</TabsTrigger>
          <TabsTrigger value="automation">Thông báo tự động</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const StatIcon = statIconMap[stat.icon];

              return (
                <Card key={stat.label} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.label}
                        </p>
                        <p className={`mt-1 text-3xl font-bold ${stat.color}`}>
                          {stat.value}
                        </p>
                      </div>
                      <div
                        className={`rounded-xl bg-muted/50 p-3 ${stat.color}`}
                      >
                        <StatIcon className="h-6 w-6" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Mẫu thông báo
            </h3>

            {templates.length > 0 ? (
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:flex sm:w-auto">
                  <TabsTrigger value="all" className="flex-1 px-8">
                    Tất cả
                  </TabsTrigger>
                  <TabsTrigger value="zalo" className="flex-1 px-8">
                    Zalo ZNS
                  </TabsTrigger>
                  <TabsTrigger value="sms" className="flex-1 px-8">
                    SMS
                  </TabsTrigger>
                  <TabsTrigger value="email" className="flex-1 px-8">
                    Email
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  <TabsContent value="all" className="mt-0">
                    <TemplateList
                      templates={filterTemplatesByChannel(templates, "all")}
                      onSend={handleSendTemplate}
                    />
                  </TabsContent>
                  <TabsContent value="zalo" className="mt-0">
                    <TemplateList
                      templates={filterTemplatesByChannel(templates, "zalo")}
                      onSend={handleSendTemplate}
                    />
                  </TabsContent>
                  <TabsContent value="sms" className="mt-0">
                    <TemplateList
                      templates={filterTemplatesByChannel(templates, "sms")}
                      onSend={handleSendTemplate}
                    />
                  </TabsContent>
                  <TabsContent value="email" className="mt-0">
                    <TemplateList
                      templates={filterTemplatesByChannel(templates, "email")}
                      onSend={handleSendTemplate}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            ) : (
              <EmptyPanel
                title="Chưa có mẫu"
                description="Thêm mẫu thông báo để gửi nhanh cho khách thuê."
              />
            )}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            Nhật ký gửi tin
          </h3>

          <FilterToolbar
            searchFields={[
              {
                id: "search-communication",
                placeholder: "Tìm kiếm khách...",
                value: searchTenant,
                onChange: setSearchTenant,
              },
            ]}
            controls={
              <div className="flex flex-wrap items-center gap-2">
                <Select value={filterChannel} onValueChange={setFilterChannel}>
                  <SelectTrigger className="h-8 w-[140px] bg-background">
                    <SelectValue placeholder="Kênh" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả kênh</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="zalo">Zalo</SelectItem>
                    <SelectItem value="in_app">Trong ứng dụng</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="h-8 w-[140px] bg-background">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả trạng thái</SelectItem>
                    <SelectItem value="sent">Đã gửi</SelectItem>
                    <SelectItem value="pending">Chờ gửi</SelectItem>
                    <SelectItem value="failed">Thất bại</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            }
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearLogFilters}
          />

          <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            {filteredLogs.length > 0 ? (
              <SendLogTable logs={filteredLogs} />
            ) : (
              <div className="p-8">
                <EmptyPanel
                  title="Không có nhật ký phù hợp"
                  description="Thử đổi bộ lọc hoặc từ khóa tìm kiếm."
                  action={{
                    label: "Xóa bộ lọc",
                    onClick: clearLogFilters,
                  }}
                />
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cấu hình gửi thông báo tự động</CardTitle>
              <CardDescription>
                Thiết lập các sự kiện để hệ thống tự động gửi tin cho khách thuê
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5">
                  <p className="font-medium text-sm">Nhắc nợ hóa đơn</p>
                  <p className="text-xs text-muted-foreground">
                    Tự động gửi tin khi có hóa đơn mới (Kênh Zalo)
                  </p>
                </div>
                <Switch checked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="space-y-0.5">
                  <p className="font-medium text-sm">Hết hạn hợp đồng</p>
                  <p className="text-xs text-muted-foreground">
                    Gửi tin trước 30 ngày khi hợp đồng sắp hết hạn
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
