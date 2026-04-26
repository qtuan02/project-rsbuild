import { GridTableSwitch } from "./grid-table-switch";

import type { ReactNode } from "react";

interface ListPageShellProps {
  resultLabel: string;
  isFiltering: boolean;
  toolbar: ReactNode;
  gridContent: ReactNode;
  tableContent: ReactNode;
}

export const ListPageShell = ({
  resultLabel,
  isFiltering,
  toolbar,
  gridContent,
  tableContent,
}: ListPageShellProps) => {
  return (
    <>
      <GridTableSwitch resultLabel={resultLabel} isFiltering={isFiltering} />
      {toolbar}
      {gridContent}
      {tableContent}
    </>
  );
};
