import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface ErrorPanelProps {
  title?: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const ErrorPanel = ({
  title = "Lỗi",
  description,
  action,
  className,
}: ErrorPanelProps) => {
  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>{description}</p>
        {action && (
          <Button
            variant="outline"
            size="sm"
            onClick={action.onClick}
            className="mt-2 h-7"
          >
            {action.label}
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
};
