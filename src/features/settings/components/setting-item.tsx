import type { Setting } from "@/types/setting";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/cn";
import { formatCurrency } from "@/utils/currency";

interface SettingItemProps {
  setting: Setting;
}

export const SettingItem = ({ setting }: SettingItemProps) => {
  const renderValue = (value: string | number | boolean, type: Setting["type"]) => {
    switch (type) {
      case "number":
        // Check if it looks like a currency amount (value > 100)
        if (typeof value === "number" && value > 100) {
          return formatCurrency(value);
        }
        return String(value);
      case "toggle":
        return (
          <Badge
            variant="outline"
            className={cn(
              "font-medium",
              value
                ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800"
                : "border-slate-300 bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:border-slate-800",
            )}
          >
            {value ? "Bật" : "Tắt"}
          </Badge>
        );
      default:
        return String(value);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg bg-muted/30 px-4 py-3">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-foreground">{setting.label}</h4>
        {setting.description && (
          <p className="mt-0.5 text-xs text-muted-foreground">
            {setting.description}
          </p>
        )}
        <p className="mt-1.5 text-xs text-muted-foreground/70">
          Cập nhật: {setting.updated}
        </p>
      </div>
      <div className="ml-4 text-right">
        <p className="max-w-xs truncate text-sm font-medium">
          {renderValue(setting.value, setting.type)}
        </p>
      </div>
    </div>
  );
};
