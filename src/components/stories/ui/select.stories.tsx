import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="story-floor">Tang</Label>
      <Select defaultValue="1">
        <SelectTrigger id="story-floor" className="w-full">
          <SelectValue placeholder="Chon tang" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Tang 1</SelectItem>
          <SelectItem value="2">Tang 2</SelectItem>
          <SelectItem value="3">Tang 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};
