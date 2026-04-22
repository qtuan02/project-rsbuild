import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Sheet",
  component: Sheet,
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Right: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Mo sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Bo loc</SheetTitle>
          <SheetDescription>Chinh sua bo loc danh sach phong.</SheetDescription>
        </SheetHeader>
        <p className="text-muted-foreground text-sm">Noi dung sheet.</p>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Sheet duoi</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Chi tiet</SheetTitle>
          <SheetDescription>Panel keo tu duoi len.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};
