import { Calendar, DoorOpen, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routePathBuilders } from "@/config/routes";
import type { Invoice } from "@/types/invoice";
import { formatCurrency } from "@/utils/currency";

import { invoiceStatusConfig } from "../domain/invoice-display-config";

interface InvoiceCardProps {
  invoice: Invoice;
}

export const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
  const navigate = useNavigate();
  const statusCfg = invoiceStatusConfig[invoice.status];

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary/60 via-primary to-primary/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <CardHeader className="pb-0">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-sm font-semibold leading-tight text-foreground">
              {invoice.invoiceNumber}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {invoice.month}
            </p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                className="opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 data-[state=open]:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() =>
                    navigate(routePathBuilders.invoiceDetail(invoice.id))
                  }
                >
                  Xem chi tiết
                </DropdownMenuItem>
                <DropdownMenuItem>Tải về PDF</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-3">
        <Badge variant="outline" className={statusCfg.className}>
          {statusCfg.label}
        </Badge>

        <div className="space-y-2 rounded-lg bg-muted/50 p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Khách thuê
            </span>
            <span className="text-sm font-medium">{invoice.tenant}</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Phòng
            </span>
            <div className="flex items-center gap-1.5">
              <DoorOpen className="h-3 w-3" />
              <span className="text-sm font-medium">{invoice.room}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 rounded-lg bg-primary/5 p-2.5 sm:grid-cols-2">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
              Số tiền
            </p>
            <p className="mt-0.5 text-sm font-bold tabular-nums text-foreground">
              {formatCurrency(invoice.amount)}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
              Hạn thanh toán
            </p>
            <p className="mt-0.5 text-sm font-medium tabular-nums text-muted-foreground">
              {invoice.dueDate}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="text-xs text-muted-foreground">
        <Calendar className="mr-1.5 h-3 w-3" />
        <span>Cập nhật: {invoice.lastUpdated}</span>
      </CardFooter>
    </Card>
  );
};
