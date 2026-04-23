import { ScanLine, Upload, CheckCircle2, Loader2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AddTenantDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanSuccess, setScanSuccess] = useState(false);

  // Mock data that gets filled after scanning
  const [formData, setFormData] = useState({
    fullName: "",
    idCard: "",
    dob: "",
    address: "",
  });

  const handleScan = () => {
    setIsScanning(true);
    // Simulate OCR scanning delay
    setTimeout(() => {
      setIsScanning(false);
      setScanSuccess(true);
      setFormData({
        fullName: "NGUYỄN VĂN A",
        idCard: "012345678912",
        dob: "01/01/1990",
        address: "Quận 1, TP. Hồ Chí Minh",
      });
    }, 2000);
  };

  const resetForm = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => {
        setIsScanning(false);
        setScanSuccess(false);
        setFormData({ fullName: "", idCard: "", dob: "", address: "" });
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={resetForm}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thêm khách thuê mới</DialogTitle>
          <DialogDescription>
            Điền thông tin khách thuê hoặc quét Căn cước công dân (CCCD) để nhập
            tự động.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="scan" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scan">Quét CCCD (OCR)</TabsTrigger>
            <TabsTrigger value="manual">Nhập thủ công</TabsTrigger>
          </TabsList>

          <TabsContent value="scan" className="space-y-4 pt-4">
            {!scanSuccess ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center bg-muted/50">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  {isScanning ? (
                    <Loader2 className="h-6 w-6 text-primary animate-spin" />
                  ) : (
                    <ScanLine className="h-6 w-6 text-primary" />
                  )}
                </div>
                <h3 className="mb-1 font-semibold">
                  {isScanning
                    ? "Đang xử lý hình ảnh..."
                    : "Tải lên ảnh CCCD mặt trước"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Hệ thống AI sẽ tự động trích xuất thông tin từ ảnh.
                </p>
                <Button onClick={handleScan} disabled={isScanning}>
                  <Upload className="mr-2 h-4 w-4" />
                  Chọn ảnh (Giả lập)
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-900">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    Trích xuất thành công! Vui lòng kiểm tra lại thông tin.
                  </span>
                </div>
                <div className="grid gap-3">
                  <div className="grid gap-1">
                    <Label>Họ và tên</Label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-1">
                      <Label>Số CCCD</Label>
                      <Input
                        value={formData.idCard}
                        onChange={(e) =>
                          setFormData({ ...formData, idCard: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-1">
                      <Label>Ngày sinh</Label>
                      <Input
                        value={formData.dob}
                        onChange={(e) =>
                          setFormData({ ...formData, dob: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <Label>Quê quán</Label>
                    <Input
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="manual" className="space-y-4 pt-4">
            <div className="grid gap-3">
              <div className="grid gap-1">
                <Label htmlFor="name">Họ và tên</Label>
                <Input id="name" placeholder="Nguyễn Văn A" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" placeholder="0901234567" />
                </div>
                <div className="grid gap-1">
                  <Label htmlFor="cccd">Số CCCD</Label>
                  <Input id="cccd" placeholder="012345678912" />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button onClick={() => setOpen(false)}>Lưu thông tin</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
