import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { GroupCard } from ".";
import type { Group } from "../../../data/services/group-service/group.service";

function makeGroup(overrides: Partial<Group> = {}): Group {
  return {
    id: "g-1",
    name: "Grupo Teste",
    creator_id: "u-1",
    is_owner: false,
    created_at: "2026-01-15T00:00:00.000Z",
    updated_at: "2026-01-15T00:00:00.000Z",
    members: [],
    ...overrides,
  };
}

function makeMember(userId: string, name: string) {
  return {
    user_id: userId,
    joined_at: "2026-01-01T00:00:00.000Z",
    user: { id: userId, name, email: `${userId}@test.com` },
  };
}

function renderCard(group: Group, isOwner = false) {
  return render(
    <MemoryRouter>
      <GroupCard group={group} isOwner={isOwner} />
    </MemoryRouter>,
  );
}

describe("GroupCard", () => {
  it("exibe o nome do grupo", () => {
    renderCard(makeGroup({ name: "Churrasco 2026" }));
    expect(screen.getByText("Churrasco 2026")).toBeInTheDocument();
  });

  it("exibe as iniciais do grupo no avatar", () => {
    renderCard(makeGroup({ name: "Viagem Férias" }));
    expect(screen.getByText("VF")).toBeInTheDocument();
  });

  it("exibe initial única para nome de uma palavra", () => {
    renderCard(makeGroup({ name: "Familia" }));
    expect(screen.getByText("F")).toBeInTheDocument();
  });

  it('exibe badge "Organizador" quando isOwner=true', () => {
    renderCard(makeGroup(), true);
    expect(screen.getByText("Organizador")).toBeInTheDocument();
  });

  it('não exibe badge "Organizador" quando isOwner=false', () => {
    renderCard(makeGroup(), false);
    expect(screen.queryByText("Organizador")).not.toBeInTheDocument();
  });

  it('exibe "Sem membros" quando não há membros', () => {
    renderCard(makeGroup({ members: [] }));
    expect(screen.getByText("Sem membros")).toBeInTheDocument();
  });

  it('exibe "1 membro" no singular', () => {
    const members = [makeMember("u-1", "Alice")];
    renderCard(makeGroup({ members }));
    expect(screen.getByText("1 membro")).toBeInTheDocument();
  });

  it("exibe contagem plural de membros", () => {
    const members = [makeMember("u-1", "Alice"), makeMember("u-2", "Bob")];
    renderCard(makeGroup({ members }));
    expect(screen.getByText("2 membros")).toBeInTheDocument();
  });

  it("exibe overflow quando há mais de 3 membros", () => {
    const members = [
      makeMember("u-1", "Alice"),
      makeMember("u-2", "Bob"),
      makeMember("u-3", "Carol"),
      makeMember("u-4", "Dave"),
    ];
    renderCard(makeGroup({ members }));
    expect(screen.getByText("+1")).toBeInTheDocument();
  });

  it("link aponta para a rota do grupo", () => {
    renderCard(makeGroup({ id: "g-42" }));
    const link = screen.getByRole("link", { name: /ver grupo/i });
    expect(link).toHaveAttribute("href", "/grupos/g-42");
  });

  it("exibe a data de criação formatada em pt-BR", () => {
    renderCard(makeGroup({ created_at: "2026-01-15T00:00:00.000Z" }));
    // Expects "15 de jan. de 2026" or similar pt-BR format
    expect(screen.getByText(/jan\./i)).toBeInTheDocument();
  });
});
