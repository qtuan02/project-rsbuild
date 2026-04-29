import { cn } from "@/lib/cn";

export const STATUS_COLORS = {
  success: {
    light: {
      bg: cn("bg-emerald-50"),
      text: cn("text-emerald-700"),
      border: cn("border-emerald-200"),
      accent: cn("bg-emerald-500"),
    },
    dark: {
      bg: cn("dark:bg-emerald-950/50"),
      text: cn("dark:text-emerald-300"),
      border: cn("dark:border-emerald-800"),
      accent: cn("dark:bg-emerald-500"),
    },
  },

  warning: {
    light: {
      bg: cn("bg-amber-50"),
      text: cn("text-amber-700"),
      border: cn("border-amber-300"),
      accent: cn("bg-amber-500"),
    },
    dark: {
      bg: cn("dark:bg-amber-950"),
      text: cn("dark:text-amber-300"),
      border: cn("dark:border-amber-800"),
      accent: cn("dark:bg-amber-500"),
    },
  },

  error: {
    light: {
      bg: cn("bg-red-50"),
      text: cn("text-red-700"),
      border: cn("border-red-300"),
      accent: cn("bg-red-500"),
    },
    dark: {
      bg: cn("dark:bg-red-950"),
      text: cn("dark:text-red-300"),
      border: cn("dark:border-red-800"),
      accent: cn("dark:bg-red-500"),
    },
  },

  info: {
    light: {
      bg: cn("bg-blue-50"),
      text: cn("text-blue-700"),
      border: cn("border-blue-300"),
      accent: cn("bg-blue-500"),
    },
    dark: {
      bg: cn("dark:bg-blue-950"),
      text: cn("dark:text-blue-300"),
      border: cn("dark:border-blue-800"),
      accent: cn("dark:bg-blue-500"),
    },
  },

  neutral: {
    light: {
      bg: cn("bg-zinc-50"),
      text: cn("text-zinc-500"),
      border: cn("border-zinc-200"),
      accent: cn("bg-zinc-500"),
    },
    dark: {
      bg: cn("dark:bg-zinc-900/50"),
      text: cn("dark:text-zinc-400"),
      border: cn("dark:border-zinc-700"),
      accent: cn("dark:bg-zinc-500"),
    },
  },

  neutral2: {
    light: {
      bg: cn("bg-slate-50"),
      text: cn("text-slate-700"),
      border: cn("border-slate-300"),
      accent: cn("bg-slate-500"),
    },
    dark: {
      bg: cn("dark:bg-slate-950"),
      text: cn("dark:text-slate-300"),
      border: cn("dark:border-slate-800"),
      accent: cn("dark:bg-slate-500"),
    },
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
  return `${colors.light.bg} ${colors.light.text} ${colors.light.border} ${colors.dark.bg} ${colors.dark.text} ${colors.dark.border}`;
}

export function getStatusColor(
  status: keyof typeof STATUS_COLORS,
  part: "bg" | "text" | "border" | "accent",
  mode: "light" | "dark" = "light",
): string {
  return STATUS_COLORS[status][mode][part];
}
