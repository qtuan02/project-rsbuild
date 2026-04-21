export const toTitleCase = (value: string) => {
  return value
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getInitials = (value: string): string => {
  const parts = value
    .split(' ')
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length >= 2) {
    const lastPart = parts[parts.length - 1];
    return `${parts[0].charAt(0)}${lastPart.charAt(0)}`.toUpperCase();
  }

  return value.slice(0, 2).toUpperCase();
};
