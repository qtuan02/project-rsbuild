import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const InfoCard = ({
  title,
  icon,
  children,
  className,
}: InfoCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">{children}</CardContent>
    </Card>
  );
};

interface InfoRowProps {
  label: string;
  value: string | number | ReactNode;
  highlight?: boolean;
}

export const InfoRow = ({ label, value, highlight = false }: InfoRowProps) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`text-sm font-medium ${highlight ? "text-foreground font-semibold" : "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
};
