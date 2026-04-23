import { Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/cn";

import type { NotificationTemplate } from "../data/communications.mock";

interface TemplateListProps {
  templates: NotificationTemplate[];
  onSend?: (template: NotificationTemplate) => void;
}

export const TemplateList = ({ templates, onSend }: TemplateListProps) => {
  const [sentTemplate, setSentTemplate] = useState<string | null>(null);

  const getChannelConfig = (channel: string) => {
    switch (channel) {
      case "sms":
        return {
          icon: MessageSquare,
          color: "text-blue-600",
          bg: "bg-blue-100 dark:bg-blue-900/30",
          label: "SMS",
        };
      case "email":
        return {
          icon: Mail,
          color: "text-purple-600",
          bg: "bg-purple-100 dark:bg-purple-900/30",
          label: "Email",
        };
      case "zalo":
        return {
          icon: Send,
          color: "text-cyan-600",
          bg: "bg-cyan-100 dark:bg-cyan-900/30",
          label: "Zalo",
        };
      default:
        return {
          icon: MessageSquare,
          color: "text-gray-600",
          bg: "bg-gray-100",
          label: "Hệ thống",
        };
    }
  };

  const handleSend = (template: NotificationTemplate) => {
    setSentTemplate(template.id);
    onSend?.(template);
    setTimeout(() => setSentTemplate(null), 2000);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => {
        const config = getChannelConfig(template.channel);
        const Icon = config.icon;
        const isSent = sentTemplate === template.id;

        return (
          <Card
            key={template.id}
            className="group relative overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md border-muted"
          >
            <div
              className={cn(
                "absolute inset-x-0 top-0 h-1 opacity-0 transition-opacity group-hover:opacity-100",
                config.bg.replace("bg-", "bg-").split(" ")[0],
              )}
            />

            <CardHeader className="p-4 pb-2">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <CardTitle className="text-sm font-bold truncate group-hover:text-primary transition-colors">
                    {template.name}
                  </CardTitle>
                  <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">
                    {template.description}
                  </p>
                </div>
                <div
                  className={cn(
                    "shrink-0 rounded-lg p-1.5",
                    config.bg,
                    config.color,
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 pt-2 flex-1">
              <div className="bg-muted/50 rounded-xl p-3 text-[11px] text-muted-foreground font-mono leading-relaxed ring-1 ring-inset ring-border/50">
                {template.preview}
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
              <Button
                size="sm"
                variant={isSent ? "secondary" : "default"}
                onClick={() => handleSend(template)}
                disabled={isSent}
                className="w-full h-9 rounded-lg transition-all"
              >
                {isSent ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" />
                    Đã gửi!
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-3.5 w-3.5" />
                    Gửi ngay
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
