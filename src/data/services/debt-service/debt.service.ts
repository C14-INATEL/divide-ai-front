import { http } from "../http/http";

export type DebtSplitType = "homogenea" | "heterogenea";
export type DebtStatus = "pendente" | "pago" | "confirmado" | string;

export type DebtParticipantUser = {
  id: string;
  name?: string;
  email?: string;
};

export type DebtParticipant = {
  user_id: string;
  user?: DebtParticipantUser;
  percentage: string | number;
  amount: string | number;
  status: DebtStatus;
  has_proof?: boolean;
  paid_at?: string | null;
  confirmed_at?: string | null;
};

export type Debt = {
  id: string;
  group_id: string;
  creator_id: string;
  title: string;
  description?: string | null;
  due_date: string;
  total_amount: string | number;
  split_type: DebtSplitType;
  status: DebtStatus;
  created_at: string;
  updated_at?: string;
  participants?: DebtParticipant[];
};

export type CreateDebtParticipantInput = {
  user_id: string;
  percentage?: number;
};

export type CreateDebtInput = {
  group_id: string;
  title: string;
  description?: string;
  due_date: string;
  total_amount: number;
  split_type: DebtSplitType;
  participants: CreateDebtParticipantInput[];
};

export async function getDebts(groupId: string): Promise<Debt[]> {
  const { data } = await http.get<Debt[]>("/debts/", {
    params: { group_id: groupId },
  });
  return data;
}

export async function getDebt(debtId: string): Promise<Debt> {
  const { data } = await http.get<Debt>(`/debts/${debtId}`);
  return data;
}

export async function createDebt(input: CreateDebtInput): Promise<Debt> {
  const { data } = await http.post<Debt>("/debts/", input);
  return data;
}

export async function deleteDebt(debtId: string): Promise<void> {
  await http.delete(`/debts/${debtId}`);
}

export async function uploadDebtProof(
  debtId: string,
  file: File,
): Promise<DebtParticipant> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await http.post<DebtParticipant>(
    `/debts/${debtId}/participants/me/proof`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return data;
}

export async function confirmDebtPayment(
  debtId: string,
  userId: string,
): Promise<DebtParticipant> {
  const { data } = await http.post<DebtParticipant>(
    `/debts/${debtId}/participants/${userId}/confirm`,
  );
  return data;
}

export async function getDebtProof(
  debtId: string,
  userId: string,
): Promise<string> {
  const { data } = await http.get<string>(
    `/debts/${debtId}/participants/${userId}/proof`,
  );
  return data;
}
