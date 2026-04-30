import { MoreHorizontal } from "lucide-react";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EntityActionMenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  link?: string;
  onClick?: () => void;
  destructive?: boolean;
}

interface EntityActionMenuProps {
  items: EntityActionMenuItem[];
  hasLabel?: boolean;
  labelText?: string;
  sideContent?: "top" | "bottom" | "left" | "right";
  contentClassName?: string;
}

export const EntityActionMenu: React.FC<EntityActionMenuProps> = (props) => {
  const {
    items,
    hasLabel = true,
    labelText = "Thao tác",
    sideContent = "bottom",
    contentClassName = "w-44",
  } = props;

  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon-sm" className="cursor-pointer">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side={sideContent}
        className={contentClassName}
      >
        {hasLabel && (
          <>
            <DropdownMenuLabel>{labelText}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup>
          {items.map((item) => (
            <DropdownMenuItem
              key={item.key}
              onClick={() => {
                if (item.link) {
                  navigate(item.link);
                  return;
                }
                if (item.onClick) {
                  item.onClick();
                  return;
                }
                console.log("No action");
              }}
              className={item.destructive ? "text-destructive" : undefined}
            >
              {item.icon}
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
