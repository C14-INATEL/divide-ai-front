import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeSwapper } from ".";

describe("ThemeSwapper", () => {
    test("should render the theme control checkbox", () => {
        render(<ThemeSwapper />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeInTheDocument();
    });

    test("should start unchecked (light theme active by default)", () => {
        render(<ThemeSwapper />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();
    });

    test("should become checked when clicked once (activates dark theme)", async () => {
        render(<ThemeSwapper />);
        const checkbox = screen.getByRole("checkbox");
        await userEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });

    test("should not render more than one checkbox", () => {
        render(<ThemeSwapper />);
        const checkboxes = screen.getAllByRole("checkbox");
        expect(checkboxes).toHaveLength(1);
    });

    test('should not have a value other than "dark"', () => {
        render(<ThemeSwapper />);
        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toHaveAttribute("value", "light");
        expect(checkbox).not.toHaveAttribute("value", "system");
        expect(checkbox).toHaveAttribute("value", "dark");
    });

    test("should not remain checked after two clicks (returns to initial state)", async () => {
        render(<ThemeSwapper />);
        const checkbox = screen.getByRole("checkbox");
        await userEvent.click(checkbox);
        await userEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });
});
