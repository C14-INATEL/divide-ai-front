import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Home } from ".";
import * as groupService from "../../../data/services/group-service/group.service";

vi.mock("../../../data/services/group-service/group.service", () => ({
  getGroups: vi.fn(),
}));

describe("Home Component", () => {
  const mockGroups = [
    { id: 1, name: "Casamento maio/2027", value: 1500.0 },
    { id: 2, name: "Churrasco na casa do Pizzoni", value: 45.5 },
    { id: 3, name: "Presente para o Juliano", value: 0 },
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

  it("deve aplicar as cores corretas para dívidas e contas quitadas", async () => {
    render(<Home />);
    await screen.findByText("Casamento maio/2027");

    const debtTexts = screen.getAllByText(/Você deve: R\$/i);
    expect(debtTexts[0]).toHaveClass("text-error");

    const settledText = screen.getByText("Tudo quite!");
    expect(settledText).toHaveClass("text-success");
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
