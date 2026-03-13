import { Moon, Sun } from "lucide-react";

const ThemeSwapper = () => {
    return (
        <label className="swap swap-rotate">
            <input type="checkbox" className="theme-controller" value="dark" />
            <Sun size={20} className="swap-on" />
            <Moon size={20} className="swap-off" />
        </label>
    );
};
export default ThemeSwapper;
