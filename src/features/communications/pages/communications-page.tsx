import {
  EmptyPanel,
  ErrorPanel,
  LoadingPanel,
} from "@/components/shared/panels";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SendLogTable } from "../components/send-log-table";
import { TemplateList } from "../components/template-list";
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Liên lạc</h1>
          <p className="mt-2 text-muted-foreground">
            Gửi thông báo cho khách thuê qua nhiều kênh.
          </p>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Mẫu thông báo</h2>
        {templates.length > 0 ? (
          <TemplateList templates={templates} onSend={handleSendTemplate} />
        ) : (
          <EmptyPanel
            title="Chưa có mẫu"
            description="Thêm mẫu thông báo để gửi nhanh cho khách thuê."
          />
        )}
      </div>

      <div>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium">
              Tìm kiếm khách
            </label>
            <Input
              placeholder="Nhập tên khách thuê..."
              value={searchTenant}
              onChange={(e) => setSearchTenant(e.target.value)}
            />
          </div>
          <div className="min-w-40">
            <label className="mb-2 block text-sm font-medium">Kênh</label>
            <Select value={filterChannel} onValueChange={setFilterChannel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả kênh</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="zalo">Zalo</SelectItem>
                <SelectItem value="in_app">Trong ứng dụng</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="min-w-40">
            <label className="mb-2 block text-sm font-medium">Trạng thái</label>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="sent">Đã gửi</SelectItem>
                <SelectItem value="pending">Chờ gửi</SelectItem>
                <SelectItem value="failed">Thất bại</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredLogs.length > 0 ? (
          <SendLogTable logs={filteredLogs} />
        ) : (
          <EmptyPanel
            title="Không có nhật ký phù hợp"
            description="Thử đổi bộ lọc hoặc từ khóa tìm kiếm."
            action={{
              label: "Xóa bộ lọc",
              onClick: clearLogFilters,
            }}
          />
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng tin nhắn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sendLogs.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã gửi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {sendLogs.filter((l) => l.status === "sent").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chờ gửi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {sendLogs.filter((l) => l.status === "pending").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thất bại</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {sendLogs.filter((l) => l.status === "failed").length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
