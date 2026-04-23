import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

import type { UtilityStatus } from "@/types/utility";

interface UtilityStatusUiConfig {
  badgeClassName: string;
  Icon: typeof Clock;
}

export const utilityStatusUiConfig: Record<
  UtilityStatus,
  UtilityStatusUiConfig
> = {
  draft: {
    badgeClassName:
      "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
    Icon: Clock,
  },
  verified: {
    badgeClassName:
      "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200",
    Icon: CheckCircle2,
  },
  anomaly: {
    badgeClassName: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200",
    Icon: AlertCircle,
  },
};
