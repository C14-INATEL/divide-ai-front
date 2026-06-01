import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { GroupCard } from "../../components/group-card";
import { GroupCardSkeleton } from "../../components/group-card/skeleton";
import { GroupsEmptyState } from "../../components/groups-empty-state";
import type { Group } from "../../../data/services/group-service/group.service";

const CURRENT_USER_ID = "user-001";

const MOCK_GROUPS: Group[] = [
  {
    id: "1a2b3c4d-0001-0000-0000-000000000001",
    name: "Viagem Praia 2026",
    creator_id: "user-001",
    created_at: "2026-01-15T10:00:00.000Z",
    updated_at: "2026-01-15T10:00:00.000Z",
    members: [{ id: "m1" }, { id: "m2" }, { id: "m3" }],
  },
  {
    id: "1a2b3c4d-0002-0000-0000-000000000002",
    name: "República dos Amigos",
    creator_id: "user-001",
    created_at: "2026-03-02T08:30:00.000Z",
    updated_at: "2026-03-02T08:30:00.000Z",
    members: [{ id: "m1" }, { id: "m4" }],
  },
  {
    id: "1a2b3c4d-0003-0000-0000-000000000003",
    name: "Churrasco de Maio",
    creator_id: "user-002",
    created_at: "2026-04-28T14:00:00.000Z",
    updated_at: "2026-04-28T14:00:00.000Z",
    members: [
      { id: "m1" },
      { id: "m2" },
      { id: "m3" },
      { id: "m5" },
      { id: "m6" },
    ],
  },
  {
    id: "1a2b3c4d-0004-0000-0000-000000000004",
    name: "Intercâmbio Lisboa",
    creator_id: "user-001",
    created_at: "2026-05-10T09:15:00.000Z",
    updated_at: "2026-05-10T09:15:00.000Z",
    members: [],
  },
];

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateGroup = () => {
    // TODO: abrir modal de criação de grupo
  };

  return (
    <div className="w-full h-full p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-base-content">Meus grupos</h1>
          {!isLoading && (
            <p className="text-[13px] text-base-content/50 mt-0.5">
              {MOCK_GROUPS.length}{" "}
              {MOCK_GROUPS.length === 1 ? "grupo" : "grupos"}
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
      ) : MOCK_GROUPS.length === 0 ? (
        <GroupsEmptyState onCreateGroup={handleCreateGroup} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_GROUPS.map((group) => (
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
