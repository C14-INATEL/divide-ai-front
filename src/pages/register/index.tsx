import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import { register } from "../../services/auth.service";

export function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
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
            await register({ name, email, password });
            navigate("/");
        } catch {
            setErrorMessage("Erro ao criar conta. Tente novamente.");
        }
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <fieldset className="fieldset">
                <label
                    htmlFor="reg-name"
                    className="fieldset-label text-xs font-semibold uppercase tracking-wider text-base-content/50"
                >
                    Nome
                </label>
                <input
                    type="text"
                    id="reg-name"
                    placeholder="Como chamamos voce?"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered w-full rounded-xl transition-all duration-300 hover:border-base-content/10 focus:input-primary focus:border-primary/50"
                />
            </fieldset>

            <fieldset className="fieldset">
                <label
                    htmlFor="reg-email"
                    className="fieldset-label text-xs font-semibold uppercase tracking-wider text-base-content/50"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="reg-email"
                    placeholder="seu@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input input-bordered w-full rounded-xl transition-all duration-300 hover:border-base-content/10 focus:input-primary focus:border-primary/50"
                />
            </fieldset>

            <fieldset className="fieldset">
                <label
                    htmlFor="reg-pass"
                    className="fieldset-label text-xs font-semibold uppercase tracking-wider text-base-content/50"
                >
                    Senha
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="reg-pass"
                        placeholder="Crie uma senha forte"
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input input-bordered w-full rounded-xl pr-10 transition-all duration-300 hover:border-base-content/10 focus:input-primary focus:border-primary/50"
                    />
                    <button
                        type="button"
                        className="btn btn-ghost btn-xs btn-circle absolute right-2 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-base-content/60"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff size={15} />
                        ) : (
                            <Eye size={15} />
                        )}
                    </button>
                </div>
            </fieldset>

            <fieldset className="fieldset">
                <label
                    htmlFor="reg-confirm"
                    className="fieldset-label text-xs font-semibold uppercase tracking-wider text-base-content/50"
                >
                    Confirmar senha
                </label>
                <div className="relative">
                    <input
                        type={showConfirm ? "text" : "password"}
                        id="reg-confirm"
                        placeholder="Repita sua senha"
                        required
                        minLength={8}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="input input-bordered w-full rounded-xl pr-10 transition-all duration-300 hover:border-base-content/10 focus:input-primary focus:border-primary/50"
                    />
                    <button
                        type="button"
                        className="btn btn-ghost btn-xs btn-circle absolute right-2 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-base-content/60"
                        onClick={() => setShowConfirm(!showConfirm)}
                    >
                        {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
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
                Comecar agora
                <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                />
            </button>
        </form>
    );
}
