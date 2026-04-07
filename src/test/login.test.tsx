import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { Login } from "../pages/login";

function renderLogin() {
  return render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );
}

describe("Login", () => {
  test("should render email and password inputs", () => {
    renderLogin();
    expect(screen.getByPlaceholderText("seu@email.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("********")).toBeInTheDocument();
  });

  test("should render the submit button with correct text", () => {
    renderLogin();
    expect(screen.getByRole("button", { name: "entrar" })).toBeInTheDocument();
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
    const toggleButton = passwordInput.parentElement!.querySelector("button")!;

    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("should not reload the page on form submission", async () => {
    renderLogin();
    const emailInput = screen.getByPlaceholderText("seu@email.com");
    const passwordInput = screen.getByPlaceholderText("********");
    const submitButton = screen.getByRole("button", { name: /entrar/i });

    await userEvent.type(emailInput, "test@email.com");
    await userEvent.type(passwordInput, "12345678");
    await userEvent.click(submitButton);

    expect(emailInput).toBeInTheDocument();
  });
});
