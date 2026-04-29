import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Home } from "./index";

describe("Home Component", () => {
  it("should render the main application title", () => {
    render(<Home />);
    const title = screen.getByText("Divide Ai");
    expect(title).toBeInTheDocument();
  });

  it('should render the "Novo Grupo" button', () => {
    render(<Home />);
    const newGroupButton = screen.getByRole("button", { name: /novo grupo/i });
    expect(newGroupButton).toBeInTheDocument();
  });

  it("should correctly list the mocked groups", () => {
    render(<Home />);
    expect(screen.getByText("Casamento maio/2027")).toBeInTheDocument();
    expect(
      screen.getByText("Churrasco na casa do Pizzoni"),
    ).toBeInTheDocument();
    expect(screen.getByText("Presente para o Juliano")).toBeInTheDocument();
  });

  it("should apply the correct text colors for debts and settled accounts", () => {
    render(<Home />);
    const debtTexts = screen.getAllByText(/Você deve: R\$/i);
    expect(debtTexts[0]).toHaveClass("text-error");

    const settledText = screen.getByText("Tudo quite!");
    expect(settledText).toHaveClass("text-success");
  });
});
