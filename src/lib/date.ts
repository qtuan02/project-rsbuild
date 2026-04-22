import { format } from "date-fns";

export const formatDate = (
  input: Date | number | string,
  pattern = "dd/MM/yyyy",
) => {
  const date = input instanceof Date ? input : new Date(input);
  return format(date, pattern);
};
