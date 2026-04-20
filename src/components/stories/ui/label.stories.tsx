import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm gap-2">
      <Label htmlFor="story-email">Email</Label>
      <Input id="story-email" type="email" placeholder="mail@example.com" />
    </div>
  ),
};
