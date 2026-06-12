import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Users, Receipt, Calendar, Pencil, UserPlus, Trash2 } from "lucide-react";
import { useFetch } from "../../../data/hooks/use-fetch/use-fetch";
import { useAuthStore } from "../../store/auth.store";
import { useModalStore } from "../../store/modal.store";
import {
  getGroup,
  removeGroupMember,
  deleteGroup,
} from "../../../data/services/group-service/group.service";
import { MemberRow } from "./components/member-row";
import { DebtCard } from "./components/debt-card";
import { GroupDetailSkeleton } from "./components/group-detail-skeleton";
import { DeleteGroupDialog } from "./components/delete-group-dialog";
import { getDebts } from "../../../data/services/debt-service/debt.service";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function GroupDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const { openModal } = useModalStore();
  const navigate = useNavigate();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeletingGroup, setIsDeletingGroup] = useState(false);

  const {
    data: group,
    isLoading: isLoadingGroup,
    refetch: refetchGroup,
  } = useFetch(() => getGroup(id!), { enabled: !!id, deps: [id] });
  
  const {
    data: debts,
  } = useFetch(() => getDebts(id!), { enabled: !!id, deps: [id] });

  if (isLoadingGroup) return <GroupDetailSkeleton />;
  if (!group) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-base-content/50 text-sm">Grupo não encontrado.</p>
      </div>
    );
  }

  const userId = user?.sub ?? "";
  const isOwner = group.is_owner;
  const allDebtsSettled = true;

  const debtList = debts ?? [];

  async function handleRemoveMember(memberId: string) {
    await removeGroupMember(group!.id, memberId);
    await refetchGroup();
  }

  async function handleDeleteGroup() {
    setIsDeletingGroup(true);
    try {
      await deleteGroup(group!.id);
      navigate("/grupos");
    } finally {
      setIsDeletingGroup(false);
      setDeleteDialogOpen(false);
    }
  }

  return (
    <div className="w-full min-h-full p-5 flex flex-col gap-5">
      <button
        onClick={() => navigate("/grupos")}
        className="flex items-center gap-1.5 text-[13px] text-base-content/50 hover:text-base-content transition-colors w-fit"
      >
        <ArrowLeft size={14} />
        Voltar para grupos
      </button>

      <div className="bg-base-100 border border-base-content/10 rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary font-bold text-xl flex items-center justify-center shrink-0 select-none">
              {getInitials(group.name)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-base-content">{group.name}</h1>
                {isOwner && (
                  <span className="text-[10px] font-semibold text-primary/80 bg-primary/8 px-2 py-0.5 rounded-full">
                    Organizador
                  </span>
                )}
              </div>
              {group.description && (
                <p className="text-sm text-base-content/50 mt-0.5 max-w-md">{group.description}</p>
              )}
              <div className="flex items-center gap-4 mt-2.5 flex-wrap">
                <span className="flex items-center gap-1 text-[12px] text-base-content/50">
                  <Users size={12} />
                  {group.members.length} {group.members.length === 1 ? "membro" : "membros"}
                </span>
                <span className="flex items-center gap-1 text-[12px] text-base-content/50">
                  <Receipt size={12} />
                  {debtList.length} {debtList.length === 1 ? "dívida" : "dívidas"}
                </span>
                <span className="flex items-center gap-1 text-[12px] text-base-content/50">
                  <Calendar size={12} />
                  {formatDate(group.created_at)}
                </span>
              </div>
            </div>
          </div>

          {isOwner && (
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() =>
                  openModal("edit-group", {
                    groupId: group.id,
                    name: group.name,
                    description: group.description,
                    onSuccess: refetchGroup,
                  })
                }
                className="btn btn-ghost btn-sm rounded-xl gap-1.5"
              >
                <Pencil size={13} />
                Editar
              </button>
              <button
                onClick={() =>
                  openModal("add-member", {
                    groupId: group.id,
                    onSuccess: refetchGroup,
                  })
                }
                className="btn btn-ghost btn-sm rounded-xl gap-1.5"
              >
                <UserPlus size={13} />
                Adicionar membro
              </button>
              <div
                className="tooltip tooltip-bottom"
                data-tip={!allDebtsSettled ? "Existem dívidas pendentes" : "Excluir grupo"}
              >
                <button
                  onClick={() => setDeleteDialogOpen(true)}
                  disabled={!allDebtsSettled}
                  className="btn btn-ghost btn-sm rounded-xl gap-1.5 text-error disabled:opacity-30"
                >
                  <Trash2 size={13} />
                  Excluir
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
        <div className="bg-base-100 border border-base-content/10 rounded-2xl p-5 flex flex-col">
          <h2 className="font-semibold text-[13px] text-base-content/60 uppercase tracking-wider mb-4">
            Membros · {group.members.length}
          </h2>
          {group.members.length === 0 ? (
            <div className="flex-1 flex items-center justify-center py-8">
              <p className="text-[13px] text-base-content/30">Nenhum membro</p>
            </div>
          ) : (
            <div>
              {group.members.map((member) => (
                <MemberRow
                  key={member.user_id}
                  member={member}
                  isOwner={isOwner}
                  isSelf={member.user_id === userId}
                  onRemove={handleRemoveMember}
                />
              ))}
            </div>
          )}
        </div>

        <div className="bg-base-100 border border-base-content/10 rounded-2xl p-5 flex flex-col">
          <h2 className="font-semibold text-[13px] text-base-content/60 uppercase tracking-wider mb-4">
            Dívidas · {debtList.length}
          </h2>
          <div className="flex flex-col gap-2.5">
            {debtList.map((debt) => (
              <DebtCard key={debt.id} debt={debt} currentUserId={userId} />
            ))}
          </div>
        </div>
      </div>

      <DeleteGroupDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        groupName={group.name}
        isDeleting={isDeletingGroup}
        onConfirm={handleDeleteGroup}
      />
    </div>
  );
}
