import type { UserRole } from "../../enums";
import type { GroupStatus } from "../../enums/groups/groups.enum";
import type { ApiEntity, ID, ISODateString } from "../common.types";
import type { User } from "../users/user.types";

export interface GroupMember extends ApiEntity {
  groupId: ID;
  userId: ID;
  role: UserRole;
  isActive: boolean;
  joinedAt: ISODateString;
  user: User;
}

export interface Group extends ApiEntity {
  name: string;
  description?: string | null;
  status: GroupStatus;
  createdByUserId: ID;
  membersCount: number;
  expensesCount: number;
  totalAmount: number;
}

export interface GroupDetails extends Group {
  members: GroupMember[];
}
