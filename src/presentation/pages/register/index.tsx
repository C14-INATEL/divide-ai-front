import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { createUser } from "../../../data/services/user-service/user.service";
import type { PixKeyType } from "../../../data/services/user-service/user.service";
import { setToken } from "../../../domain/utils/auth/auth";

const PIX_KEY_PLACEHOLDERS: Record<PixKeyType, string> = {
  cpf: "000.000.000-00",
  email: "seu@email.com",
  phone: "+55 00 00000-0000",
  random: "Chave aleatória gerada pelo banco",
};

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pixKeyType, setPixKeyType] = useState<PixKeyType>("cpf");
  const [pixKey, setPixKey] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    try {
      const response = await createUser({ name, email, password, pix_key: pixKey, pix_key_type: pixKeyType });
      setToken(response.token);
      navigate("/");
    } catch {
      setErrorMessage("Erro ao criar conta. Tente novamente.");
    }
  }

  const labelClass = "fieldset-label text-xs font-semibold uppercase tracking-wider text-base-content/50";
  const inputClass = "input input-bordered w-full rounded-xl transition-all duration-300 hover:border-base-content/10 focus:input-primary focus:border-primary/50";

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <fieldset className="fieldset">
        <label htmlFor="reg-name" className={labelClass}>Nome</label>
        <input
          type="text"
          id="reg-name"
          placeholder="Como chamamos voce?"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />
      </fieldset>

      <fieldset className="fieldset">
        <label htmlFor="reg-email" className={labelClass}>Email</label>
        <input
          type="email"
          id="reg-email"
          placeholder="seu@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </fieldset>

      <div className="grid grid-cols-2 gap-3">
        <fieldset className="fieldset">
          <label htmlFor="reg-pass" className={labelClass}>Senha</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="reg-pass"
              placeholder="••••••••"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} pr-9`}
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
          <label htmlFor="reg-confirm" className={labelClass}>Confirmar</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              id="reg-confirm"
              placeholder="••••••••"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`${inputClass} pr-9`}
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

      <div className="grid grid-cols-2 gap-3">
        <fieldset className="fieldset">
          <label htmlFor="reg-pix-type" className={labelClass}>Tipo Pix</label>
          <select
            id="reg-pix-type"
            value={pixKeyType}
            onChange={(e) => {
              setPixKeyType(e.target.value as PixKeyType);
              setPixKey("");
            }}
            className="select select-bordered w-full rounded-xl transition-all duration-300 hover:border-base-content/10 focus:select-primary focus:border-primary/50"
          >
            <option value="cpf">CPF</option>
            <option value="email">E-mail</option>
            <option value="phone">Telefone</option>
            <option value="random">Aleatória</option>
          </select>
        </fieldset>

        <fieldset className="fieldset">
          <label htmlFor="reg-pix-key" className={labelClass}>Chave Pix</label>
          <input
            type="text"
            id="reg-pix-key"
            placeholder={PIX_KEY_PLACEHOLDERS[pixKeyType]}
            required
            value={pixKey}
            onChange={(e) => setPixKey(e.target.value)}
            className={inputClass}
          />
        </fieldset>
      </div>

      {errorMessage && (
        <p role="alert" className="text-sm text-error">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 group mt-1"
      >
        Comecar agora
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
    </form>
  );
}
