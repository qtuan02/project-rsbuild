import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Mo hop thoai</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xac nhan</DialogTitle>
          <DialogDescription>
            Hanh dong nay khong the hoan tac. Ban co chac khong?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Luu</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
