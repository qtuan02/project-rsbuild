import { Badge } from '@/components/ui/badge';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'destructive',
        'outline',
        'ghost',
        'link',
      ],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Qua han',
    variant: 'destructive',
  },
};
