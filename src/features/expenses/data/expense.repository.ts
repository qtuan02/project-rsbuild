import type { Expense } from "@/types/expense";

import { mockExpenses } from "./expense.mock";

export const getExpenses = (): Expense[] => [...mockExpenses];

export const getExpenseById = (expenseId: string): Expense | undefined =>
  getExpenses().find((item) => item.id === expenseId);
