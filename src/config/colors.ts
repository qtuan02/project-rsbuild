import { cn } from "@/libs/cn";

export const STATUS_COLORS = {
  success: {
    bg: cn("bg-emerald-50 dark:bg-emerald-950/50"),
    text: cn("text-emerald-700 dark:text-emerald-300"),
    border: cn("border-emerald-200 dark:border-emerald-800"),
    accent: cn("bg-emerald-500"),
  },
  warning: {
    bg: cn("bg-amber-50 dark:bg-amber-950"),
    text: cn("text-amber-700 dark:text-amber-300"),
    border: cn("border-amber-300 dark:border-amber-800"),
    accent: cn("bg-amber-500"),
  },
  error: {
    bg: cn("bg-red-50 dark:bg-red-950"),
    text: cn("text-red-700 dark:text-red-300"),
    border: cn("border-red-300 dark:border-red-800"),
    accent: cn("bg-red-500"),
  },
  info: {
    bg: cn("bg-blue-50 dark:bg-blue-950"),
    text: cn("text-blue-700 dark:text-blue-300"),
    border: cn("border-blue-300 dark:border-blue-800"),
    accent: cn("bg-blue-500"),
  },
  neutral: {
    bg: cn("bg-zinc-50 dark:bg-zinc-900/50"),
    text: cn("text-zinc-500 dark:text-zinc-400"),
    border: cn("border-zinc-200 dark:border-zinc-700"),
    accent: cn("bg-zinc-500"),
  },
  neutral2: {
    bg: cn("bg-slate-50 dark:bg-slate-950"),
    text: cn("text-slate-700 dark:text-slate-300"),
    border: cn("border-slate-300 dark:border-slate-800"),
    accent: cn("bg-slate-500"),
  },
} as const;

export const TYPE_COLORS = {
  electricity: {
    text: cn("text-amber-600 dark:text-amber-400"),
    bg: cn("bg-amber-100 dark:bg-amber-900/30"),
    accent: cn("bg-amber-500"),
  },
  water: {
    text: cn("text-blue-600 dark:text-blue-400"),
    bg: cn("bg-blue-100 dark:bg-blue-900/30"),
    accent: cn("bg-blue-500"),
  },
} as const;

export function getStatusClassName(status: keyof typeof STATUS_COLORS): string {
  const colors = STATUS_COLORS[status];
  return `${colors.bg} ${colors.text} ${colors.border}`;
}

export function getStatusColor(
  status: keyof typeof STATUS_COLORS,
  part: "bg" | "text" | "border" | "accent",
): string {
  return STATUS_COLORS[status][part];
}
