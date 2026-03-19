import { NavLink } from "react-router";
import { LogOut, Wallet, X } from "lucide-react";
import { cn } from "../lib/cn";
import { getSidebarNavigation } from "../routes/routes";

interface SidebarProps {
  onClose?: () => void;
}


export function Sidebar({ onClose }: SidebarProps) {
  const sections = getSidebarNavigation();

  return (
    <aside className="bg-base-100 rounded-2xl h-full w-full flex flex-col shadow-sm border border-base-300/60 overflow-hidden">
      <div className="px-5 pt-5 pb-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-linear-to-br from-primary/90 to-primary rounded-xl flex items-center justify-center text-primary-content shadow-md">
            <Wallet size={18} strokeWidth={2.5} />
          </div>
          <span className="text-[15px] font-bold tracking-tight text-base-content">
            Divide Aí
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden btn btn-sm btn-circle border-none bg-transparent text-base-content/40 hover:bg-base-200 hover:text-base-content/60"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-3 space-y-5">
        {sections.map((section) => (
          <div key={section.key}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-base-content/40">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 group",
                          isActive
                            ? "bg-primary text-primary-content"
                            : "text-base-content/60 hover:bg-base-200 hover:text-base-content",
                        )
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon
                            size={18}
                            strokeWidth={isActive ? 2.25 : 1.75}
                            className={cn(
                              isActive
                                ? "text-primary-content/80"
                                : "text-base-content/40 group-hover:text-base-content/60",
                            )}
                          />
                          <span className="flex-1">{item.label}</span>
                          {item.badge !== undefined && (
                            <span
                              className={cn(
                                "badge badge-sm",
                                isActive
                                  ? "bg-primary-content/20 text-primary-content border-transparent"
                                  : "badge-primary badge-outline",
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="px-3 pb-2 shrink-0">
        <button className="flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium text-base-content/40 hover:bg-error/10 hover:text-error transition-all duration-150 w-full">
          <LogOut size={18} strokeWidth={1.75} />
          <span>Sair</span>
        </button>
      </div>

      <div className="px-3 pb-4 shrink-0">
        <div className="flex items-center gap-3 p-3 bg-base-200/80 rounded-xl border border-base-300">
          <div className="avatar">
            <div className="w-9 rounded-full ring-2 ring-base-100 shadow-sm">
              <img src="https://i.pravatar.cc/150?u=lucas" alt="Lucas M." />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-base-content truncate">
              Lucas M.
            </p>
            <p className="text-[11px] text-base-content/50 truncate">
              lucas@email.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
