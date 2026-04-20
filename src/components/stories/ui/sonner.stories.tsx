import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI/Sonner',
  tags: ['autodocs'],
} satisfies Meta<object>;

export default meta;

type Story = StoryObj<typeof meta>;

export const ShowToast: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast('Da luu thanh cong', { description: 'Du lieu da dong bo.' })
        }
      >
        Toast mac dinh
      </Button>
      <Button variant="outline" onClick={() => toast.success('Thanh cong')}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error('Co loi xay ra')}>
        Error
      </Button>
    </div>
  ),
};
