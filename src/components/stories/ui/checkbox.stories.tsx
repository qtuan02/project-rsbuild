import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="story-terms" />
      <Label htmlFor="story-terms">Dong y dieu khoan</Label>
    </div>
  ),
};
