import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Phong tro</CardTitle>
        <CardDescription>Mo ta ngan gon ve phong.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          Noi dung chi tiet o day.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          Xem them
        </Button>
      </CardFooter>
    </Card>
  ),
};
