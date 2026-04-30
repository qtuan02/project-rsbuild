import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/libs/cn";

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
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onClick={onClick ? onClick : () => navigate(-1)}
      className={cn("cursor-pointer gap-2", className)}
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </Button>
  );
};
