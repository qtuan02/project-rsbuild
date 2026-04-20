import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="tab1">Phong</TabsTrigger>
        <TabsTrigger value="tab2">Nguoi thue</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-muted-foreground text-sm">Noi dung tab phong.</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-muted-foreground text-sm">
          Noi dung tab nguoi thue.
        </p>
        <Button size="sm" className="mt-2">
          Them
        </Button>
      </TabsContent>
    </Tabs>
  ),
};
