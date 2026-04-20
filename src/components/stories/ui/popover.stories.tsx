import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI/Popover',
  component: Popover,
  tags: ['autodocs'],
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Mo popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="story-width">Chieu rong (m)</Label>
            <Input id="story-width" defaultValue="4.2" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
