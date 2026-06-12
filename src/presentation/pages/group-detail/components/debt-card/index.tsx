import type { Debt } from "../../../../../data/services/debt-service/debt.service";

function formatAmount(amount: string | number): string {
  const num = typeof amount === "number" ? amount : parseFloat(amount);
  if (isNaN(num)) return String(amount);
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

export function DebtCard({ debt }: DebtCardProps) {
  const status = STATUS_CONFIG[debt.status] ?? { label: debt.status, cls: "badge-ghost" };
  const splitLabel = SPLIT_TYPE_MAP[debt.split_type] ?? debt.split_type;

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
            {debt.participants!.length > 0 && (
              <span className="text-[11px] text-base-content/40">
                {debt.participants!.length} participante{debt.participants!.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
