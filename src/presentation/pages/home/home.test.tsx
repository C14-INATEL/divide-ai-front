import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Home } from ".";
import * as groupService from "../../../data/services/group-service/group.service";
import type { Group } from "../../../data/services/group-service/group.service";
import type { Group } from "../../../data/services/group-service/group.service";

vi.mock("../../../data/services/group-service/group.service", () => ({
  getGroups: vi.fn(),
}));

describe("Home Component", () => {
  const mockMember = (id: string) => ({
    user_id: id,
    joined_at: "2026-01-01T00:00:00.000Z",
    user: { id, name: `User ${id}`, email: `${id}@test.com` },
  });

  const mockGroups: Group[] = [
    { id: "1", name: "Casamento maio/2027", creator_id: "user_1", is_owner: true,
      created_at: "2026-05-01T12:00:00.000Z", updated_at: "2026-05-01T12:00:00.000Z",
      members: [mockMember("m1"), mockMember("m2")] },
    { id: "2", name: "Churrasco na casa do Pizzoni", creator_id: "user_1", is_owner: true,
      created_at: "2026-05-02T12:00:00.000Z", updated_at: "2026-05-02T12:00:00.000Z",
      members: [mockMember("m3")] },
    { id: "3", name: "Presente para o Juliano", creator_id: "user_2", is_owner: false,
      created_at: "2026-05-03T12:00:00.000Z", updated_at: "2026-05-03T12:00:00.000Z",
      members: [] },
  ];

  beforeEach(() => {
    vi.mocked(groupService.getGroups).mockResolvedValue(mockGroups);
  });

  it("deve renderizar o título principal do aplicativo", async () => {
    render(<Home />);
    expect(await screen.findByText("Divide Ai")).toBeInTheDocument();
  });

  it("deve renderizar o botão de 'Novo Grupo'", async () => {
    render(<Home />);
    expect(await screen.findByRole("button", { name: /novo grupo/i })).toBeInTheDocument();
  });

  it("deve listar corretamente os grupos vindos do mock", async () => {
    render(<Home />);
    expect(await screen.findByText("Casamento maio/2027")).toBeInTheDocument();
    expect(screen.getByText("Churrasco na casa do Pizzoni")).toBeInTheDocument();
    expect(screen.getByText("Presente para o Juliano")).toBeInTheDocument();
  });

  it("deve exibir a contagem de membros de cada grupo", async () => {
  it("deve exibir a contagem de membros de cada grupo", async () => {
    render(<Home />);
    await screen.findByText("Casamento maio/2027");
    expect(screen.getByText("2 membros")).toBeInTheDocument();
    expect(screen.getByText("1 membro")).toBeInTheDocument();
    expect(screen.getByText("0 membros")).toBeInTheDocument();
    expect(screen.getByText("2 membros")).toBeInTheDocument();
    expect(screen.getByText("1 membro")).toBeInTheDocument();
    expect(screen.getByText("0 membros")).toBeInTheDocument();
  });

  it("deve renderizar estado vazio quando a API retornar um array vazio (Mock)", async () => {
    vi.mocked(groupService.getGroups).mockResolvedValueOnce([]);
    render(<Home />);
    expect(screen.getByText("Meus Grupos")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText("Casamento maio/2027")).not.toBeInTheDocument();
    });
  });

  it("deve lidar com erro na API sem travar a interface (Mock)", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(groupService.getGroups).mockRejectedValueOnce(new Error("Network Error"));
    render(<Home />);
    expect(screen.getByText("Divide Ai")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText("Casamento maio/2027")).not.toBeInTheDocument();
    });
    consoleSpy.mockRestore();
  });
});