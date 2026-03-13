import { Bell, Menu } from "lucide-react";
import ThemeSwapper from "./ThemeSwapper";

const Navbar = () => {
    return (
        <div className="navbar bg-base-200 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle"
                    >
                        <Menu size={20} />
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <a>Página 1</a>
                        </li>
                        <li>
                            <a>Página 2</a>
                        </li>
                        <li>
                            <a>Página 3</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl">Divide Aí</a>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                    <ThemeSwapper />
                </button>
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <Bell size={20} />
                        {/* <span className="badge badge-xs badge-primary indicator-item"></span> */}
                    </div>
                </button>
            </div>
        </div>
    );
};
export default Navbar;
