import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { NotificationTemplate } from "../data/communications.mock";

interface TemplateListProps {
  templates: NotificationTemplate[];
  onSend?: (template: NotificationTemplate) => void;
}

export const TemplateList = ({ templates, onSend }: TemplateListProps) => {
  const [sentTemplate, setSentTemplate] = useState<string | null>(null);

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "sms":
        return <MessageSquare className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      case "zalo":
        return <Send className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getChannelBadge = (channel: string) => {
    const colors: Record<string, string> = {
      sms: "bg-blue-100 text-blue-800",
      email: "bg-purple-100 text-purple-800",
      zalo: "bg-cyan-100 text-cyan-800",
      in_app: "bg-green-100 text-green-800",
    };
    return colors[channel] || "bg-gray-100 text-gray-800";
  };

  const handleSend = (template: NotificationTemplate) => {
    setSentTemplate(template.id);
    onSend?.(template);
    setTimeout(() => setSentTemplate(null), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Mẫu thông báo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {templates.map((template) => (
            <div
              key={template.id}
              className="rounded-lg border p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{template.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {template.description}
                  </p>
                </div>
                <Badge
                  className={getChannelBadge(template.channel)}
                  variant="secondary"
                >
                  {getChannelIcon(template.channel)}
                  <span className="ml-1 capitalize">{template.channel}</span>
                </Badge>
              </div>

              <div className="bg-muted p-3 rounded mb-3 text-xs text-muted-foreground">
                {template.preview}
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSend(template)}
                disabled={sentTemplate === template.id}
                className="w-full"
              >
                {sentTemplate === template.id ? "Đã gửi!" : "Gửi"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
