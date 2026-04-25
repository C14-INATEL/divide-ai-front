import { useId, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { login } from "../../services/auth.service.ts";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const emailId = useId();
  const passwordId = useId();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    try {
      await login({ email, password });
      navigate("/");
    } catch {
      setErrorMessage("Email ou senha inválidos.");
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <fieldset className="fieldset">
        <label htmlFor={emailId} className="fieldset-label text-xs font-semibold uppercase tracking-wider text-base-content/50">
          Email
        </label>
        <input
          type="email"
          id={emailId}
          placeholder="seu@email.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full rounded-xl transition-all duration-300 hover:border-base-content/10 focus:input-primary focus:border-primary/50"
        />
      </fieldset>

      <fieldset className="fieldset">
        <label htmlFor={passwordId} className="fieldset-label text-xs font-semibold uppercase tracking-wider text-base-content/50">
          Senha
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id={passwordId}
            placeholder="********"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full rounded-xl pr-10 transition-all duration-300 hover:border-base-content/10 focus:input-primary focus:border-primary/50"
          />
          <button
            type="button"
            className="btn btn-ghost btn-xs btn-circle absolute right-2 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-base-content/60"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
        <div className="flex justify-end mt-1">
          <Link to="#" className="link link-primary text-xs">
            Esqueceu a senha?
          </Link>
        </div>
      </fieldset>
      {errorMessage && (
        <p role="alert" className="text-sm text-error">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 group mt-2"
      >
        Entrar
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>
    </form>
  );
}

