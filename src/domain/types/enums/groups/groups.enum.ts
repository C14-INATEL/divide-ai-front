export const GroupStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type GroupStatus = (typeof GroupStatus)[keyof typeof GroupStatus];
