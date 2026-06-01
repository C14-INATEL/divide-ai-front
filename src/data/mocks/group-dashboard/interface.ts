import type {
  GroupBalanceItem,
  GroupFinancialSummary,
  ExpenseCategorySummary,
  RecentActivityItem,
} from "../../../domain/types/interfaces/dashboard/dashboard.types";
import type { ExpenseDetails } from "../../../domain/types/interfaces/expenses/expenses.types";
import type {
  Group,
  GroupDetails,
} from "../../../domain/types/interfaces/groups/groups.types";
import type { SettlementDetails } from "../../../domain/types/interfaces/settlements/settlements.types";
import type { User } from "../../../domain/types/interfaces/users/user.types";

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export type GetCurrentUserResponse = ApiResponse<User>;

export type GetGroupsResponse = ApiResponse<Group[]>;

export type GetGroupByIdResponse = ApiResponse<GroupDetails>;

export type GetGroupExpensesResponse = ApiResponse<ExpenseDetails[]>;

export type GetGroupSettlementsResponse = ApiResponse<SettlementDetails[]>;

export type GetGroupBalancesResponse = ApiResponse<GroupBalanceItem[]>;

export type GetGroupDashboardResponse = ApiResponse<{
  group: GroupDetails;
  summary: GroupFinancialSummary;
  balances: GroupBalanceItem[];
  recentExpenses: ExpenseDetails[];
  settlements: SettlementDetails[];
  categorySummary: ExpenseCategorySummary[];
  recentActivity: RecentActivityItem[];
}>;
