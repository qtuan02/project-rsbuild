import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const tierSchema = z.object({
  from: z.string(),
  to: z.string().nullable(),
  price: z.string().min(1, "Đơn giá là bắt buộc"),
});

const electricityTierSchema = z.object({
  useVat: z.boolean(),
  tiers: z.array(tierSchema).min(1),
});

type ElectricityTierFormValues = z.infer<typeof electricityTierSchema>;

export const ElectricityTierConfig = () => {
  const form = useForm<ElectricityTierFormValues>({
    resolver: zodResolver(electricityTierSchema),
    defaultValues: {
      useVat: true,
      tiers: [
        { from: "0", to: "50", price: "1678" },
        { from: "51", to: "100", price: "1734" },
        { from: "101", to: "200", price: "2014" },
        { from: "201", to: "300", price: "2536" },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tiers",
  });

  const addTier = () => {
    const tiers = form.getValues("tiers");
    const lastTier = tiers[tiers.length - 1];
    const from = Number.parseInt(lastTier?.to ?? "0", 10) + 1;
    append({ from: String(from), to: null, price: "0" });
  };

  return (
    <Form {...form}>
      <Card>
        <CardHeader>
          <CardTitle>Cấu hình điện bậc thang</CardTitle>
          <CardDescription>
            Thiết lập đơn giá điện theo định mức tiêu thụ
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="useVat"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Áp dụng VAT (10%)</FormLabel>
                  <p className="text-xs text-muted-foreground">
                    Tự động cộng thêm 10% vào tổng tiền điện
                  </p>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 px-2 text-xs font-semibold uppercase text-muted-foreground">
              <span>Từ (kWh)</span>
              <span>Đến (kWh)</span>
              <span>Đơn giá (đ)</span>
              <span className="text-right">Thao tác</span>
            </div>

            {fields.map((tier, index) => (
              <div
                key={tier.id}
                className="grid grid-cols-4 items-center gap-4"
              >
                <FormField
                  control={form.control}
                  name={`tiers.${index}.from`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`tiers.${index}.to`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="∞"
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.value || null)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`tiers.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              className="w-full border-dashed"
              onClick={addTier}
              type="button"
            >
              <Plus className="mr-2 h-4 w-4" />
              Thêm bậc thang
            </Button>
          </div>
        </CardContent>
      </Card>
    </Form>
  );
};
