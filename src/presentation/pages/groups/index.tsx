import { Plus } from "lucide-react";
import { GroupCard } from "../../components/group-card";
import { GroupCardSkeleton } from "../../components/group-card/skeleton";
import { GroupsEmptyState } from "../../components/groups-empty-state";
import { getGroups } from "../../../data/services/group-service/group.service";
import { useFetch } from "../../../data/hooks/use-fetch/use-fetch";
import { useModalStore } from "../../store/modal.store";

const CURRENT_USER_ID = "user-001";

export function Groups() {
  const { data: groups, isLoading, refetch: refetchGroups } = useFetch(getGroups);
  const { openModal } = useModalStore();

  const handleCreateGroup = () => openModal("create-group", { onSuccess: refetchGroups });

  return (
    <div className="w-full h-full p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-base-content">Meus grupos</h1>
          {!isLoading && groups && (
            <p className="text-[13px] text-base-content/50 mt-0.5">
              {groups.length}{" "}
              {groups.length === 1 ? "grupo" : "grupos"}
            </p>
          )}
        </div>
        <button
          className="btn btn-primary btn-sm rounded-xl gap-1.5"
          onClick={handleCreateGroup}
        >
          <Plus size={15} strokeWidth={2.5} />
          Novo grupo
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <GroupCardSkeleton key={i} />
          ))}
        </div>
      ) : !groups || groups.length === 0 ? (
        <GroupsEmptyState onCreateGroup={handleCreateGroup} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              isOwner={group.creator_id === CURRENT_USER_ID}
            />
          ))}
        </div>
      )}

    </div>
  );
}
