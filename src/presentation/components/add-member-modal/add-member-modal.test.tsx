import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { AddMemberModal } from ".";
import { searchUsers } from "../../../data/services/user-service/user.service";
import { addGroupMember } from "../../../data/services/group-service/group.service";

vi.mock("../../../data/services/user-service/user.service", () => ({
  searchUsers: vi.fn(),
}));

vi.mock("../../../data/services/group-service/group.service", () => ({
  addGroupMember: vi.fn(),
}));

const mockSearchUsers = vi.mocked(searchUsers);
const mockAddGroupMember = vi.mocked(addGroupMember);

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute("open");
  });
});

describe("AddMemberModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSearchUsers.mockResolvedValue([]);
  });

  it("exibe campo de busca por padrão", () => {
    render(<AddMemberModal open groupId="g-1" onClose={vi.fn()} />);
    expect(screen.getByPlaceholderText(/buscar por nome/i)).toBeInTheDocument();
  });

  it('botão "Adicionar" está desabilitado sem usuário selecionado', () => {
    render(<AddMemberModal open groupId="g-1" onClose={vi.fn()} />);
    expect(screen.getByRole("button", { name: /adicionar/i })).toBeDisabled();
  });

  it("exibe resultados da busca no dropdown", async () => {
    mockSearchUsers.mockResolvedValue([
      { id: "u-2", name: "Alice Silva", email: "alice@test.com" },
    ]);

    render(<AddMemberModal open groupId="g-1" onClose={vi.fn()} />);
    const input = screen.getByPlaceholderText(/buscar por nome/i);

    await userEvent.type(input, "Alice");
    // Aguarda o debounce de 500ms
    await waitFor(() => expect(mockSearchUsers).toHaveBeenCalled(), { timeout: 1000 });
    await waitFor(() => screen.findByText("Alice Silva"));
  });

  it("exibe mensagem quando nenhum usuário é encontrado", async () => {
    mockSearchUsers.mockResolvedValue([]);

    render(<AddMemberModal open groupId="g-1" onClose={vi.fn()} />);
    const input = screen.getByPlaceholderText(/buscar por nome/i);
    await userEvent.click(input);

    await waitFor(() => {
      expect(screen.getByText(/nenhum usuário encontrado/i)).toBeInTheDocument();
    });
  });

  it("habilita botão Adicionar após selecionar usuário", async () => {
    mockSearchUsers.mockResolvedValue([
      { id: "u-2", name: "Bob Santos", email: "bob@test.com" },
    ]);

    render(<AddMemberModal open groupId="g-1" onClose={vi.fn()} />);
    const input = screen.getByPlaceholderText(/buscar por nome/i);
    await userEvent.click(input);

    await waitFor(() => screen.findByText("Bob Santos"));
    await userEvent.click(await screen.findByText("Bob Santos"));

    expect(screen.getByRole("button", { name: /adicionar/i })).not.toBeDisabled();
  });

  it("exibe card do usuário selecionado com opção de remover", async () => {
    mockSearchUsers.mockResolvedValue([
      { id: "u-2", name: "Carol", email: "carol@test.com" },
    ]);

    render(<AddMemberModal open groupId="g-1" onClose={vi.fn()} />);
    await userEvent.click(screen.getByPlaceholderText(/buscar por nome/i));

    await waitFor(() => screen.findByText("Carol"));
    await userEvent.click(await screen.findByText("Carol"));

    expect(screen.getByText("Carol")).toBeInTheDocument();
    expect(screen.getByText("carol@test.com")).toBeInTheDocument();
  });

  it("chama addGroupMember com groupId e userId corretos", async () => {
    mockSearchUsers.mockResolvedValue([
      { id: "u-2", name: "Dave", email: "dave@test.com" },
    ]);
    mockAddGroupMember.mockResolvedValueOnce(undefined);
    const onSuccess = vi.fn();
    const onClose = vi.fn();

    render(
      <AddMemberModal open groupId="g-99" onClose={onClose} onSuccess={onSuccess} />,
    );
    await userEvent.click(screen.getByPlaceholderText(/buscar por nome/i));

    await waitFor(() => screen.findByText("Dave"));
    await userEvent.click(await screen.findByText("Dave"));
    await userEvent.click(screen.getByRole("button", { name: /adicionar/i }));

    await waitFor(() => {
      expect(mockAddGroupMember).toHaveBeenCalledWith("g-99", "u-2");
      expect(onSuccess).toHaveBeenCalled();
    });
  });

  it("chama onClose ao clicar em Cancelar", async () => {
    const onClose = vi.fn();
    render(<AddMemberModal open groupId="g-1" onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: /cancelar/i }));
    expect(onClose).toHaveBeenCalled();
  });
});
