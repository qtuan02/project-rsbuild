import { zodResolver } from "@hookform/resolvers/zod";
import { Calculator, Save } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockRooms = [
  { id: "1", name: "101", lastElectricity: 1250, lastWater: 450 },
  { id: "2", name: "102", lastElectricity: 3400, lastWater: 890 },
  { id: "3", name: "103", lastElectricity: 2100, lastWater: 560 },
  { id: "4", name: "201", lastElectricity: 1560, lastWater: 320 },
  { id: "5", name: "202", lastElectricity: 4200, lastWater: 1100 },
];

const meterRowSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastElectricity: z.number(),
  lastWater: z.number(),
  newElectricity: z.string(),
  newWater: z.string(),
});

const meterInputSchema = z.object({
  rows: z.array(meterRowSchema),
});

type MeterInputValues = z.infer<typeof meterInputSchema>;

export const MeterInputPage = () => {
  const form = useForm<MeterInputValues>({
    resolver: zodResolver(meterInputSchema),
    defaultValues: {
      rows: mockRooms.map((room) => ({
        ...room,
        newElectricity: "",
        newWater: "",
      })),
    },
  });
  const { fields } = useFieldArray({
    control: form.control,
    name: "rows",
  });

  const handleSubmit = (_values: MeterInputValues) => {
    // TODO: connect API for meter saving/calculation.
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Nhập chỉ số điện nước
            </h2>
            <p className="text-muted-foreground">Kỳ hóa đơn: Tháng 10/2023</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" type="submit">
              <Calculator className="mr-2 h-4 w-4" />
              Tính toán hóa đơn
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Lưu chỉ số
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Phòng</TableHead>
                  <TableHead>Chỉ số điện cũ</TableHead>
                  <TableHead>Chỉ số điện mới</TableHead>
                  <TableHead>Chỉ số nước cũ</TableHead>
                  <TableHead>Chỉ số nước mới</TableHead>
                  <TableHead className="text-right">Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.lastElectricity}</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`rows.${index}.newElectricity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                className="w-24"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>{item.lastWater}</TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`rows.${index}.newWater`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                type="number"
                                className="w-24"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline">Chưa nhập</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
};
