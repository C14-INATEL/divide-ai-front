import { Moon, Sun } from "lucide-react";

export function ThemeSwapper() {
    return (
        <label className="swap swap-rotate">
            <input type="checkbox" className="theme-controller" value="dark" />
            <Sun size={20} className="swap-on text-base-content/50" />
            <Moon size={20} className="swap-off text-base-content/50" />
        </label>
    );
}
