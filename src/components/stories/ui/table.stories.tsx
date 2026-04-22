import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>Danh sach phong (mau).</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Ten</TableHead>
          <TableHead className="text-right">Gia</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Phong 101</TableCell>
          <TableCell className="text-right">3.000.000</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Phong 102</TableCell>
          <TableCell className="text-right">3.500.000</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
