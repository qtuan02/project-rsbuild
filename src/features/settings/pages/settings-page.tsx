import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

import { SettingGroup } from "../components/setting-group";
import { useSettings } from "../hooks/use-settings";

export const SettingsPage = () => {
  const { settingsByCategory, categoryOrder } = useSettings();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Cài đặt hệ thống
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Quản lý các cấu hình và thông tin cơ bản của hệ thống quản lý trọ.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <RotateCcw className="mr-2 h-4 w-4" />
          Khôi phục mặc định
        </Button>
      </div>

      <div className="space-y-4">
        {categoryOrder.map((category) => (
          <SettingGroup
            key={category}
            category={category}
            settings={settingsByCategory[category]}
          />
        ))}
      </div>
    </div>
  );
};
