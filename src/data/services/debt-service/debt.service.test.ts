import { vi } from "vitest";
import {
  getDebts,
  getDebt,
  createDebt,
  updateDebt,
  deleteDebt,
  confirmDebtPayment,
  uploadDebtProof,
} from "./debt.service";
import { http } from "../http/http";

vi.mock("../http/http", () => ({
  http: { get: vi.fn(), post: vi.fn(), patch: vi.fn(), delete: vi.fn() },
}));

const httpGet = vi.mocked(http.get);
const httpPost = vi.mocked(http.post);
const httpPatch = vi.mocked(http.patch);
const httpDelete = vi.mocked(http.delete);

const mockDebt = {
  id: "d-1",
  group_id: "g-1",
  creator_id: "u-1",
  title: "Jantar",
  due_date: "2026-12-31",
  total_amount: "150.00",
  split_type: "homogenea" as const,
  status: "pendente",
  created_at: "2026-01-01T00:00:00.000Z",
};

describe("debt service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getDebts", () => {
    it("busca GET /debts/ filtrando por group_id", async () => {
      httpGet.mockResolvedValueOnce({ data: [mockDebt] });

      const result = await getDebts("g-1");

      expect(httpGet).toHaveBeenCalledWith("/debts/", { params: { group_id: "g-1" } });
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("d-1");
    });
  });

  describe("getDebt", () => {
    it("busca GET /debts/:id", async () => {
      httpGet.mockResolvedValueOnce({ data: mockDebt });

      const result = await getDebt("d-1");

      expect(httpGet).toHaveBeenCalledWith("/debts/d-1");
      expect(result.title).toBe("Jantar");
    });
  });

  describe("createDebt", () => {
    it("envia POST /debts/ com os dados da dívida", async () => {
      httpPost.mockResolvedValueOnce({ data: mockDebt });

      const input = {
        group_id: "g-1",
        title: "Jantar",
        due_date: "2026-12-31",
        total_amount: 150,
        split_type: "homogenea" as const,
        participants: [{ user_id: "u-2" }],
      };

      await createDebt(input);

      expect(httpPost).toHaveBeenCalledWith("/debts/", input);
    });

    it("retorna a dívida criada", async () => {
      httpPost.mockResolvedValueOnce({ data: mockDebt });

      const result = await createDebt({
        group_id: "g-1",
        title: "Jantar",
        due_date: "2026-12-31",
        total_amount: 150,
        split_type: "homogenea",
        participants: [],
      });

      expect(result.id).toBe("d-1");
    });
  });

  describe("updateDebt", () => {
    it("envia PATCH /debts/:id com os campos alterados", async () => {
      httpPatch.mockResolvedValueOnce({ data: { ...mockDebt, title: "Jantar atualizado" } });

      await updateDebt("d-1", {
        title: "Jantar atualizado",
        due_date: "2026-12-31",
        total_amount: 200,
        split_type: "homogenea",
        participants: [],
      });

      expect(httpPatch).toHaveBeenCalledWith("/debts/d-1", expect.objectContaining({ title: "Jantar atualizado" }));
    });
  });

  describe("deleteDebt", () => {
    it("envia DELETE /debts/:id", async () => {
      httpDelete.mockResolvedValueOnce({});

      await deleteDebt("d-1");

      expect(httpDelete).toHaveBeenCalledWith("/debts/d-1");
    });
  });

  describe("confirmDebtPayment", () => {
    it("envia POST para o endpoint de confirmação", async () => {
      const mockParticipant = { user_id: "u-2", percentage: 50, amount: 75, status: "confirmado" };
      httpPost.mockResolvedValueOnce({ data: mockParticipant });

      const result = await confirmDebtPayment("d-1", "u-2");

      expect(httpPost).toHaveBeenCalledWith("/debts/d-1/participants/u-2/confirm");
      expect(result.status).toBe("confirmado");
    });
  });

  describe("uploadDebtProof", () => {
    it("envia o arquivo como FormData com Content-Type multipart", async () => {
      const mockParticipant = { user_id: "u-1", percentage: 100, amount: 150, status: "pago" };
      httpPost.mockResolvedValueOnce({ data: mockParticipant });

      const file = new File(["conteudo"], "comprovante.pdf", { type: "application/pdf" });
      await uploadDebtProof("d-1", file);

      const [url, formData, config] = httpPost.mock.calls[0] as [string, FormData, object];
      expect(url).toBe("/debts/d-1/participants/me/proof");
      expect(formData).toBeInstanceOf(FormData);
      expect(formData.get("file")).toBe(file);
      expect(config).toMatchObject({ headers: { "Content-Type": "multipart/form-data" } });
    });
  });
});
