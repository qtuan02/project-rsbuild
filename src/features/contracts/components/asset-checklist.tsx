import { CheckCircle2, Circle, Key, Package } from "lucide-react";
import { useState } from "react";

import { InfoCard } from "@/components/shared/cards/info-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

interface AssetItem {
  id: string;
  name: string;
  quantity: string;
  status: string;
  category: "furniture" | "appliance" | "other";
  checked: boolean;
}

const initialAssets: AssetItem[] = [
  {
    id: "1",
    name: "Chìa khóa phòng",
    quantity: "2 chiếc",
    status: "Mới",
    category: "other",
    checked: true,
  },
  {
    id: "2",
    name: "Điều hòa Panasonic",
    quantity: "1 cái",
    status: "Hoạt động tốt",
    category: "appliance",
    checked: true,
  },
  {
    id: "3",
    name: "Giường gỗ 1m6",
    quantity: "1 bộ",
    status: "Mới 90%",
    category: "furniture",
    checked: true,
  },
  {
    id: "4",
    name: "Tủ quần áo 2 cánh",
    quantity: "1 cái",
    status: "Mới",
    category: "furniture",
    checked: true,
  },
];

export const AssetChecklist = () => {
  const [assets, setAssets] = useState<AssetItem[]>(initialAssets);

  const toggleCheck = (id: string) => {
    setAssets((prev) =>
      prev.map((asset) =>
        asset.id === id ? { ...asset, checked: !asset.checked } : asset,
      ),
    );
  };

  return (
    <InfoCard title="Danh mục tài sản bàn giao">
      <div className="space-y-4">
        <div className="space-y-2">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className={cn(
                "flex items-center justify-between rounded-lg border p-3 transition-colors",
                asset.checked ? "bg-muted/30" : "bg-background",
              )}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleCheck(asset.id)}
                  className="text-primary hover:opacity-80"
                >
                  {asset.checked ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{asset.name}</span>
                    <Badge
                      variant="secondary"
                      className="h-5 px-1.5 text-[10px]"
                    >
                      {asset.quantity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {asset.status}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {asset.category === "furniture" && (
                  <Package className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                {asset.category === "appliance" && (
                  <Key className="h-3.5 w-3.5 text-muted-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <Button variant="outline" size="sm" className="w-full">
            Thêm tài sản mới
          </Button>
          <Button size="sm" className="w-full">
            Ký biên bản bàn giao
          </Button>
        </div>
      </div>
    </InfoCard>
  );
};
