import { http } from "./http";

export type Group = {
  id: number;
  name: string;
  value: number;
};

export async function getGroups(): Promise<Group[]> {
const { data } = await http.get("/groups/", {
    headers: {
      Authorization: 
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZmE0ZTIzNS05NDM5LTQwODYtOTBiOC1kZGNmN2M4ZmFlZDciLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJleHAiOjE3Nzg4ODU5NTN9.L93zGpMR2Pf-WwHgHXIe5cHNFqysUAPVaCUBhGFQF8Q"
    } //Alterar quando integrar o login 
  });
  return data;
}