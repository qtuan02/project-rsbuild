import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

import type { ReactNode } from "react";

interface EntityListCardProps {
  accentClassName?: string;
  header: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const EntityListCard = ({
  accentClassName = "from-primary/60 via-primary to-primary/60",
  header,
  content,
  footer,
  className,
  onClick,
}: EntityListCardProps) => {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5",
        className,
      )}
      onClick={onClick}
    >
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1 bg-linear-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          accentClassName,
        )}
      />
      {header}
      {content}
      {footer}
    </Card>
  );
};
