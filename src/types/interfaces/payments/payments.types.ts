import type { ApiEntity, ID, ISODateString } from "../common.types";

export interface PaymentRecord extends ApiEntity {
  groupId: ID;
  settlementId: ID;
  paidByUserId: ID;
  receivedByUserId: ID;
  amount: number;
  paidAt: ISODateString;
  note?: string | null;
}
