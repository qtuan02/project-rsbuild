/**
 * Centralized color system for the application
 * Ensures consistent colors across all UI components and features
 */

export const STATUS_COLORS = {
  // Success / Active / Verified
  success: {
    light: {
      bg: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      accent: "bg-emerald-500",
    },
    dark: {
      bg: "dark:bg-emerald-950/50",
      text: "dark:text-emerald-300",
      border: "dark:border-emerald-800",
      accent: "dark:bg-emerald-500",
    },
  },

  // Warning / Pending / Ending
  warning: {
    light: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-300",
      accent: "bg-amber-500",
    },
    dark: {
      bg: "dark:bg-amber-950",
      text: "dark:text-amber-300",
      border: "dark:border-amber-800",
      accent: "dark:bg-amber-500",
    },
  },

  // Error / Anomaly / Overdue
  error: {
    light: {
      bg: "bg-red-50",
      text: "text-red-700",
      border: "border-red-300",
      accent: "bg-red-500",
    },
    dark: {
      bg: "dark:bg-red-950",
      text: "dark:text-red-300",
      border: "dark:border-red-800",
      accent: "dark:bg-red-500",
    },
  },

  // Info / Pending
  info: {
    light: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-300",
      accent: "bg-blue-500",
    },
    dark: {
      bg: "dark:bg-blue-950",
      text: "dark:text-blue-300",
      border: "dark:border-blue-800",
      accent: "dark:bg-blue-500",
    },
  },

  // Neutral / Ended / Draft
  neutral: {
    light: {
      bg: "bg-zinc-50",
      text: "text-zinc-500",
      border: "border-zinc-200",
      accent: "bg-zinc-500",
    },
    dark: {
      bg: "dark:bg-zinc-900/50",
      text: "dark:text-zinc-400",
      border: "dark:border-zinc-700",
      accent: "dark:bg-zinc-500",
    },
  },

  // Secondary neutral (slate)
  neutral2: {
    light: {
      bg: "bg-slate-50",
      text: "text-slate-700",
      border: "border-slate-300",
      accent: "bg-slate-500",
    },
    dark: {
      bg: "dark:bg-slate-950",
      text: "dark:text-slate-300",
      border: "dark:border-slate-800",
      accent: "dark:bg-slate-500",
    },
  },
} as const;

export const TYPE_COLORS = {
  // Electricity
  electricity: {
    text: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    accent: "bg-amber-500",
  },
  // Water
  water: {
    text: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-900/30",
    accent: "bg-blue-500",
  },
} as const;

/**
 * Helper function to combine status colors
 */
export function getStatusClassName(status: keyof typeof STATUS_COLORS): string {
  const colors = STATUS_COLORS[status];
  return `${colors.light.bg} ${colors.light.text} ${colors.light.border} ${colors.dark.bg} ${colors.dark.text} ${colors.dark.border}`;
}

/**
 * Helper function to get specific color part
 */
export function getStatusColor(
  status: keyof typeof STATUS_COLORS,
  part: "bg" | "text" | "border" | "accent",
  mode: "light" | "dark" = "light",
): string {
  return STATUS_COLORS[status][mode][part];
}
