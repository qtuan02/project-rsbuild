import { Separator } from '@/components/ui/separator';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI/Separator',
  component: Separator,
  tags: ['autodocs'],
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">Phan 1</h4>
        <p className="text-muted-foreground text-sm">Noi dung tren.</p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-medium">Phan 2</h4>
        <p className="text-muted-foreground text-sm">Noi dung duoi.</p>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-12 items-center gap-4">
      <span className="text-sm">Trai</span>
      <Separator orientation="vertical" />
      <span className="text-sm">Phai</span>
    </div>
  ),
};
