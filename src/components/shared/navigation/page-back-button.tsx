import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

interface PageBackButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
}

export const PageBackButton = ({
  onClick,
  label = "Quay lại",
  className,
}: PageBackButtonProps) => {
  return (
    <Button variant="ghost" onClick={onClick} className={className ?? "gap-2"}>
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  );
};
