import { Copy, Eye } from "lucide-react";

import { EntityActionMenu } from "@/components/shared/actions";
import { routePathBuilders } from "@/config/routes";
import type { Contract } from "@/types/contract";

interface ContractRowActionsProps {
  contract: Contract;
  side?: "top" | "bottom" | "left" | "right";
}

export const ContractRowActions = ({
  contract,
  side = "bottom",
}: ContractRowActionsProps) => {
  return (
    <EntityActionMenu
      sideContent={side}
      items={[
        {
          key: "copy",
          label: "Sao chép ID",
          icon: <Copy className="mr-2 h-3.5 w-3.5" />,
          onClick: () => navigator.clipboard.writeText(contract.id),
        },
        {
          key: "detail",
          label: "Xem chi tiết",
          icon: <Eye className="mr-2 h-3.5 w-3.5" />,
          link: routePathBuilders.contractDetail(contract.id),
        },
      ]}
    />
  );
};
