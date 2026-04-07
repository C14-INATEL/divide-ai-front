import { Outlet, Link, useLocation } from "react-router";
import { ThemeSwapper } from "../theme-swapper";
import { routes } from "../../routes/routes";
import { Wallet } from "lucide-react";

export function AuthLayout() {
  const location = useLocation();
  const isLogin = location.pathname === routes.LOGIN.path;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-base-200 text-base-content overflow-x-hidden relative">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% -20%, oklch(from var(--color-primary) l c h / 0.10), transparent)",
        }}
      />

      <div className="hidden lg:flex relative w-[45%] shrink-0 min-h-screen p-10 flex-col justify-between border-r border-base-content/4 overflow-hidden z-10">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundSize: "48px 48px",
            backgroundImage:
              "linear-gradient(to right, oklch(from var(--color-primary) l c h / 0.04) 1px, transparent 1px), linear-gradient(to bottom, oklch(from var(--color-primary) l c h / 0.04) 1px, transparent 1px)",
            maskImage: "linear-gradient(to bottom, white 40%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, white 40%, transparent)",
          }}
        />

        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full blur-[100px] -z-10 bg-primary/10" />

        <div className="absolute left-[30%] top-0 w-px h-full animate-auth-scan pointer-events-none bg-linear-to-b from-transparent via-primary/40 to-transparent" />

        <div className="animate-auth-fade-up flex items-center gap-2.5">
          <div className="w-9 h-9 bg-linear-to-br from-primary/90 to-primary rounded-xl flex items-center justify-center text-primary-content shadow-md">
            <Wallet size={18} strokeWidth={2.5} />
          </div>
          <span className="text-[15px] font-bold tracking-tight">Divide Ai</span>
        </div>

        <div className="animate-auth-fade-up auth-delay-200">
          <div className="badge badge-outline badge-primary gap-2 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Plataforma inteligente
          </div>

          <h1 className="text-3xl font-bold tracking-tight leading-tight mb-4">
            Contas claras,
            <br />
            <span className="text-primary">amizades preservadas.</span>
          </h1>

          <p className="text-sm leading-relaxed text-base-content/50">
            Organize despesas da casa, da viagem ou do role. Sem planilhas, sem
            cobrancas constrangedoras.
          </p>
        </div>

        <div className="animate-auth-fade-up auth-delay-300">
          <div className="stats stats-vertical bg-base-100/50 border border-base-content/5 shadow-sm">
            <div className="stat py-3 px-4">
              <div className="stat-title text-xs">Usuarios ativos</div>
              <div className="stat-value text-primary text-lg">2.4k+</div>
            </div>
            <div className="stat py-3 px-4">
              <div className="stat-title text-xs">Despesas divididas</div>
              <div className="stat-value text-lg">R$ 1.2M</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex-1 p-4 sm:p-8 lg:p-16 flex flex-col justify-center animate-auth-fade-up auth-delay-300 z-10">
        <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between">
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-8 h-8 bg-linear-to-br from-primary/90 to-primary rounded-lg flex items-center justify-center text-primary-content shadow-md">
              <Wallet size={14} strokeWidth={2.5} />
            </div>
            <span className="text-sm font-bold tracking-tight">Divide Ai</span>
          </div>
          <div className="hidden lg:block" />
          <ThemeSwapper />
        </div>

        <div className="card w-full max-w-sm mx-auto bg-base-100 shadow-xl border border-base-content/6 overflow-visible">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, oklch(from var(--color-primary) l c h / 0.35), transparent)",
            }}
          />

          <div className="card-body p-8">
            <h2 className="card-title text-xl font-semibold tracking-tight mb-1">
              {isLogin ? "Acessar painel" : "Criar nova conta"}
            </h2>
            <p className="text-sm text-base-content/40 mb-6">
              {isLogin
                ? "Entre para gerenciar suas despesas"
                : "Comece a dividir com seus amigos"}
            </p>

            <Outlet />

            <div className="divider text-xs text-base-content/30 mt-6 mb-2">ou</div>

            <div className="text-center">
              {isLogin ? (
                <Link
                  to={routes.REGISTER.path}
                  className="link link-hover text-sm text-base-content/50"
                >
                  Nao tem conta?{" "}
                  <span className="text-primary font-semibold">Criar agora</span>
                </Link>
              ) : (
                <Link
                  to={routes.LOGIN.path}
                  className="link link-hover text-sm text-base-content/50"
                >
                  Ja tem conta?{" "}
                  <span className="text-primary font-semibold">Entrar</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
