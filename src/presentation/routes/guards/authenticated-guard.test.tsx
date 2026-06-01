import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { AuthenticatedGuard } from "./authenticated-guard";
import * as auth from "../../../domain/utils/auth/auth";

vi.mock("../../../domain/utils/auth/auth");

const isAuthenticatedMock = vi.mocked(auth.isAuthenticated);

function renderGuard() {
  return render(
    <MemoryRouter initialEntries={["/painel"]}>
      <Routes>
        <Route
          path="/painel"
          element={
            <AuthenticatedGuard>
              <div>Conteúdo protegido</div>
            </AuthenticatedGuard>
          }
        />
        <Route path="/login" element={<div>Página de login</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("AuthenticatedGuard", () => {
  beforeEach(() => {
    isAuthenticatedMock.mockReset();
  });

  it("deve renderizar os filhos quando o usuário está autenticado", () => {
    // arrange
    isAuthenticatedMock.mockReturnValue(true);

    // act
    renderGuard();

    // assert
    expect(screen.getByText("Conteúdo protegido")).toBeInTheDocument();
    expect(screen.queryByText("Página de login")).not.toBeInTheDocument();
  });

  it("deve redirecionar para /login quando o usuário não está autenticado", () => {
    // arrange
    isAuthenticatedMock.mockReturnValue(false);

    // act
    renderGuard();

    // assert
    expect(screen.getByText("Página de login")).toBeInTheDocument();
    expect(screen.queryByText("Conteúdo protegido")).not.toBeInTheDocument();
  });
});
