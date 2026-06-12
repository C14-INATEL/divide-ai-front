import { useEffect, useMemo, useState } from "react";
import { AxiosError } from "axios";
import { Plus, Receipt, RefreshCcw } from "lucide-react";
import { useFetch } from "../../../data/hooks/use-fetch/use-fetch";
import { getGroups } from "../../../data/services/group-service/group.service";
import {
  confirmDebtPayment,
  deleteDebt,
  getDebtProof,
  getDebts,
  uploadDebtProof,
  type Debt,
  type DebtParticipant,
} from "../../../data/services/debt-service/debt.service";
import { DebtCard } from "../../components/debt-card";
import { GroupCardSkeleton } from "../../components/group-card/skeleton";
import { useAuthStore } from "../../store/auth.store";
import { useModalStore } from "../../store/modal.store";

function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data;

    if (typeof data?.error?.message === "string") {
      return data.error.message;
    }

    if (typeof data?.detail === "string") {
      return data.detail;
    }

    if (Array.isArray(data?.detail) && data.detail[0]?.msg) {
      return data.detail[0].msg;
    }

    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Não foi possível concluir a ação.";
}

function openProof(proof: string) {
  if (!proof) return;

  const target =
    proof.startsWith("http") || proof.startsWith("data:")
      ? proof
      : proof.startsWith("/")
        ? `${import.meta.env.VITE_API_URL}${proof}`
      : `data:application/octet-stream;base64,${proof}`;

  window.open(target, "_blank", "noopener,noreferrer");
}

export function Expenses() {
  const { user } = useAuthStore();
  const { openModal } = useModalStore();
  const [selectedGroupId, setSelectedGroupId] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [busyDebtId, setBusyDebtId] = useState<string | null>(null);

  const {
    data: groups,
    isLoading: isLoadingGroups,
    refetch: refetchGroups,
  } = useFetch(getGroups);
  const {
    data: debts,
    isLoading: isLoadingDebts,
    refetch: refetchDebts,
  } = useFetch(() => (selectedGroupId ? getDebts(selectedGroupId) : Promise.resolve([])), {
    deps: [selectedGroupId],
  });

  const selectedGroup = useMemo(
    () => groups?.find((group) => group.id === selectedGroupId),
    [groups, selectedGroupId],
  );

  useEffect(() => {
    if (!selectedGroupId && groups?.[0]) setSelectedGroupId(groups[0].id);
  }, [groups, selectedGroupId]);

  function handleOpenCreateDebt() {
    setFeedback(null);
    openModal("create-debt", {
      groups: groups ?? [],
      selectedGroupId,
      currentUserId: user?.sub,
      currentUserName: user?.name,
      onSuccess: (groupId) => {
        setSelectedGroupId(groupId);
        refetchDebts();
      },
    });
  }

  async function runDebtAction(debtId: string, action: () => Promise<void>) {
    setFeedback(null);
    setBusyDebtId(debtId);
    try {
      await action();
      await refetchDebts();
    } catch (error) {
      setFeedback(getErrorMessage(error));
    } finally {
      setBusyDebtId(null);
    }
  }

  function handleEdit(debt: Debt) {
    setFeedback(null);
    openModal("create-debt", {
      debt,
      groups: groups ?? [],
      selectedGroupId: debt.group_id,
      currentUserId: user?.sub,
      currentUserName: user?.name,
      onSuccess: (groupId) => {
        setSelectedGroupId(groupId);
        refetchDebts();
      },
    });
  }

  function handleDelete(debt: Debt) {
    runDebtAction(debt.id, async () => {
      await deleteDebt(debt.id);
    });
  }

  function handleUploadProof(debt: Debt, file: File) {
    runDebtAction(debt.id, async () => {
      await uploadDebtProof(debt.id, file);
    });
  }

  function handleConfirm(debt: Debt, participant: DebtParticipant) {
    runDebtAction(debt.id, async () => {
      await confirmDebtPayment(debt.id, participant.user_id);
    });
  }

  function handleViewProof(debt: Debt, participant: DebtParticipant) {
    runDebtAction(debt.id, async () => {
      const proof = await getDebtProof(debt.id, participant.user_id);
      openProof(proof);
    });
  }

  const isLoading = isLoadingGroups || isLoadingDebts;
  const debtCount = debts?.length ?? 0;

  return (
    <div className="w-full h-full p-5">
      <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-xl font-bold text-base-content">Dividas</h1>
          <p className="text-[13px] text-base-content/50 mt-0.5">
            {selectedGroup
              ? `${debtCount} ${debtCount === 1 ? "divida" : "dividas"} em ${selectedGroup.name}`
              : "Selecione um grupo para gerenciar as dividas"}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <select
            value={selectedGroupId}
            onChange={(event) => {
              setFeedback(null);
              setSelectedGroupId(event.target.value);
            }}
            className="select select-bordered select-sm rounded-xl min-w-56"
            disabled={isLoadingGroups || !groups?.length}
          >
            {(groups ?? []).map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="btn btn-ghost btn-sm rounded-xl gap-1.5"
            onClick={() => {
              refetchGroups();
              refetchDebts();
            }}
          >
            <RefreshCcw size={14} />
            Atualizar
          </button>

          <button
            type="button"
            className="btn btn-primary btn-sm rounded-xl gap-1.5"
            onClick={handleOpenCreateDebt}
            disabled={!groups?.length}
          >
            <Plus size={15} strokeWidth={2.5} />
            Nova divida
          </button>
        </div>
      </div>

      {feedback && (
        <div className="alert alert-warning rounded-xl mb-4 text-sm">
          <span>{feedback}</span>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <GroupCardSkeleton key={index} />
          ))}
        </div>
      ) : !groups || groups.length === 0 ? (
        <div className="min-h-90 border border-dashed border-base-content/15 rounded-2xl flex flex-col items-center justify-center text-center p-8 bg-base-100">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
            <Receipt size={24} />
          </div>
          <h2 className="font-semibold text-base-content">Nenhum grupo encontrado</h2>
          <p className="text-[13px] text-base-content/50 mt-1 max-w-sm">
            Crie um grupo antes de registrar dividas coletivas.
          </p>
        </div>
      ) : debtCount === 0 ? (
        <div className="min-h-90 border border-dashed border-base-content/15 rounded-2xl flex flex-col items-center justify-center text-center p-8 bg-base-100">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
            <Receipt size={24} />
          </div>
          <h2 className="font-semibold text-base-content">Sem dividas neste grupo</h2>
          <p className="text-[13px] text-base-content/50 mt-1 max-w-sm">
            Registre um gasto coletivo para acompanhar participantes, comprovantes
            e confirmacoes.
          </p>
          <button
            type="button"
            className="btn btn-primary btn-sm rounded-xl gap-1.5 mt-4"
            onClick={handleOpenCreateDebt}
          >
            <Plus size={15} />
            Criar divida
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {(debts ?? []).map((debt) => (
            <DebtCard
              key={debt.id}
              debt={debt}
              currentUserId={user?.sub}
              isCreator={debt.creator_id === user?.sub}
              isBusy={busyDebtId === debt.id}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onUploadProof={handleUploadProof}
              onConfirm={handleConfirm}
              onViewProof={handleViewProof}
            />
          ))}
        </div>
      )}
    </div>
  );
}
