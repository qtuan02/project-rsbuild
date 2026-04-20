import { ScrollArea } from '@/components/ui/scroll-area';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
} satisfies Meta<typeof ScrollArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-48 w-72 rounded-md border p-4">
      {Array.from({ length: 20 }).map((_, i) => (
        <p key={i} className="text-sm">
          Dong {i + 1} — noi dung cuon doc.
        </p>
      ))}
    </ScrollArea>
  ),
};
