import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { PublicOnlyGuard } from "./public-only-guard";
import * as auth from "../../../domain/utils/auth/auth";

vi.mock("../../../domain/utils/auth/auth");

const isAuthenticatedMock = vi.mocked(auth.isAuthenticated);

function renderGuard() {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicOnlyGuard>
              <div>Página de login</div>
            </PublicOnlyGuard>
          }
        />
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("PublicOnlyGuard", () => {
  beforeEach(() => {
    isAuthenticatedMock.mockReset();
  });

  it("deve renderizar os filhos quando o usuário não está autenticado", () => {
    // arrange
    isAuthenticatedMock.mockReturnValue(false);

    // act
    renderGuard();

    // assert
    expect(screen.getByText("Página de login")).toBeInTheDocument();
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });

  it("deve redirecionar para / quando o usuário já está autenticado", () => {
    // arrange
    isAuthenticatedMock.mockReturnValue(true);

    // act
    renderGuard();

    // assert
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.queryByText("Página de login")).not.toBeInTheDocument();
  });
});
