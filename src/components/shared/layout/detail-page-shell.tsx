import { PageBackButton } from "@/components/shared/navigation";

import type { ReactNode } from "react";

interface DetailPageShellProps {
  onBack?: () => void;
  headerActions?: ReactNode;
  children: ReactNode;
}

export const DetailPageShell = ({
  onBack,
  headerActions,
  children,
}: DetailPageShellProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageBackButton onClick={onBack} />
        {headerActions ? (
          <div className="flex items-center gap-2">{headerActions}</div>
        ) : (
          <div />
        )}
      </div>
      {children}
    </div>
  );
};
