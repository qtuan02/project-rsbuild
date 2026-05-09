import type { Expense } from "@/types/expense";

import { mockExpenses } from "./expense.mock";

const resolveBuildingName = (buildingId: string): string =>
  `Toa nha ${buildingId.toUpperCase()}`;

export const getExpenses = (): Expense[] =>
  mockExpenses.map((expense) => ({
    ...expense,
    buildingName: resolveBuildingName(expense.buildingId),
  }));

export const getExpenseById = (expenseId: string): Expense | undefined =>
  getExpenses().find((item) => item.id === expenseId);
