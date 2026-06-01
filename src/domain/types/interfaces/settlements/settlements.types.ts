import type { SettlementStatus } from "../../enums/settlements/settlements.enums";
import type { ApiEntity, ID, ISODateString } from "../common.types";
import type { UserSummary, PixKey } from "../users/user.types";

export interface Settlement extends ApiEntity {
  groupId: ID;
  fromUserId: ID;
  toUserId: ID;
  amount: number;
  status: SettlementStatus;
  paidAt?: ISODateString | null;
  note?: string | null;
}

export interface SettlementDetails extends Settlement {
  fromUser: UserSummary;
  toUser: UserSummary;
  toUserPixKey?: PixKey | null;
}
