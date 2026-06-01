import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <form className="space-y-3">
      <fieldset className="fieldset">
        <label className="fieldset-label text-xs font-semibold uppercase tracking-wider text-base-content/50">
          Nome
        </label>
        <input
          type="text"
          placeholder="Como chamamos você?"
          required
          className="input input-bordered w-full rounded-xl transition-all duration-300 hover:border-base-content/10 focus:input-primary focus:border-primary/50"
        />
      </fieldset>

      <fieldset className="fieldset">
        <label className="fieldset-label text-xs font-semibold uppercase tracking-wider text-base-content/50">
          Email
        </label>
        <input
          type="email"
          placeholder="seu@email.com"
          required
          className="input input-bordered w-full rounded-xl transition-all duration-300 hover:border-base-content/10 focus:input-primary focus:border-primary/50"
        />
      </fieldset>

      <div className="grid grid-cols-2 gap-3">
        <fieldset className="fieldset">
          <label className="fieldset-label text-xs font-semibold uppercase tracking-wider text-base-content/50">
            Senha
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              minLength={8}
              className="input input-bordered w-full rounded-xl pr-9 transition-all duration-300 hover:border-base-content/10 focus:input-primary focus:border-primary/50"
            />
            <button
              type="button"
              className="btn btn-ghost btn-xs btn-circle absolute right-2 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-base-content/60"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </fieldset>

        <fieldset className="fieldset">
          <label className="fieldset-label text-xs font-semibold uppercase tracking-wider text-base-content/50">
            Confirmar
          </label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="••••••••"
              required
              minLength={8}
              className="input input-bordered w-full rounded-xl pr-9 transition-all duration-300 hover:border-base-content/10 focus:input-primary focus:border-primary/50"
            />
            <button
              type="button"
              className="btn btn-ghost btn-xs btn-circle absolute right-2 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-base-content/60"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </fieldset>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 group mt-1"
      >
        Começar agora
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
    </form>
  );
}
