import { QrCode, Download, Share2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatCurrency } from "@/utils/currency";

interface VietQRDialogProps {
  children: React.ReactNode;
  amount: number;
  invoiceNumber: string;
}

export const VietQRDialog = ({
  children,
  amount,
  invoiceNumber,
}: VietQRDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Mã thanh toán VietQR</DialogTitle>
          <DialogDescription>
            Quét mã QR dưới đây bằng ứng dụng ngân hàng để thanh toán hóa đơn.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center p-6 space-y-4">
          <div className="relative flex h-48 w-48 items-center justify-center rounded-xl border-4 border-primary bg-white shadow-lg">
            {/* Mock QR Code Pattern */}
            <div className="absolute inset-2 grid grid-cols-5 grid-rows-5 gap-1 opacity-80">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className={`bg-primary ${(i * 7) % 10 > 3 ? "opacity-100" : "opacity-0"}`}
                  style={{
                    borderRadius: i % 2 === 0 ? "2px" : "0",
                  }}
                />
              ))}
            </div>
            {/* Center Logo/Icon */}
            <div className="absolute flex h-12 w-12 items-center justify-center rounded-lg bg-white p-1 shadow-sm border">
              <QrCode className="h-8 w-8 text-primary" />
            </div>
          </div>

          <div className="text-center space-y-1 mt-4 w-full">
            <p className="text-sm font-medium text-muted-foreground">
              Số tiền thanh toán
            </p>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(amount)}
            </p>
            <p className="text-xs text-muted-foreground pt-2">
              Nội dung:{" "}
              <span className="font-mono bg-muted px-1 py-0.5 rounded">
                Thanh toan {invoiceNumber}
              </span>
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Share2 className="mr-2 h-4 w-4" />
            Chia sẻ
          </Button>
          <Button className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Lưu ảnh QR
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
