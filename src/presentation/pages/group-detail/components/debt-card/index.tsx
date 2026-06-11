import { useRef, useState, type ChangeEvent } from "react";
import { Upload, CheckCircle2, Eye } from "lucide-react";
import type { Debt } from "../../../../../data/services/debt-service/debt.service";

function formatAmount(amount: string): string {
  const num = parseFloat(amount);
  if (isNaN(num)) return amount;
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(num);
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  pendente: { label: "Pendente", cls: "badge-warning" },
  pago: { label: "Pago", cls: "badge-success" },
  confirmado: { label: "Confirmado", cls: "badge-info" },
  cancelado: { label: "Cancelado", cls: "badge-error" },
};

const SPLIT_TYPE_MAP: Record<string, string> = {
  homogenea: "Igualitária",
};

interface DebtCardProps {
  debt: Debt;
  currentUserId?: string;
}

export function DebtCard({ debt, currentUserId }: DebtCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isGettingProof, setIsGettingProof] = useState(false);

  const isDebtAuthor = debt.creator_id === currentUserId;
  const status = STATUS_CONFIG[debt.status] ?? { label: debt.status, cls: "badge-ghost" };
  const splitLabel = SPLIT_TYPE_MAP[debt.split_type] ?? debt.split_type;
  const firstUnconfirmed = debt.participants.find((p) => !p.confirmed);

  const canUploadProof = !isDebtAuthor;
  const canConfirmPayment = isDebtAuthor && !!firstUnconfirmed;
  const canGetProof = !isDebtAuthor;

  function handleUploadProof(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.[0]) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }, 800);
  }

  function handleConfirmPayment() {
    setIsConfirming(true);
    setTimeout(() => setIsConfirming(false), 800);
  }

  function handleGetProof() {
    setIsGettingProof(true);
    setTimeout(() => setIsGettingProof(false), 500);
  }

  const hasActions = canUploadProof || canConfirmPayment || canGetProof;

  return (
    <div className="border border-base-content/8 rounded-xl p-4 flex flex-col gap-3 hover:border-base-content/15 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-[14px] text-base-content">{debt.title}</span>
            <span className={`badge badge-sm ${status.cls}`}>{status.label}</span>
            {splitLabel && <span className="badge badge-sm badge-ghost">{splitLabel}</span>}
          </div>
          <p className="text-primary font-bold text-[15px] mt-1.5">{formatAmount(debt.total_amount)}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[11px] text-base-content/40">{formatDate(debt.created_at)}</span>
            {debt.participants.length > 0 && (
              <span className="text-[11px] text-base-content/40">
                {debt.participants.length} participante{debt.participants.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </div>

      {hasActions && (
        <div className="flex items-center gap-2 pt-3 border-t border-base-content/6 flex-wrap">
          <input ref={fileInputRef} type="file" className="hidden" onChange={handleUploadProof} />

          {canUploadProof && (
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="btn btn-sm rounded-xl font-medium text-xs gap-1.5 h-9 border-none bg-transparent text-base-content/70 hover:bg-base-200 hover:text-base-content shadow-none"
            >
              {isUploading
                ? <span className="loading loading-spinner loading-xs" />
                : <Upload size={13} />}
              Enviar comprovante
            </button>
          )}

          {canConfirmPayment && (
            <button
              onClick={handleConfirmPayment}
              disabled={isConfirming}
              className="btn btn-sm rounded-xl font-medium text-xs gap-1.5 h-9 border-none bg-transparent text-success hover:bg-success/10 hover:text-success shadow-none"
            >
              {isConfirming
                ? <span className="loading loading-spinner loading-xs" />
                : <CheckCircle2 size={13} />}
              Confirmar pagamento
            </button>
          )}

          {canGetProof && (
            <button
              onClick={handleGetProof}
              disabled={isGettingProof}
              className="btn btn-sm rounded-xl font-medium text-xs gap-1.5 h-9 border-none bg-transparent text-base-content/70 hover:bg-base-200 hover:text-base-content shadow-none"
            >
              {isGettingProof
                ? <span className="loading loading-spinner loading-xs" />
                : <Eye size={13} />}
              Ver comprovante
            </button>
          )}
        </div>
      )}
    </div>
  );
}
