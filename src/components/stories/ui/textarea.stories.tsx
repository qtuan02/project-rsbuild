import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="grid w-full max-w-md gap-2">
      <Label htmlFor="story-note">Ghi chu</Label>
      <Textarea id="story-note" placeholder="Nhap ghi chu..." rows={4} />
    </div>
  ),
};
