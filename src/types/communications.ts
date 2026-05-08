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
