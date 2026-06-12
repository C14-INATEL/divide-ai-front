import { useEffect, useRef, useState } from "react";
import { X, Search, UserPlus } from "lucide-react";
import {
  searchUsers,
  type UserSearchResult,
} from "../../../data/services/user-service/user.service";
import { addGroupMember } from "../../../data/services/group-service/group.service";
import { useFetch } from "../../../data/hooks/use-fetch/use-fetch";
import { useDebounce } from "../../../data/hooks/use-debounce/use-debounce";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
}

interface AddMemberModalProps {
  open: boolean;
  groupId: string;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AddMemberModal({ open, groupId, onClose, onSuccess }: AddMemberModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserSearchResult | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (open) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [open]);

  const { data: searchData, isLoading: isLoadingUsers } = useFetch(
    () => searchUsers(debouncedSearch || undefined),
    { enabled: showDropdown, deps: [showDropdown, debouncedSearch] },
  );

  const isSearching = search !== debouncedSearch || isLoadingUsers;
  const results = searchData ?? [];

  function handleClose() {
    setSearch("");
    setSelectedUser(null);
    setShowDropdown(false);
    onClose();
  }

  async function handleAdd() {
    if (!selectedUser) return;
    setIsAdding(true);
    try {
      await addGroupMember(groupId, selectedUser.id);
      handleClose();
      onSuccess?.();
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle" onClose={handleClose}>
      <div className="modal-box max-w-sm p-0 overflow-visible rounded-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-content/8">
          <h3 className="font-semibold text-base text-base-content">Adicionar membro</h3>
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-ghost btn-xs btn-circle text-base-content/40 hover:text-base-content"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4">
          {selectedUser ? (
            <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-primary/15">
              <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold text-[11px] flex items-center justify-center shrink-0 select-none">
                {getInitials(selectedUser.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-base-content truncate">{selectedUser.name}</p>
                <p className="text-xs text-base-content/50 truncate">{selectedUser.email}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="btn btn-ghost btn-xs btn-circle text-base-content/40"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar por nome..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setShowDropdown(true); }}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                  className="input input-bordered w-full rounded-xl text-sm h-10 pl-8 focus:input-primary transition-colors"
                />
                {isSearching ? (
                  <span className="loading loading-spinner loading-xs absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none" />
                ) : (
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none" />
                )}
              </div>

              {showDropdown && !isSearching && (
                <div className="animate-auth-route-in absolute top-full mt-1 w-full bg-base-100 border border-base-content/10 rounded-xl shadow-lg z-50 overflow-y-auto max-h-48">
                  {results.length > 0 ? (
                    results.map((user) => (
                      <button
                        key={user.id}
                        type="button"
                        onMouseDown={() => { setSelectedUser(user); setSearch(""); setShowDropdown(false); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-base-200 transition-colors text-left"
                      >
                        <div className="w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-[10px] flex items-center justify-center shrink-0 select-none">
                          {getInitials(user.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium text-base-content truncate">{user.name}</p>
                          <p className="text-[11px] text-base-content/50 truncate">{user.email}</p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-[13px] text-base-content/40 text-center">
                      Nenhum usuário encontrado
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-1 border-t border-base-content/8">
            <button type="button" onClick={handleClose} className="btn btn-ghost btn-sm rounded-xl">
              Cancelar
            </button>
            <button
              type="button"
              disabled={!selectedUser || isAdding}
              onClick={handleAdd}
              className="btn btn-primary btn-sm rounded-xl gap-1.5"
            >
              {isAdding && <span className="loading loading-spinner loading-xs" />}
              <UserPlus size={13} />
              Adicionar
            </button>
          </div>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={handleClose} />
      </form>
    </dialog>
  );
}
