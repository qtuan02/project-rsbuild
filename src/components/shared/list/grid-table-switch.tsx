import { LayoutGrid, List } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GridTableSwitchProps {
  resultLabel: string;
  isFiltering: boolean;
}

export const GridTableSwitch = ({
  resultLabel,
  isFiltering,
}: GridTableSwitchProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LayoutGrid className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground font-medium">
          {resultLabel}
        </span>
        {isFiltering && (
          <Badge variant="secondary" className="text-[10px]">
            Đang lọc
          </Badge>
        )}
      </div>
      <TabsList className="bg-muted/50">
        <TabsTrigger value="grid" className="gap-2">
          <LayoutGrid className="h-4 w-4" />
          <span className="hidden sm:inline">Dạng thẻ</span>
        </TabsTrigger>
        <TabsTrigger value="table" className="gap-2">
          <List className="h-4 w-4" />
          <span className="hidden sm:inline">Dạng bảng</span>
        </TabsTrigger>
      </TabsList>
    </div>
  );
};
