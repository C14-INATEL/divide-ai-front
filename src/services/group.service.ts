import { http } from "./http";

export type Group = {
  id: number;
  name: string;
  value: number;
};

export async function getGroups(): Promise<Group[]> {
  const { data } = await http.get<Group[]>("/groups");
  return data;
}