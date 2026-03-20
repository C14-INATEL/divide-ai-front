import type { ExpenseCategory } from "../../enums/expenses/expenses.enum";
import type { ID, ISODateString } from "../common.types";
import type { UserSummary, PixKey } from "../users/user.types";

export interface GroupBalanceItem {
    userId: ID;
    user: UserSummary;
    balance: number;
    status: "RECEIVES" | "OWES" | "SETTLED";
    pixKey?: PixKey | null;
  }
  
  export interface GroupFinancialSummary {
    totalSpent: number;
    totalPending: number;
    totalPaid: number;
    expensesCount: number;
    membersCount: number;
  }
  
  export interface ExpenseCategorySummary {
    category: ExpenseCategory;
    total: number;
    percentage: number;
  }
  
  export interface RecentActivityItem {
    id: ID;
    type:
      | "GROUP_CREATED"
      | "MEMBER_ADDED"
      | "MEMBER_REMOVED"
      | "EXPENSE_CREATED"
      | "EXPENSE_UPDATED"
      | "SETTLEMENT_PAID";
    description: string;
    createdAt: ISODateString;
    actor?: UserSummary;
  }