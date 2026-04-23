import { useState } from "react";

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
import { getTemplates, getSendLogs } from "../data/communications.mock";

import type { NotificationTemplate } from "../data/communications.mock";

export const CommunicationsPage = () => {
  const templates = getTemplates();
  const sendLogs = getSendLogs();
  const [filterChannel, setFilterChannel] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTenant, setSearchTenant] = useState("");

  const filteredLogs = sendLogs.filter((log) => {
    if (filterChannel !== "all" && log.channel !== filterChannel) return false;
    if (filterStatus !== "all" && log.status !== filterStatus) return false;
    if (
      searchTenant &&
      !log.tenant.toLowerCase().includes(searchTenant.toLowerCase())
    )
      return false;
    return true;
  });

  const handleSendTemplate = (template: NotificationTemplate) => {
    console.log("Sending template:", template.name);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Liên lạc</h1>
          <p className="mt-2 text-muted-foreground">
            Gửi thông báo cho khách thuê qua nhiều kênh.
          </p>
        </div>
      </div>

      {/* Templates Section */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Mẫu thông báo</h2>
        <TemplateList templates={templates} onSend={handleSendTemplate} />
      </div>

      {/* Send Log Section */}
      <div>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">
              Tìm kiếm khách
            </label>
            <Input
              placeholder="Nhập tên khách thuê..."
              value={searchTenant}
              onChange={(e) => setSearchTenant(e.target.value)}
            />
          </div>
          <div className="min-w-40">
            <label className="text-sm font-medium mb-2 block">Kênh</label>
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
            <label className="text-sm font-medium mb-2 block">Trạng thái</label>
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

        <SendLogTable logs={filteredLogs} />
      </div>

      {/* Statistics */}
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
