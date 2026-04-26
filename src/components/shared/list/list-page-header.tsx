import { Button } from "@/components/ui/button";

import type { ReactNode } from "react";

interface ListPageHeaderAction {
  key: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline";
  node?: ReactNode;
}

interface ListPageHeaderProps {
  title: string;
  description: string;
  actions?: ListPageHeaderAction[];
}

export const ListPageHeader = ({
  title,
  description,
  actions = [],
}: ListPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        {actions.map((action) => (
          <div key={action.key}>
            {action.node ?? (
              <Button
                variant={action.variant ?? "default"}
                size="sm"
                className="w-full sm:w-auto"
                onClick={action.onClick}
              >
                {action.icon}
                {action.label}
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
