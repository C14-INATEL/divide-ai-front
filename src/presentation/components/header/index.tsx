import {
  Bell,
  CreditCard,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  User,
} from "lucide-react";
import { ThemeSwapper } from "../theme-swapper";
import { useModalStore } from "../../store/modal.store";
import { useAuthStore } from "../../store/auth.store";
import { getAvatarUrl } from "../../../domain/utils/avatar/avatar";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { openModal } = useModalStore();
  const { user } = useAuthStore();
  return (
    <header className="bg-base-100 rounded-2xl shadow-sm border border-base-300/60 px-4 sm:px-5 py-3 flex items-center gap-3 shrink-0">
      <button
        onClick={onMenuClick}
        className="lg:hidden btn btn-sm btn-circle border-none bg-transparent text-base-content/50 hover:bg-base-200 hover:text-base-content/70"
        aria-label="Abrir menu"
      >
        <Menu size={20} />
      </button>

      {/* <div className="relative flex-1 max-w-sm">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
        />
        <input
          type="text"
          placeholder="Buscar grupos, despesas..."
          className="input input-sm w-full pl-9 pr-14 bg-base-200/80 border-base-300/80 rounded-xl text-[13px] placeholder:text-base-content/40 focus:bg-base-100 focus:border-primary/40 focus:outline-none transition-colors h-9"
        />
      </div> */}

      <div className="flex-1" />

      <div className="hidden sm:flex items-center gap-2">
        <button
          type="button"
          onClick={() => openModal("create-group")}
          className="btn btn-sm rounded-xl font-medium text-xs gap-1.5 h-9 border-none bg-transparent text-base-content/70 hover:bg-base-200 hover:text-base-content shadow-none"
        >
          <Plus size={14} />
          Novo Grupo
        </button>
        <button
          type="button"
          onClick={() => openModal("create-debt")}
          className="btn btn-sm btn-primary rounded-xl font-medium text-xs gap-1.5 h-9"
        >
          <CreditCard size={14} />
          Nova Divida
        </button>
      </div>

      <div className="w-px h-6 bg-base-300/80 hidden sm:block" />

      <ThemeSwapper />
      {/* <div className="indicator">
        <span className="indicator-item badge badge-xs badge-error right-1 top-1" />
        <button
          className="btn btn-sm btn-circle border-none bg-transparent text-base-content/50 hover:bg-base-200 hover:text-base-content/70"
          aria-label="Notificações"
        >
          <Bell size={19} />
        </button>
      </div> */}

      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity pl-1"
        >
          <div className="avatar">
            <div className="w-8 rounded-full ring-2 ring-base-200">
              <img
                src={user ? getAvatarUrl(user.name) : ""}
                alt={user?.name ?? ""}
              />
            </div>
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-semibold text-base-content leading-tight truncate max-w-30">
              {user?.name}
            </p>
            <p className="text-[10px] text-base-content/50 leading-tight truncate max-w-30">
              {user?.email}
            </p>
          </div>
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content z-50 menu p-1.5 shadow-xl bg-base-100 rounded-2xl w-52 mt-3 border border-base-300/80"
        >
          <div className="px-3 py-2.5 mb-1">
            <p className="text-sm font-semibold text-base-content truncate">
              {user?.name}
            </p>
            <p className="text-xs text-base-content/50 truncate">
              {user?.email}
            </p>
          </div>
          <div className="h-px bg-base-200 mx-2 mb-1" />

          <li>
            <a className="text-[13px] text-base-content/60 hover:bg-base-200 rounded-xl gap-2.5">
              <User size={15} /> Meu Perfil
            </a>
          </li>
          <li>
            <a className="text-[13px] text-base-content/60 hover:bg-base-200 rounded-xl gap-2.5">
              <Settings size={15} /> Configurações
            </a>
          </li>

          <div className="h-px bg-base-200 mx-2 my-1" />

          <li>
            <a className="text-[13px] text-error hover:bg-error/10 rounded-xl gap-2.5">
              <LogOut size={15} /> Sair
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
