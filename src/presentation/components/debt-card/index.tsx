import {
  CheckCircle2,
  Eye,
  FileUp,
  Pencil,
  Trash2,
  Users,
  WalletCards,
} from "lucide-react";
import type {
  Debt,
  DebtParticipant,
} from "../../../data/services/debt-service/debt.service";

interface DebtCardProps {
  debt: Debt;
  currentUserId?: string;
  isCreator: boolean;
  onDelete: (debt: Debt) => void;
  onEdit: (debt: Debt) => void;
  onUploadProof: (debt: Debt, file: File) => void;
  onConfirm: (debt: Debt, participant: DebtParticipant) => void;
  onViewProof: (debt: Debt, participant: DebtParticipant) => void;
  isBusy?: boolean;
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function toNumber(value: string | number | undefined) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatMoney(value: string | number | undefined) {
  return currencyFormatter.format(toNumber(value));
}

function getParticipantName(participant: DebtParticipant, currentUserId?: string) {
  if (participant.user_id === currentUserId) return "Voce";
  return (
    participant.user?.name ??
    participant.user?.email ??
    `Usuario ${participant.user_id.slice(0, 8)}`
  );
}

function statusClass(status: string) {
  if (status === "confirmado") return "badge-success";
  if (status === "pago") return "badge-info";
  return "badge-warning";
}

function canUploadProof(participant: DebtParticipant, currentUserId?: string) {
  return participant.user_id === currentUserId && participant.status === "pendente";
}

function canConfirm(participant: DebtParticipant, isCreator: boolean) {
  return isCreator && participant.status === "pago";
}

export function DebtCard({
  debt,
  currentUserId,
  isCreator,
  onDelete,
  onEdit,
  onUploadProof,
  onConfirm,
  onViewProof,
  isBusy = false,
}: DebtCardProps) {
  const participants = debt.participants ?? [];
  const confirmedCount = participants.filter(
    (participant) => participant.status === "confirmado",
  ).length;
  const dueDate = debt.due_date ? dateFormatter.format(new Date(debt.due_date)) : "-";

  return (
    <div className="bg-base-100 border border-base-content/10 rounded-2xl p-5 shadow-sm hover:border-base-content/20 hover:shadow-md transition-all duration-200">
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <WalletCards size={19} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-base-content text-[15px] leading-snug">
                {debt.title}
              </h3>
              <span className="badge badge-ghost badge-sm capitalize">
                {debt.split_type}
              </span>
              {isCreator && (
                <span className="text-[10px] font-semibold text-primary/80 bg-primary/8 px-2 py-0.5 rounded-full">
                  Recebedor
                </span>
              )}
            </div>
            {debt.description && (
              <p className="text-[12px] text-base-content/50 mt-1 leading-relaxed">
                {debt.description}
              </p>
            )}
          </div>

          {isCreator && (
            <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onEdit(debt)}
              disabled={isBusy}
              className="btn btn-ghost btn-xs btn-circle text-base-content/35 hover:text-primary"
              aria-label="Editar divida"
            >
              <Pencil size={15} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(debt)}
              disabled={isBusy}
              className="btn btn-ghost btn-xs btn-circle text-base-content/35 hover:text-error"
              aria-label="Excluir divida"
            >
              <Trash2 size={15} />
            </button>
          </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-base-200/60 px-3 py-2">
            <p className="text-[10px] uppercase font-semibold text-base-content/40">
              Total
            </p>
            <p className="text-sm font-semibold text-base-content">
              {formatMoney(debt.total_amount)}
            </p>
          </div>
          <div className="rounded-xl bg-base-200/60 px-3 py-2">
            <p className="text-[10px] uppercase font-semibold text-base-content/40">
              Vencimento
            </p>
            <p className="text-sm font-semibold text-base-content">{dueDate}</p>
          </div>
          <div className="rounded-xl bg-base-200/60 px-3 py-2">
            <p className="text-[10px] uppercase font-semibold text-base-content/40">
              Quitados
            </p>
            <p className="text-sm font-semibold text-base-content">
              {confirmedCount}/{participants.length}
            </p>
          </div>
        </div>

        <div className="border-t border-base-content/8 pt-3">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase text-base-content/40 mb-2.5">
            <Users size={13} />
            Participantes
          </div>

          {participants.length === 0 ? (
            <p className="text-[12px] text-base-content/40">
              Nenhum participante vinculado.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {participants.map((participant) => (
                <div
                  key={participant.user_id}
                  className="flex items-center gap-3 rounded-xl border border-base-content/8 px-3 py-2"
                >
                  <div className="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center text-[11px] font-bold text-base-content/60 shrink-0">
                    {getParticipantName(participant, currentUserId).charAt(0)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium text-base-content truncate">
                      {getParticipantName(participant, currentUserId)}
                    </p>
                    <p className="text-[11px] text-base-content/45">
                      {formatMoney(participant.amount)} -{" "}
                      {toNumber(participant.percentage).toFixed(2)}%
                    </p>
                  </div>

                  <span
                    className={`badge badge-sm capitalize ${statusClass(participant.status)}`}
                  >
                    {participant.status}
                  </span>

                  <div className="flex items-center gap-1">
                    {(participant.has_proof || participant.status !== "pendente") && (
                      <button
                        type="button"
                        onClick={() => onViewProof(debt, participant)}
                        className="btn btn-ghost btn-xs btn-circle"
                        aria-label="Ver comprovante"
                        disabled={isBusy}
                      >
                        <Eye size={14} />
                      </button>
                    )}

                    {canUploadProof(participant, currentUserId) && (
                      <label className="btn btn-ghost btn-xs btn-circle cursor-pointer">
                        <FileUp size={14} />
                        <input
                          type="file"
                          accept="image/png,image/jpeg,application/pdf"
                          className="hidden"
                          disabled={isBusy}
                          onChange={(event) => {
                            const file = event.target.files?.[0];
                            if (file) onUploadProof(debt, file);
                            event.target.value = "";
                          }}
                        />
                      </label>
                    )}

                    {canConfirm(participant, isCreator) && (
                      <button
                        type="button"
                        onClick={() => onConfirm(debt, participant)}
                        className="btn btn-ghost btn-xs btn-circle text-success"
                        aria-label="Confirmar pagamento"
                        disabled={isBusy}
                      >
                        <CheckCircle2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
