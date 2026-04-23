export interface NotificationTemplate {
  id: string;
  name: string;
  channel: "sms" | "email" | "zalo" | "in_app";
  description: string;
  preview: string;
}

export interface SendLog {
  id: string;
  tenant: string;
  template: string;
  channel: "sms" | "email" | "zalo" | "in_app";
  status: "sent" | "failed" | "pending";
  sentDate: string;
  recipient: string;
}

export const mockTemplates: NotificationTemplate[] = [
  {
    id: "T001",
    name: "Thông báo thanh toán",
    channel: "sms",
    description: "Gửi nhắc nhở khách thanh toán tiền thuê",
    preview:
      "Kính gửi khách, hóa đơn tháng này đã sẵn sàng. Vui lòng thanh toán trong 3 ngày.",
  },
  {
    id: "T002",
    name: "Thông báo bảo trì",
    channel: "email",
    description: "Thông báo về công việc bảo trì phòng",
    preview: "Chúng tôi sẽ tiến hành bảo trì phòng vào ngày...",
  },
  {
    id: "T003",
    name: "Thông báo gia hạn hợp đồng",
    channel: "zalo",
    description: "Gửi thông báo về gia hạn hợp đồng",
    preview: "Hợp đồng của bạn sắp hết hạn. Vui lòng liên hệ để gia hạn.",
  },
];

export const mockSendLogs: SendLog[] = [
  {
    id: "SL001",
    tenant: "Nguyễn Văn An",
    template: "Thông báo thanh toán",
    channel: "sms",
    status: "sent",
    sentDate: "22/04/2026",
    recipient: "0912345678",
  },
  {
    id: "SL002",
    tenant: "Trần Thị Bình",
    template: "Thông báo bảo trì",
    channel: "email",
    status: "sent",
    sentDate: "21/04/2026",
    recipient: "binh@email.com",
  },
  {
    id: "SL003",
    tenant: "Lê Văn Chiến",
    template: "Thông báo gia hạn hợp đồng",
    channel: "zalo",
    status: "failed",
    sentDate: "20/04/2026",
    recipient: "0987654321",
  },
];

export const getTemplates = () => mockTemplates;
export const getSendLogs = () => mockSendLogs;
