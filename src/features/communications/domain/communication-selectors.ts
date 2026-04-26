import type {
  NotificationTemplate,
  SendLog,
} from "../data/communications.mock";

export interface CommunicationStat {
  label: string;
  value: number;
  color: string;
  icon: "bell" | "send" | "messageSquare" | "mail";
}

export const buildSendLogStats = (sendLogs: SendLog[]): CommunicationStat[] => [
  {
    label: "Tổng tin nhắn",
    value: sendLogs.length,
    color: "text-primary",
    icon: "bell",
  },
  {
    label: "Đã gửi",
    value: sendLogs.filter((log) => log.status === "sent").length,
    color: "text-emerald-600",
    icon: "send",
  },
  {
    label: "Chờ gửi",
    value: sendLogs.filter((log) => log.status === "pending").length,
    color: "text-blue-600",
    icon: "messageSquare",
  },
  {
    label: "Thất bại",
    value: sendLogs.filter((log) => log.status === "failed").length,
    color: "text-red-600",
    icon: "mail",
  },
];

export const filterTemplatesByChannel = (
  templates: NotificationTemplate[],
  channel: "all" | "zalo" | "sms" | "email",
) => {
  if (channel === "all") {
    return templates;
  }

  return templates.filter((template) => template.channel === channel);
};
