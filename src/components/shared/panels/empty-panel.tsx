import { Button } from "@/components/ui/button";

import type { LucideIcon } from "lucide-react";

interface EmptyPanelProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyPanel = ({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyPanelProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl border border-dashed bg-card/50 p-16 text-center ${className || ""}`}
    >
      {Icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
          <Icon className="h-6 w-6 text-muted-foreground" />
        </div>
      )}
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      {description && (
        <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {action && (
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
};
