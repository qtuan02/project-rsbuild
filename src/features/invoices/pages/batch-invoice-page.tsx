import { zodResolver } from "@hookform/resolvers/zod";
import { FileCheck, Send } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils/currency";

import {
  getInvoiceTotal,
  getUtilitySubtotal,
} from "../domain/invoice-calculations";
import { useBatchInvoiceSelection } from "../hooks/use-batch-invoice-selection";

const mockInvoices = [
  {
    id: "1",
    room: "101",
    tenant: "Nguyễn Văn A",
    rent: 3000000,
    electricity: 350000,
    water: 60000,
    service: 100000,
  },
  {
    id: "2",
    room: "102",
    tenant: "Trần Thị B",
    rent: 3000000,
    electricity: 420000,
    water: 80000,
    service: 100000,
  },
  {
    id: "3",
    room: "103",
    tenant: "Lê Văn C",
    rent: 2500000,
    electricity: 210000,
    water: 40000,
    service: 100000,
  },
];

const batchInvoiceSchema = z.object({
  selectedInvoiceIds: z
    .array(z.string())
    .min(1, "Vui lòng chọn ít nhất một hóa đơn"),
});

type BatchInvoiceValues = z.infer<typeof batchInvoiceSchema>;

export const BatchInvoicePage = () => {
  const form = useForm<BatchInvoiceValues>({
    resolver: zodResolver(batchInvoiceSchema),
    defaultValues: {
      selectedInvoiceIds: mockInvoices.map((item) => item.id),
    },
  });

  const selectedInvoices = useWatch({
    control: form.control,
    name: "selectedInvoiceIds",
  });
  const { isAllSelected, toggleSelect, toggleSelectAll } =
    useBatchInvoiceSelection(
      selectedInvoices,
      mockInvoices.map((item) => item.id),
      (next) => form.setValue("selectedInvoiceIds", next),
    );

  const handleSubmit = (_values: BatchInvoiceValues) => {
    // TODO: connect API send batch invoices.
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Tạo hóa đơn hàng loạt
            </h2>
            <p className="text-muted-foreground">Kỳ hóa đơn: Tháng 10/2023</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileCheck className="mr-2 h-4 w-4" />
              Xem trước tất cả
            </Button>
            <Button type="submit">
              <Send className="mr-2 h-4 w-4" />
              Tạo & Gửi {selectedInvoices.length} hóa đơn
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Xem trước danh sách hóa đơn</CardTitle>
            <CardDescription>
              Kiểm tra lại số tiền trước khi tạo chính thức
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Phòng</TableHead>
                  <TableHead>Khách thuê</TableHead>
                  <TableHead>Tiền phòng</TableHead>
                  <TableHead>Điện & Nước</TableHead>
                  <TableHead>Dịch vụ</TableHead>
                  <TableHead className="text-right">Tổng cộng</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockInvoices.map((item) => {
                  const total = getInvoiceTotal(item);
                  return (
                    <TableRow key={item.id}>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name="selectedInvoiceIds"
                          render={() => (
                            <FormItem>
                              <FormControl>
                                <Checkbox
                                  checked={selectedInvoices.includes(item.id)}
                                  onCheckedChange={() => toggleSelect(item.id)}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{item.room}</TableCell>
                      <TableCell>{item.tenant}</TableCell>
                      <TableCell>{formatCurrency(item.rent)}</TableCell>
                      <TableCell>
                        {formatCurrency(getUtilitySubtotal(item))}
                      </TableCell>
                      <TableCell>{formatCurrency(item.service)}</TableCell>
                      <TableCell className="text-right font-bold">
                        {formatCurrency(total)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};
