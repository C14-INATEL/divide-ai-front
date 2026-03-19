import type {
  ExpenseCategory,
  ExpenseSplitType,
} from "../../enums/expenses/expenses.enum";
import type { ID, ApiEntity, ISODateString } from "../common.types";
import type { UserSummary } from "../users/user.types";

export interface ExpenseParticipantShare {
  userId: ID;
  amount: number;
  percentage?: number | null;
  isPaid: boolean;
}

export interface Expense extends ApiEntity {
  groupId: ID;
  title: string;
  description?: string | null;
  category: ExpenseCategory;
  amount: number;

  paidByUserId: ID;
  splitType: ExpenseSplitType;
  shares: ExpenseParticipantShare[];
  expenseDate: ISODateString;
}

export interface ExpenseDetails extends Expense {
  paidBy: UserSummary;
  participants: Array<ExpenseParticipantShare & { user: UserSummary }>;
}
