import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, vi } from "vitest";
import { Login } from ".";
import { login } from "../../../data/services/auth-service/auth.service";

vi.mock("../../../data/services/auth-service/auth.service", () => ({
  login: vi.fn(),
}));

const loginMock = vi.mocked(login);

function renderLogin() {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  loginMock.mockReset();
});

describe("Login", () => {
  describe("Mock de login", () => {
    test("deve navegar para home quando login retorna sucesso", async () => {
      loginMock.mockResolvedValueOnce({ access_token: "token-ok", token_type: "bearer" });
      renderLogin();

      await userEvent.type(
        screen.getByPlaceholderText("seu@email.com"),
        "ok@email.com",
      );
      await userEvent.type(screen.getByPlaceholderText("********"), "12345678");
      await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

      expect(await screen.findByText("Home")).toBeInTheDocument();
      expect(loginMock).toHaveBeenCalledWith({
        email: "ok@email.com",
        password: "12345678",
      });
    });

    test("deve mostrar erro quando login retorna falha", async () => {
      loginMock.mockRejectedValueOnce(new Error("invalid"));
      renderLogin();

      await userEvent.type(
        screen.getByPlaceholderText("seu@email.com"),
        "erro@email.com",
      );
      await userEvent.type(
        screen.getByPlaceholderText("********"),
        "senhaerrada",
      );
      await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

      expect(await screen.findByRole("alert")).toHaveTextContent(
        "Email ou senha inválidos.",
      );
    });
  });

  test("should render email and password inputs", () => {
    renderLogin();
    expect(screen.getByPlaceholderText("seu@email.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("********")).toBeInTheDocument();
  });

  test("should render the submit button with correct text", () => {
    renderLogin();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  test("should render the 'Esqueceu a senha?' link", () => {
    renderLogin();
    expect(screen.getByText("Esqueceu a senha?")).toBeInTheDocument();
  });

  test("should start with password field hidden", () => {
    renderLogin();
    const passwordInput = screen.getByPlaceholderText("********");
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("should toggle password visibility when clicking the eye button", async () => {
    renderLogin();
    const passwordInput = screen.getByPlaceholderText("********");
    const toggleButton = passwordInput.parentElement?.querySelector("button");
    if (!toggleButton) {
      throw new Error("Toggle button não encontrado");
    }

    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("should call login on form submission", async () => {
    loginMock.mockResolvedValueOnce({ access_token: "submit-ok", token_type: "bearer" });
    renderLogin();
    const emailInput = screen.getByPlaceholderText("seu@email.com");
    const passwordInput = screen.getByPlaceholderText("********");
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    await userEvent.type(emailInput, "test@email.com");
    await userEvent.type(passwordInput, "12345678");
    await userEvent.click(submitButton);

    expect(loginMock).toHaveBeenCalledWith({
      email: "test@email.com",
      password: "12345678",
    });
  });
});
