import { http } from "../http/http";

export type GroupMember = {
  id?: string;
  user_id?: string;
  user?: {
    id?: string;
    name?: string;
    email?: string;
  };
};

export type Group = {
  id: string;
  name: string;
  creator_id: string;
  created_at: string;
  updated_at: string;
  members: GroupMember[];
};

export async function getGroups(): Promise<Group[]> {
  const { data } = await http.get<Group[]>("/groups");
  return data;
}

export type CreateGroupInput = { name: string };

export async function createGroup(input: CreateGroupInput): Promise<Group> {
  const { data } = await http.post<Group>("/groups", input);
  return data;
}
