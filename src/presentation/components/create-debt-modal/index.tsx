import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { CalendarDays, CircleDollarSign, Split, Users, X } from "lucide-react";
import {
  createDebt,
  type DebtSplitType,
} from "../../../data/services/debt-service/debt.service";
import {
  getGroups,
  type Group,
  type GroupMember,
} from "../../../data/services/group-service/group.service";
import { useFetch } from "../../../data/hooks/use-fetch/use-fetch";
import { useAuthStore } from "../../store/auth.store";

type MemberOption = {
  id: string;
  name: string;
};

const EMPTY_GROUPS: Group[] = [];

interface CreateDebtModalProps {
  open: boolean;
  groups?: Group[];
  selectedGroupId?: string;
  currentUserId?: string;
  currentUserName?: string;
  onClose: () => void;
  onSuccess?: (groupId: string) => void;
}

function getDefaultDueDate() {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString().slice(0, 16);
}

function parseAmount(value: string) {
  const normalized = value.replace(/\./g, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getMemberId(member: GroupMember) {
  return member.id ?? member.user_id ?? member.user?.id ?? "";
}

function getMemberName(
  member: GroupMember,
  memberId: string,
  currentUserId?: string,
  currentUserName?: string,
) {
  if (memberId === currentUserId) return currentUserName || "Voce";
  return (
    member.user?.name ??
    member.user?.email ??
    `Usuario ${memberId.slice(0, 8)}`
  );
}

function getMemberOptions(
  group: Group | undefined,
  currentUserId?: string,
  currentUserName?: string,
): MemberOption[] {
  const members = group?.members ?? [];
  const options = members.reduce<MemberOption[]>((acc, member) => {
    const memberId = getMemberId(member);
    if (!memberId || acc.some((option) => option.id === memberId)) return acc;

    acc.push({
      id: memberId,
      name: getMemberName(member, memberId, currentUserId, currentUserName),
    });
    return acc;
  }, []);

  if (currentUserId && !options.some((member) => member.id === currentUserId)) {
    options.unshift({ id: currentUserId, name: currentUserName || "Voce" });
  }

  return options;
}

export function CreateDebtModal({
  open,
  groups = EMPTY_GROUPS,
  selectedGroupId,
  currentUserId,
  currentUserName,
  onClose,
  onSuccess,
}: CreateDebtModalProps) {
  const { user } = useAuthStore();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [groupId, setGroupId] = useState(selectedGroupId ?? "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(getDefaultDueDate);
  const [totalAmount, setTotalAmount] = useState("");
  const [splitType, setSplitType] = useState<DebtSplitType>("homogenea");
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [percentages, setPercentages] = useState<Record<string, string>>({});
  const shouldFetchGroups = open && groups.length === 0;
  const { data: fetchedGroups, isLoading: isLoadingGroups } = useFetch(getGroups, {
    enabled: shouldFetchGroups,
    deps: [shouldFetchGroups],
  });

  const availableGroups = groups.length > 0 ? groups : fetchedGroups ?? EMPTY_GROUPS;
  const resolvedCurrentUserId = currentUserId ?? user?.sub;
  const resolvedCurrentUserName = currentUserName ?? user?.name;
  const selectedGroup = availableGroups.find((group) => group.id === groupId);
  const memberOptions = useMemo(
    () =>
      getMemberOptions(
        selectedGroup,
        resolvedCurrentUserId,
        resolvedCurrentUserName,
      ),
    [selectedGroup, resolvedCurrentUserId, resolvedCurrentUserName],
  );
  const percentageTotal = selectedParticipants.reduce(
    (sum, userId) => sum + Number(percentages[userId] || 0),
    0,
  );
  const remainingPercentage = 100 - percentageTotal;
  const equalShare =
    selectedParticipants.length > 0
      ? parseAmount(totalAmount) / selectedParticipants.length
      : 0;
  const canSubmit =
    title.trim().length > 0 &&
    groupId.length > 0 &&
    parseAmount(totalAmount) > 0 &&
    selectedParticipants.length > 0 &&
    (splitType === "homogenea" || Math.abs(remainingPercentage) < 0.001);

  const { isLoading, refetch: submitCreate } = useFetch(
    () =>
      createDebt({
        group_id: groupId,
        title: title.trim(),
        description: description.trim() || undefined,
        due_date: new Date(dueDate).toISOString(),
        total_amount: parseAmount(totalAmount),
        split_type: splitType,
        participants: selectedParticipants.map((userId) => ({
          user_id: userId,
          ...(splitType === "heterogenea"
            ? { percentage: Number(percentages[userId] || 0) }
            : {}),
        })),
      }),
    { enabled: false },
  );

  useEffect(() => {
    if (open) {
      setGroupId(selectedGroupId ?? availableGroups[0]?.id ?? "");
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [open, selectedGroupId, availableGroups]);

  useEffect(() => {
    setSelectedParticipants((current) =>
      current.filter((userId) => memberOptions.some((member) => member.id === userId)),
    );
  }, [memberOptions]);

  function resetForm() {
    setTitle("");
    setDescription("");
    setDueDate(getDefaultDueDate());
    setTotalAmount("");
    setSplitType("homogenea");
    setSelectedParticipants([]);
    setPercentages({});
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!canSubmit) return;

    const result = await submitCreate();
    if (result) {
      const createdGroupId = groupId;
      handleClose();
      onSuccess?.(createdGroupId);
    }
  }

  function toggleParticipant(userId: string) {
    setSelectedParticipants((current) =>
      current.includes(userId)
        ? current.filter((id) => id !== userId)
        : [...current, userId],
    );
  }

  function selectAllParticipants() {
    setSelectedParticipants(memberOptions.map((member) => member.id));
  }

  return (
    <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle" onClose={handleClose}>
      <div className="modal-box max-w-2xl p-0 overflow-visible rounded-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-content/8">
          <h3 className="font-semibold text-base text-base-content">Criar nova divida</h3>
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-ghost btn-xs btn-circle text-base-content/40 hover:text-base-content"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40 mb-1.5 block">
                Grupo <span className="text-error">*</span>
              </label>
              <select
                value={groupId}
                onChange={(event) => setGroupId(event.target.value)}
                className="select select-bordered w-full rounded-xl text-sm h-10 focus:select-primary"
                disabled={isLoadingGroups}
                required
              >
                {availableGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40 mb-1.5 block">
                Vencimento <span className="text-error">*</span>
              </label>
              <div className="relative">
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                  className="input input-bordered w-full rounded-xl text-sm h-10 pl-9 focus:input-primary"
                  required
                />
                <CalendarDays
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1fr_160px] gap-4">
            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40 mb-1.5 block">
                Titulo <span className="text-error">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ex: Mercado do churrasco"
                className="input input-bordered w-full rounded-xl text-sm h-10 focus:input-primary"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40 mb-1.5 block">
                Valor total <span className="text-error">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={totalAmount}
                  onChange={(event) => setTotalAmount(event.target.value)}
                  placeholder="0,00"
                  className="input input-bordered w-full rounded-xl text-sm h-10 pl-9 focus:input-primary"
                  required
                />
                <CircleDollarSign
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40 mb-1.5 block">
              Descricao
            </label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              maxLength={250}
              placeholder="Detalhes do gasto coletivo"
              className="textarea textarea-bordered w-full rounded-xl text-sm resize-none focus:textarea-primary leading-relaxed"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40 mb-1.5 block">
              Tipo de divisao
            </label>
            <div className="join w-full">
              <button
                type="button"
                onClick={() => setSplitType("homogenea")}
                className={`btn btn-sm join-item flex-1 gap-1.5 ${
                  splitType === "homogenea" ? "btn-primary" : "btn-outline"
                }`}
              >
                <Split size={14} />
                Igualitaria
              </button>
              <button
                type="button"
                onClick={() => setSplitType("heterogenea")}
                className={`btn btn-sm join-item flex-1 gap-1.5 ${
                  splitType === "heterogenea" ? "btn-primary" : "btn-outline"
                }`}
              >
                <Split size={14} />
                Percentual
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between gap-3 mb-2">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40 block">
                Participantes <span className="text-error">*</span>
              </label>
              <button
                type="button"
                onClick={selectAllParticipants}
                className="btn btn-ghost btn-xs rounded-lg gap-1"
              >
                <Users size={12} />
                Todos
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
              {memberOptions.length === 0 && (
                <div className="sm:col-span-2 rounded-xl border border-dashed border-base-content/15 p-4 text-center text-[13px] text-base-content/45">
                  Nenhum membro disponivel neste grupo.
                </div>
              )}
              {memberOptions.map((member) => {
                const selected = selectedParticipants.includes(member.id);
                return (
                  <div
                    key={member.id}
                    className="rounded-xl border border-base-content/10 p-3 flex items-center gap-3"
                  >
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleParticipant(member.id)}
                      className="checkbox checkbox-primary checkbox-sm"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium text-base-content truncate">
                        {member.name}
                      </p>
                      <p className="text-[11px] text-base-content/40 truncate">
                        {member.id}
                      </p>
                    </div>
                    {splitType === "heterogenea" && (
                      <label className="input input-bordered input-sm rounded-lg w-20 flex items-center gap-1 px-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          disabled={!selected}
                          value={percentages[member.id] ?? ""}
                          onChange={(event) =>
                            setPercentages((current) => ({
                              ...current,
                              [member.id]: event.target.value,
                            }))
                          }
                          className="w-full text-right"
                        />
                        <span className="text-base-content/35">%</span>
                      </label>
                    )}
                  </div>
                );
              })}
            </div>

            {splitType === "homogenea" ? (
              <p className="text-[12px] text-base-content/50 mt-2">
                Cada participante pagara aproximadamente{" "}
                <span className="font-semibold text-base-content">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(equalShare)}
                </span>
                .
              </p>
            ) : (
              <p
                className={`text-[12px] mt-2 ${
                  Math.abs(remainingPercentage) < 0.001
                    ? "text-success"
                    : "text-warning"
                }`}
              >
                {Math.abs(remainingPercentage) < 0.001
                  ? "Percentual fechado em 100%."
                  : `Faltam ${remainingPercentage.toFixed(2)}% para completar 100%.`}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-1 border-t border-base-content/8">
            <button type="button" onClick={handleClose} className="btn btn-ghost btn-sm rounded-xl">
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!canSubmit || isLoading}
              className="btn btn-primary btn-sm rounded-xl gap-1.5"
            >
              {isLoading && <span className="loading loading-spinner loading-xs" />}
              Criar divida
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={handleClose} />
      </form>
    </dialog>
  );
}
