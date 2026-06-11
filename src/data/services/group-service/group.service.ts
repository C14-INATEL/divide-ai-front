import { http } from "../http/http";

export type GroupMemberUser = {
  id: string;
  name: string;
  email: string;
};

export type GroupMember = {
  user_id: string;
  joined_at: string;
  user: GroupMemberUser;
};

export type Group = {
  id: string;
  name: string;
  description?: string;
  creator_id: string;
  is_owner: boolean;
  created_at: string;
  updated_at: string;
  members: GroupMember[];
};

export async function getGroups(): Promise<Group[]> {
  const { data } = await http.get<Group[]>("/groups");
  return data;
}

export type CreateGroupInput = {
  name: string;
  description?: string;
  added_users?: string[];
};

export async function createGroup(input: CreateGroupInput): Promise<Group> {
  const { data } = await http.post<Group>("/groups", input);
  return data;
}
