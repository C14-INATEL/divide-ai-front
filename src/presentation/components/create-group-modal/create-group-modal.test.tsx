import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { CreateGroupModal } from ".";
import { createGroup, updateGroup } from "../../../data/services/group-service/group.service";

vi.mock("../../../data/services/group-service/group.service", () => ({
  createGroup: vi.fn(),
  updateGroup: vi.fn(),
}));

vi.mock("../../../data/services/user-service/user.service", () => ({
  searchUsers: vi.fn().mockResolvedValue([]),
}));

const mockCreateGroup = vi.mocked(createGroup);
const mockUpdateGroup = vi.mocked(updateGroup);

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
  });
  HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
    this.removeAttribute("open");
  });
});

function baseGroup() {
  return {
    id: "g-1",
    name: "Grupo Original",
    creator_id: "u-1",
    is_owner: true,
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    members: [],
  };
}

describe("CreateGroupModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("modo criação", () => {
    it('exibe título "Criar novo grupo"', () => {
      render(<CreateGroupModal open onClose={vi.fn()} />);
      expect(screen.getByText("Criar novo grupo")).toBeInTheDocument();
    });

    it("botão de submit está desabilitado quando o nome está vazio", () => {
      render(<CreateGroupModal open onClose={vi.fn()} />);
      expect(screen.getByRole("button", { name: /criar grupo/i })).toBeDisabled();
    });

    it("botão de submit é habilitado ao digitar o nome", async () => {
      render(<CreateGroupModal open onClose={vi.fn()} />);
      await userEvent.type(screen.getByPlaceholderText(/ex: viagem/i), "Novo Grupo");
      expect(screen.getByRole("button", { name: /criar grupo/i })).not.toBeDisabled();
    });

    it("campo de busca de membros é visível no modo criação", () => {
      render(<CreateGroupModal open onClose={vi.fn()} />);
      expect(screen.getByPlaceholderText(/buscar por nome/i)).toBeInTheDocument();
    });

    it("chama createGroup com nome e descrição ao submeter", async () => {
      mockCreateGroup.mockResolvedValueOnce(baseGroup());
      const onSuccess = vi.fn();

      render(<CreateGroupModal open onClose={vi.fn()} onSuccess={onSuccess} />);
      await userEvent.type(screen.getByPlaceholderText(/ex: viagem/i), "Meu Grupo");
      await userEvent.type(
        screen.getByPlaceholderText(/do que se trata/i),
        "Descrição teste",
      );
      await userEvent.click(screen.getByRole("button", { name: /criar grupo/i }));

      await waitFor(() => {
        expect(mockCreateGroup).toHaveBeenCalledWith(
          expect.objectContaining({ name: "Meu Grupo", description: "Descrição teste" }),
        );
      });
    });

    it("chama onSuccess após criar o grupo com sucesso", async () => {
      mockCreateGroup.mockResolvedValueOnce(baseGroup());
      const onSuccess = vi.fn();
      const onClose = vi.fn();

      render(<CreateGroupModal open onClose={onClose} onSuccess={onSuccess} />);
      await userEvent.type(screen.getByPlaceholderText(/ex: viagem/i), "Grupo");
      await userEvent.click(screen.getByRole("button", { name: /criar grupo/i }));

      await waitFor(() => {
        expect(onSuccess).toHaveBeenCalledOnce();
      });
    });

    it("chama onClose ao clicar em Cancelar", async () => {
      const onClose = vi.fn();
      render(<CreateGroupModal open onClose={onClose} />);
      await userEvent.click(screen.getByRole("button", { name: /cancelar/i }));
      expect(onClose).toHaveBeenCalled();
    });

    it("exibe contagem de caracteres da descrição", async () => {
      render(<CreateGroupModal open onClose={vi.fn()} />);
      expect(screen.getByText("0/250")).toBeInTheDocument();
    });
  });

  describe("modo edição", () => {
    it('exibe título "Editar grupo"', () => {
      render(
        <CreateGroupModal
          open
          onClose={vi.fn()}
          editMode
          initialData={{ id: "g-1", name: "Grupo Original" }}
        />,
      );
      expect(screen.getByText("Editar grupo")).toBeInTheDocument();
    });

    it("pré-preenche o nome com o initialData", () => {
      render(
        <CreateGroupModal
          open
          onClose={vi.fn()}
          editMode
          initialData={{ id: "g-1", name: "Nome Existente" }}
        />,
      );
      expect(screen.getByDisplayValue("Nome Existente")).toBeInTheDocument();
    });

    it("oculta o campo de busca de membros no modo edição", () => {
      render(
        <CreateGroupModal
          open
          onClose={vi.fn()}
          editMode
          initialData={{ id: "g-1", name: "G" }}
        />,
      );
      expect(screen.queryByPlaceholderText(/buscar por nome/i)).not.toBeInTheDocument();
    });

    it('exibe botão "Salvar" em vez de "Criar grupo"', () => {
      render(
        <CreateGroupModal
          open
          onClose={vi.fn()}
          editMode
          initialData={{ id: "g-1", name: "G" }}
        />,
      );
      expect(screen.getByRole("button", { name: /salvar/i })).toBeInTheDocument();
    });

    it("chama updateGroup ao submeter no modo edição", async () => {
      mockUpdateGroup.mockResolvedValueOnce(baseGroup());
      const onSuccess = vi.fn();

      render(
        <CreateGroupModal
          open
          onClose={vi.fn()}
          onSuccess={onSuccess}
          editMode
          initialData={{ id: "g-1", name: "Antigo" }}
        />,
      );

      const input = screen.getByDisplayValue("Antigo");
      await userEvent.clear(input);
      await userEvent.type(input, "Novo Nome");
      await userEvent.click(screen.getByRole("button", { name: /salvar/i }));

      await waitFor(() => {
        expect(mockUpdateGroup).toHaveBeenCalledWith("g-1", expect.objectContaining({ name: "Novo Nome" }));
      });
    });
  });
});
