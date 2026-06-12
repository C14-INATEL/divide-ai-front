import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { MemoryRouter } from "react-router";
import { Groups } from ".";
import { getGroups } from "../../../data/services/group-service/group.service";
import { useModalStore } from "../../store/modal.store";
import { useAuthStore } from "../../store/auth.store";

vi.mock("../../../data/services/group-service/group.service", () => ({
  getGroups: vi.fn(),
}));

const mockGetGroups = vi.mocked(getGroups);

function makeGroup(id: string, name: string, creatorId = "u-owner") {
  return {
    id,
    name,
    creator_id: creatorId,
    is_owner: creatorId === "u-owner",
    created_at: "2026-01-01T00:00:00.000Z",
    updated_at: "2026-01-01T00:00:00.000Z",
    members: [],
  };
}

function renderGroups() {
  return render(
    <MemoryRouter>
      <Groups />
    </MemoryRouter>,
  );
}

describe("Groups page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useModalStore.setState({ activeModal: null, modalProps: null });
    useAuthStore.setState({ user: { sub: "u-owner", name: "Owner", email: "owner@test.com", exp: 9999, iat: 0 } });
  });

  it("não exibe grupos enquanto está carregando", () => {
    mockGetGroups.mockReturnValueOnce(new Promise(() => {}));
    renderGroups();
    // grupos não devem aparecer durante loading
    expect(screen.queryByText("Churrasco")).not.toBeInTheDocument();
    expect(screen.queryByText("Nenhum grupo por aqui")).not.toBeInTheDocument();
  });

  it("renderiza a lista de grupos após carregamento", async () => {
    mockGetGroups.mockResolvedValueOnce([
      makeGroup("g-1", "Churrasco"),
      makeGroup("g-2", "Viagem"),
    ]);
    renderGroups();

    expect(await screen.findByText("Churrasco")).toBeInTheDocument();
    expect(screen.getByText("Viagem")).toBeInTheDocument();
  });

  it("exibe a contagem correta de grupos no subtítulo", async () => {
    mockGetGroups.mockResolvedValueOnce([makeGroup("g-1", "G1"), makeGroup("g-2", "G2")]);
    renderGroups();

    await screen.findByText("G1");
    expect(screen.getByText("2 grupos")).toBeInTheDocument();
  });

  it('exibe "1 grupo" no singular', async () => {
    mockGetGroups.mockResolvedValueOnce([makeGroup("g-1", "Único")]);
    renderGroups();

    await screen.findByText("Único");
    expect(screen.getByText("1 grupo")).toBeInTheDocument();
  });

  it("exibe estado vazio quando não há grupos", async () => {
    mockGetGroups.mockResolvedValueOnce([]);
    renderGroups();

    expect(await screen.findByText("Nenhum grupo por aqui")).toBeInTheDocument();
  });

  it('abre modal "create-group" ao clicar em "Novo grupo"', async () => {
    mockGetGroups.mockResolvedValueOnce([]);
    renderGroups();

    await screen.findByText("Nenhum grupo por aqui");
    await userEvent.click(screen.getByRole("button", { name: /novo grupo/i }));

    expect(useModalStore.getState().activeModal).toBe("create-group");
  });

  it("estado vazio também tem botão para criar grupo", async () => {
    mockGetGroups.mockResolvedValueOnce([]);
    renderGroups();

    await screen.findByText("Nenhum grupo por aqui");
    await userEvent.click(screen.getByRole("button", { name: /criar grupo/i }));

    expect(useModalStore.getState().activeModal).toBe("create-group");
  });

  it("marca grupo como owner quando o creator_id bate com o user logado", async () => {
    mockGetGroups.mockResolvedValueOnce([makeGroup("g-1", "Meu Grupo", "u-owner")]);
    renderGroups();

    await screen.findByText("Meu Grupo");
    expect(screen.getByText("Organizador")).toBeInTheDocument();
  });

  it("não marca como owner quando creator_id é diferente do user logado", async () => {
    mockGetGroups.mockResolvedValueOnce([makeGroup("g-1", "Grupo Alheio", "outro-user")]);
    renderGroups();

    await screen.findByText("Grupo Alheio");
    expect(screen.queryByText("Organizador")).not.toBeInTheDocument();
  });
});
