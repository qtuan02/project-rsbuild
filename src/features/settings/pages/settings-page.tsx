import { BarChart3, MessageSquare, RotateCcw, Shield } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { routes } from "@/config/routes";

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

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tuân thủ & liên lạc</CardTitle>
          <CardDescription>
            Truy cập nhanh các màn hình hệ thống liên quan đến tuân thủ và gửi
            thông báo.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={routes.compliance} className="gap-2">
              <Shield className="h-4 w-4" />
              Tuân thủ
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to={routes.communications} className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Liên lạc
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to={routes.reports} className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Báo cáo
            </Link>
          </Button>
        </CardContent>
      </Card>

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
