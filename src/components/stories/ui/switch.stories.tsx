import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="story-airplane" />
      <Label htmlFor="story-airplane">Che do may bay</Label>
    </div>
  ),
};
