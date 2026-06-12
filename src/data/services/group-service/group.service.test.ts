import { vi } from "vitest";
import {
  getGroups,
  createGroup,
  getGroup,
  updateGroup,
  deleteGroup,
  addGroupMember,
  removeGroupMember,
} from "./group.service";
import { http } from "../http/http";

vi.mock("../http/http", () => ({
  http: { get: vi.fn(), post: vi.fn(), patch: vi.fn(), delete: vi.fn() },
}));

const httpGet = vi.mocked(http.get);
const httpPost = vi.mocked(http.post);
const httpPatch = vi.mocked(http.patch);
const httpDelete = vi.mocked(http.delete);

const mockGroup = {
  id: "g-1",
  name: "Grupo Teste",
  creator_id: "u-1",
  is_owner: true,
  created_at: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-01-01T00:00:00.000Z",
  members: [],
};

describe("group service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getGroups", () => {
    it("busca GET /groups e retorna lista de grupos", async () => {
      httpGet.mockResolvedValueOnce({ data: [mockGroup] });

      const result = await getGroups();

      expect(httpGet).toHaveBeenCalledWith("/groups");
      expect(result).toEqual([mockGroup]);
    });
  });

  describe("getGroup", () => {
    it("busca GET /groups/:id e retorna o grupo", async () => {
      httpGet.mockResolvedValueOnce({ data: mockGroup });

      const result = await getGroup("g-1");

      expect(httpGet).toHaveBeenCalledWith("/groups/g-1");
      expect(result.id).toBe("g-1");
    });
  });

  describe("createGroup", () => {
    it("envia POST /groups com nome e descrição", async () => {
      httpPost.mockResolvedValueOnce({ data: mockGroup });

      await createGroup({ name: "Novo Grupo", description: "Desc" });

      expect(httpPost).toHaveBeenCalledWith("/groups", {
        name: "Novo Grupo",
        description: "Desc",
        added_users: undefined,
      });
    });

    it("inclui added_users quando fornecido", async () => {
      httpPost.mockResolvedValueOnce({ data: mockGroup });

      await createGroup({ name: "G", added_users: ["u-2", "u-3"] });

      expect(httpPost).toHaveBeenCalledWith(
        "/groups",
        expect.objectContaining({ added_users: ["u-2", "u-3"] }),
      );
    });

    it("retorna o grupo criado", async () => {
      httpPost.mockResolvedValueOnce({ data: mockGroup });

      const result = await createGroup({ name: "Novo" });

      expect(result.name).toBe("Grupo Teste");
    });
  });

  describe("updateGroup", () => {
    it("envia PATCH /groups/:id com os campos alterados", async () => {
      httpPatch.mockResolvedValueOnce({ data: { ...mockGroup, name: "Atualizado" } });

      await updateGroup("g-1", { name: "Atualizado" });

      expect(httpPatch).toHaveBeenCalledWith("/groups/g-1", { name: "Atualizado" });
    });
  });

  describe("deleteGroup", () => {
    it("envia DELETE /groups/:id", async () => {
      httpDelete.mockResolvedValueOnce({});

      await deleteGroup("g-1");

      expect(httpDelete).toHaveBeenCalledWith("/groups/g-1");
    });
  });

  describe("addGroupMember", () => {
    it("envia POST /groups/:id/members com user_id", async () => {
      httpPost.mockResolvedValueOnce({});

      await addGroupMember("g-1", "u-2");

      expect(httpPost).toHaveBeenCalledWith("/groups/g-1/members", { user_id: "u-2" });
    });
  });

  describe("removeGroupMember", () => {
    it("envia DELETE /groups/:id/members/:userId", async () => {
      httpDelete.mockResolvedValueOnce({});

      await removeGroupMember("g-1", "u-2");

      expect(httpDelete).toHaveBeenCalledWith("/groups/g-1/members/u-2");
    });
  });
});
