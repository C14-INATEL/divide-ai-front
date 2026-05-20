import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, vi } from "vitest";
import { Register } from ".";
import { register } from "../../services/auth.service";

vi.mock("../../services/auth.service", () => ({
    register: vi.fn(),
}));

const registerMock = vi.mocked(register);

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
    registerMock.mockReset();
});

describe("Register", () => {
    describe("Mock de registro", () => {
        test("deve navegar para home quando registro retorna sucesso", async () => {
            registerMock.mockResolvedValueOnce({ token: "token-ok" });
            renderRegister();

            await userEvent.type(
                screen.getByPlaceholderText("Como chamamos voce?"),
                "João Silva",
            );
            await userEvent.type(
                screen.getByPlaceholderText("seu@email.com"),
                "joao@email.com",
            );
            await userEvent.type(
                screen.getByPlaceholderText("Crie uma senha forte"),
                "senha1234",
            );
            await userEvent.type(
                screen.getByPlaceholderText("Repita sua senha"),
                "senha1234",
            );
            await userEvent.click(
                screen.getByRole("button", { name: /comecar agora/i }),
            );

            expect(await screen.findByText("Home")).toBeInTheDocument();
            expect(registerMock).toHaveBeenCalledWith({
                name: "João Silva",
                email: "joao@email.com",
                password: "senha1234",
            });
        });

        test("deve mostrar erro quando registro retorna falha", async () => {
            registerMock.mockRejectedValueOnce(new Error("conflict"));
            renderRegister();

            await userEvent.type(
                screen.getByPlaceholderText("Como chamamos voce?"),
                "João Silva",
            );
            await userEvent.type(
                screen.getByPlaceholderText("seu@email.com"),
                "ja-existe@email.com",
            );
            await userEvent.type(
                screen.getByPlaceholderText("Crie uma senha forte"),
                "senha1234",
            );
            await userEvent.type(
                screen.getByPlaceholderText("Repita sua senha"),
                "senha1234",
            );
            await userEvent.click(
                screen.getByRole("button", { name: /comecar agora/i }),
            );

            expect(await screen.findByRole("alert")).toHaveTextContent(
                "Erro ao criar conta. Tente novamente.",
            );
        });

        test("deve mostrar erro quando senhas não coincidem, sem chamar o serviço", async () => {
            renderRegister();

            await userEvent.type(
                screen.getByPlaceholderText("Como chamamos voce?"),
                "João Silva",
            );
            await userEvent.type(
                screen.getByPlaceholderText("seu@email.com"),
                "joao@email.com",
            );
            await userEvent.type(
                screen.getByPlaceholderText("Crie uma senha forte"),
                "senha1234",
            );
            await userEvent.type(
                screen.getByPlaceholderText("Repita sua senha"),
                "outrasenha",
            );
            await userEvent.click(
                screen.getByRole("button", { name: /comecar agora/i }),
            );

            expect(await screen.findByRole("alert")).toHaveTextContent(
                "As senhas não coincidem.",
            );
            expect(registerMock).not.toHaveBeenCalled();
        });
    });

    test("should render name, email, password and confirm password inputs", () => {
        renderRegister();
        expect(
            screen.getByPlaceholderText("Como chamamos voce?"),
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("seu@email.com"),
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Crie uma senha forte"),
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText("Repita sua senha"),
        ).toBeInTheDocument();
    });

    test("should render the submit button with correct text", () => {
        renderRegister();
        expect(
            screen.getByRole("button", { name: /comecar agora/i }),
        ).toBeInTheDocument();
    });

    test("should start with password fields hidden", () => {
        renderRegister();
        expect(
            screen.getByPlaceholderText("Crie uma senha forte"),
        ).toHaveAttribute("type", "password");
        expect(screen.getByPlaceholderText("Repita sua senha")).toHaveAttribute(
            "type",
            "password",
        );
    });

    test("should toggle password visibility when clicking the eye button", async () => {
        renderRegister();
        const passwordInput = screen.getByPlaceholderText(
            "Crie uma senha forte",
        );
        const toggleButton =
            passwordInput.parentElement?.querySelector("button");
        if (!toggleButton) throw new Error("Toggle button não encontrado");

        await userEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute("type", "text");

        await userEvent.click(toggleButton);
        expect(passwordInput).toHaveAttribute("type", "password");
    });

    test("should toggle confirm password visibility when clicking the eye button", async () => {
        renderRegister();
        const confirmInput = screen.getByPlaceholderText("Repita sua senha");
        const toggleButton =
            confirmInput.parentElement?.querySelector("button");
        if (!toggleButton) throw new Error("Toggle button não encontrado");

        await userEvent.click(toggleButton);
        expect(confirmInput).toHaveAttribute("type", "text");

        await userEvent.click(toggleButton);
        expect(confirmInput).toHaveAttribute("type", "password");
    });

    test("should call register with correct data on form submission", async () => {
        registerMock.mockResolvedValueOnce({ token: "submit-ok" });
        renderRegister();

        await userEvent.type(
            screen.getByPlaceholderText("Como chamamos voce?"),
            "Maria Souza",
        );
        await userEvent.type(
            screen.getByPlaceholderText("seu@email.com"),
            "maria@email.com",
        );
        await userEvent.type(
            screen.getByPlaceholderText("Crie uma senha forte"),
            "minhasenha",
        );
        await userEvent.type(
            screen.getByPlaceholderText("Repita sua senha"),
            "minhasenha",
        );
        await userEvent.click(
            screen.getByRole("button", { name: /comecar agora/i }),
        );

        expect(registerMock).toHaveBeenCalledWith({
            name: "Maria Souza",
            email: "maria@email.com",
            password: "minhasenha",
        });
    });
});
