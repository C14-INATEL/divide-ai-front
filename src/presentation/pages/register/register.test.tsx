import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, vi } from "vitest";
import { Register } from ".";
import { createUser } from "../../../data/services/user-service/user.service";

vi.mock("../../../data/services/user-service/user.service", () => ({
  createUser: vi.fn(),
}));

const createUserMock = vi.mocked(createUser);

function renderRegister() {
  return render(
    <MemoryRouter initialEntries={["/register"]}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  createUserMock.mockReset();
});

describe("Register", () => {
  describe("Mock de registro", () => {
    test("deve navegar para home quando registro retorna sucesso", async () => {
      createUserMock.mockResolvedValueOnce({ token: "token-ok" });
      renderRegister();

      await userEvent.type(screen.getByPlaceholderText("Como chamamos voce?"), "João Silva");
      await userEvent.type(screen.getByPlaceholderText("seu@email.com"), "joao@email.com");
      await userEvent.type(screen.getByLabelText("Senha"), "senha1234");
      await userEvent.type(screen.getByLabelText("Confirmar"), "senha1234");
      await userEvent.type(screen.getByPlaceholderText("000.000.000-00"), "123.456.789-00");
      await userEvent.click(screen.getByRole("button", { name: /comecar agora/i }));

      screen.debug();

      expect(await screen.findByText("Home")).toBeInTheDocument();
      expect(createUserMock).toHaveBeenCalledWith({
        name: "João Silva",
        email: "joao@email.com",
        password: "senha1234",
        pix_key: "123.456.789-00",
        pix_key_type: "cpf",
      },);
    },10000 );

    test("deve mostrar erro quando registro retorna falha", async () => {
      createUserMock.mockRejectedValueOnce(new Error("conflict"));
      renderRegister();

      await userEvent.type(screen.getByPlaceholderText("Como chamamos voce?"), "João Silva");
      await userEvent.type(screen.getByPlaceholderText("seu@email.com"), "ja-existe@email.com");
      await userEvent.type(screen.getByLabelText("Senha"), "senha1234");
      await userEvent.type(screen.getByLabelText("Confirmar"), "senha1234");
      await userEvent.type(screen.getByPlaceholderText("000.000.000-00"), "123.456.789-00");
      await userEvent.click(screen.getByRole("button", { name: /comecar agora/i }));

      expect(await screen.findByRole("alert")).toHaveTextContent(
        "Erro ao criar conta. Tente novamente.",
      );
    }, 10000);

    test("deve mostrar erro quando senhas não coincidem, sem chamar o serviço", async () => {
      renderRegister();

      await userEvent.type(screen.getByPlaceholderText("Como chamamos voce?"), "João Silva");
      await userEvent.type(screen.getByPlaceholderText("seu@email.com"), "joao@email.com");
      await userEvent.type(screen.getByLabelText("Senha"), "senha1234");
      await userEvent.type(screen.getByLabelText("Confirmar"), "outrasenha");
      await userEvent.type(screen.getByPlaceholderText("000.000.000-00"), "123.456.789-00");
      await userEvent.click(screen.getByRole("button", { name: /comecar agora/i }));

      expect(await screen.findByRole("alert")).toHaveTextContent("As senhas não coincidem.");
      expect(createUserMock).not.toHaveBeenCalled();
    });

    test("deve enviar pix_key_type correto ao selecionar tipo E-mail", async () => {
      createUserMock.mockResolvedValueOnce({ token: "token-ok" });
      renderRegister();

      await userEvent.type(screen.getByPlaceholderText("Como chamamos voce?"), "João Silva");
      await userEvent.type(screen.getByPlaceholderText("seu@email.com"), "joao@email.com");
      await userEvent.type(screen.getByLabelText("Senha"), "senha1234");
      await userEvent.type(screen.getByLabelText("Confirmar"), "senha1234");

      await userEvent.selectOptions(screen.getByRole("combobox"), "email");
      await userEvent.type(screen.getByRole("textbox", { name: "Chave Pix" }), "pix@email.com");

      await userEvent.click(screen.getByRole("button", { name: /comecar agora/i }));

      expect(createUserMock).toHaveBeenCalledWith(
        expect.objectContaining({ pix_key_type: "email", pix_key: "pix@email.com" }),
      );
    });
  });

  test("should render all form fields", () => {
    renderRegister();
    expect(screen.getByPlaceholderText("Como chamamos voce?")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("seu@email.com")).toBeInTheDocument();
    expect(screen.getByLabelText("Senha")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirmar")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("000.000.000-00")).toBeInTheDocument();
  });

  test("should render the submit button with correct text", () => {
    renderRegister();
    expect(screen.getByRole("button", { name: /comecar agora/i })).toBeInTheDocument();
  });

  test("should start with password fields hidden", () => {
    renderRegister();
    expect(screen.getByLabelText("Senha")).toHaveAttribute("type", "password");
    expect(screen.getByLabelText("Confirmar")).toHaveAttribute("type", "password");
  });

  test("should toggle password visibility when clicking the eye button", async () => {
    renderRegister();
    const passwordInput = screen.getByLabelText("Senha");
    const toggleButton = passwordInput.parentElement?.querySelector("button");
    if (!toggleButton) throw new Error("Toggle button não encontrado");

    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("should toggle confirm password visibility when clicking the eye button", async () => {
    renderRegister();
    const confirmInput = screen.getByLabelText("Confirmar");
    const toggleButton = confirmInput.parentElement?.querySelector("button");
    if (!toggleButton) throw new Error("Toggle button não encontrado");

    await userEvent.click(toggleButton);
    expect(confirmInput).toHaveAttribute("type", "text");

    await userEvent.click(toggleButton);
    expect(confirmInput).toHaveAttribute("type", "password");
  });

  test("should update pix key placeholder when type changes", async () => {
    renderRegister();
    expect(screen.getByPlaceholderText("000.000.000-00")).toBeInTheDocument();

    await userEvent.selectOptions(screen.getByRole("combobox"), "phone");
    expect(screen.getByPlaceholderText("+55 00 00000-0000")).toBeInTheDocument();

    await userEvent.selectOptions(screen.getByRole("combobox"), "random");
    expect(screen.getByPlaceholderText("Chave aleatória gerada pelo banco")).toBeInTheDocument();
  });
});
