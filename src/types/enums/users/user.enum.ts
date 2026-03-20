export const UserRole = {
    GROUP_OWNER: "GROUP_OWNER",
    GROUP_MEMBER: "GROUP_MEMBER",
  } as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];