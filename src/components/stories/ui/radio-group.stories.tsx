import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="a" className="grid gap-3">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="a" id="r-a" />
        <Label htmlFor="r-a">Tuy chon A</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="b" id="r-b" />
        <Label htmlFor="r-b">Tuy chon B</Label>
      </div>
    </RadioGroup>
  ),
};
