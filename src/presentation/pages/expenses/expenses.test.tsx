import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Expenses } from ".";
import { getGroups } from "../../../data/services/group-service/group.service";
import {
  getDebts,
  deleteDebt
} from "../../../data/services/debt-service/debt.service";
import { useModalStore } from "../../store/modal.store";
import { useAuthStore } from "../../store/auth.store";

vi.mock("../../../data/services/group-service/group.service", () => ({
  getGroups: vi.fn(),
}));

vi.mock("../../../data/services/debt-service/debt.service", () => ({
  getDebts: vi.fn(),
  deleteDebt: vi.fn(),
  confirmDebtPayment: vi.fn(),
  uploadDebtProof: vi.fn(),
  getDebtProof: vi.fn(),
}));

const mockGetGroups = vi.mocked(getGroups);
const mockGetDebts = vi.mocked(getDebts);
const mockDeleteDebt = vi.mocked(deleteDebt);

function makeGroup(id: string, name: string) {
  return {
    id,
    name,
    creator_id: "u-1",
    is_owner: true,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    members: [],
  };
}

function makeDebt(id: string, title: string, groupId = "g-1") {
  return {
    id,
    group_id: groupId,
    creator_id: "u-1",
    title,
    due_date: "2026-12-31",
    total_amount: "100.00",
    split_type: "homogenea" as const,
    status: "pendente",
    created_at: "2026-01-01T00:00:00.000Z",
    participants: [],
  };
}

describe("Expenses page", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    useModalStore.setState({ activeModal: null, modalProps: null });
    useAuthStore.setState({
      user: { sub: "u-1", name: "Usuário", email: "u@test.com", exp: 9999, iat: 0 },
    });
  });

  it("não exibe conteúdo de dados durante o carregamento", () => {
    mockGetGroups.mockReturnValueOnce(new Promise(() => {}));
    render(<Expenses />);
    // Conteúdo pós-carregamento não deve aparecer enquanto groups está pendente
    expect(screen.queryByText("Nenhum grupo encontrado")).not.toBeInTheDocument();
    expect(screen.queryByText("Sem dividas neste grupo")).not.toBeInTheDocument();
  });

  it("exibe estado vazio quando não há grupos", async () => {
    mockGetGroups.mockResolvedValueOnce([]);
    mockGetDebts.mockResolvedValue([]);
    render(<Expenses />);

    expect(await screen.findByText("Nenhum grupo encontrado")).toBeInTheDocument();
  });

  it('desabilita o botão "Nova dívida" sem grupos', async () => {
    mockGetGroups.mockResolvedValueOnce([]);
    mockGetDebts.mockResolvedValue([]);
    render(<Expenses />);

    await screen.findByText("Nenhum grupo encontrado");
    expect(screen.getByRole("button", { name: /nova divida/i })).toBeDisabled();
  });

  it("exibe estado vazio quando o grupo não tem dívidas", async () => {
    mockGetGroups.mockResolvedValueOnce([makeGroup("g-1", "Churrasco")]);
    mockGetDebts.mockResolvedValueOnce([]);
    render(<Expenses />);

    // Aguarda getDebts ser chamado (confirma que o mock foi consumido)
    await waitFor(() => expect(mockGetDebts).toHaveBeenCalledWith("g-1"));
    expect(await screen.findByText("Sem dividas neste grupo")).toBeInTheDocument();
  });

  it("renderiza dívidas carregadas do grupo selecionado", async () => {
    mockGetGroups.mockResolvedValueOnce([makeGroup("g-1", "Churrasco")]);
    mockGetDebts.mockResolvedValueOnce([
      makeDebt("d-1", "Compra do mercado"),
      makeDebt("d-2", "Uber para o aeroporto"),
    ]);
    render(<Expenses />);

    expect(await screen.findByText("Compra do mercado")).toBeInTheDocument();
    expect(screen.getByText("Uber para o aeroporto")).toBeInTheDocument();
  });

  it("exibe a contagem de dívidas no subtítulo", async () => {
    mockGetGroups.mockResolvedValueOnce([makeGroup("g-1", "Churrasco")]);
    mockGetDebts.mockResolvedValueOnce([makeDebt("d-1", "Gasto 1"), makeDebt("d-2", "Gasto 2")]);
    render(<Expenses />);

    await screen.findByText("Gasto 1");
    expect(screen.getByText(/2 dividas em Churrasco/i)).toBeInTheDocument();
  });

  it("o seletor de grupos exibe todos os grupos carregados", async () => {
    mockGetGroups.mockResolvedValueOnce([
      makeGroup("g-1", "Grupo A"),
      makeGroup("g-2", "Grupo B"),
    ]);
    mockGetDebts.mockResolvedValue([]);
    render(<Expenses />);

    await waitFor(() => {
      expect(screen.getByRole("option", { name: "Grupo A" })).toBeInTheDocument();
      expect(screen.getByRole("option", { name: "Grupo B" })).toBeInTheDocument();
    });
  });

  it("mudar o seletor de grupo recarrega as dívidas", async () => {
    mockGetGroups.mockResolvedValueOnce([
      makeGroup("g-1", "Grupo A"),
      makeGroup("g-2", "Grupo B"),
    ]);
    mockGetDebts
      .mockResolvedValueOnce([makeDebt("d-1", "Dívida do Grupo A", "g-1")])
      .mockResolvedValueOnce([makeDebt("d-2", "Dívida do Grupo B", "g-2")]);

    render(<Expenses />);
    await screen.findByText("Dívida do Grupo A");

    await userEvent.selectOptions(screen.getByRole("combobox"), "g-2");

    expect(await screen.findByText("Dívida do Grupo B")).toBeInTheDocument();
    expect(screen.queryByText("Dívida do Grupo A")).not.toBeInTheDocument();
  });

  it('abre o modal "create-debt" ao clicar em "Nova dívida"', async () => {
    mockGetGroups.mockResolvedValueOnce([makeGroup("g-1", "Churrasco")]);
    mockGetDebts.mockResolvedValueOnce([]);
    render(<Expenses />);

    await screen.findByText("Sem dividas neste grupo");
    await userEvent.click(screen.getByRole("button", { name: /nova divida/i }));

    expect(useModalStore.getState().activeModal).toBe("create-debt");
  });

  it("exibe mensagem de feedback quando deletar dívida falha", async () => {
    mockGetGroups.mockResolvedValueOnce([makeGroup("g-1", "Churrasco")]);
    mockGetDebts
      .mockResolvedValueOnce([makeDebt("d-1", "Gasto com erro")])
      .mockResolvedValueOnce([]);
    mockDeleteDebt.mockRejectedValueOnce(new Error("Erro ao deletar"));

    render(<Expenses />);
    const deleteBtn = await screen.findByRole("button", { name: /excluir divida/i });
    await userEvent.click(deleteBtn);

    expect(await screen.findByText("Erro ao deletar")).toBeInTheDocument();
  });
});
