import { useEffect, useRef, useState } from "react";
import { X, Search, Users } from "lucide-react";
import { createGroup } from "../../../data/services/group-service/group.service";
import { useFetch } from "../../../data/hooks/use-fetch/use-fetch";

const MOCK_USERS = [
  { id: "u1", name: "Ana Silva", email: "ana.silva@email.com" },
  { id: "u2", name: "Bruno Santos", email: "bruno.santos@email.com" },
  { id: "u3", name: "Carla Oliveira", email: "carla.oliveira@email.com" },
  { id: "u4", name: "Daniel Costa", email: "daniel.costa@email.com" },
  { id: "u5", name: "Fernanda Lima", email: "fernanda.lima@email.com" },
];

function getAvatarUrl(name: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&bold=true&size=128`;
}

interface SelectedUser {
  id: string;
  name: string;
  email: string;
}

interface CreateGroupModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const DELAY_CLASSES = ["", "auth-delay-100", "auth-delay-200", "auth-delay-300", "auth-delay-400"];

export function CreateGroupModal({ open, onClose, onSuccess }: CreateGroupModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [memberSearch, setMemberSearch] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<SelectedUser[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<typeof MOCK_USERS>([]);

  const { isLoading, refetch: submitCreate } = useFetch(
    () => createGroup({ name }),
    { enabled: false },
  );

  useEffect(() => {
    if (open) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [open]);

  useEffect(() => {
    if (memberSearch.length < 2) {
      setFilteredUsers([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const timer = setTimeout(() => {
      setFilteredUsers(
        MOCK_USERS.filter(
          (u) =>
            u.email.toLowerCase().includes(memberSearch.toLowerCase()) &&
            !selectedMembers.find((m) => m.id === u.id),
        ),
      );
      setIsSearching(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [memberSearch, selectedMembers]);

  function handleClose() {
    setName("");
    setDescription("");
    setMemberSearch("");
    setSelectedMembers([]);
    onClose();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await submitCreate();
    if (result) {
      handleClose();
      onSuccess?.();
    }
  }

  function addMember(user: SelectedUser) {
    setSelectedMembers((prev) => [...prev, user]);
    setMemberSearch("");
    setShowDropdown(false);
  }

  function removeMember(id: string) {
    setSelectedMembers((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle" onClose={handleClose}>
      <div className="modal-box max-w-md p-0 overflow-visible rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-base-content/8">
          <h3 className="font-semibold text-base text-base-content">Criar novo grupo</h3>
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-ghost btn-xs btn-circle text-base-content/40 hover:text-base-content"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-5">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              {name.trim() ? (
                <img
                  src={getAvatarUrl(name.trim())}
                  alt=""
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-base-content/10"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-base-300 flex items-center justify-center text-base-content/20">
                  <Users size={22} />
                </div>
              )}
            </div>
            <div className="flex-1">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40 mb-1.5 block">
                Nome do grupo <span className="text-error">*</span>
              </label>
              <input
                type="text"
                placeholder="Ex: Viagem de férias"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full rounded-xl text-sm h-10 focus:input-primary transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40 mb-1.5 block">
              Descrição
            </label>
            <div className="relative">
              <textarea
                placeholder="Do que se trata esse grupo?"
                maxLength={250}
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered w-full rounded-xl text-sm resize-none focus:textarea-primary leading-relaxed pb-6 transition-colors"
              />
              <span
                className={`absolute bottom-2.5 right-3 text-[11px] tabular-nums pointer-events-none transition-colors ${
                  description.length >= 230 ? "text-warning" : "text-base-content/30"
                }`}
              >
                {description.length}/250
              </span>
            </div>
          </div>

          {/* Member search */}
          <div>
            <label className="text-[11px] font-semibold uppercase tracking-wider text-base-content/40 mb-1.5 block">
              Adicionar membros
            </label>
            <div className="relative">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Buscar por e-mail..."
                  value={memberSearch}
                  onChange={(e) => {
                    setMemberSearch(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                  className="input input-bordered w-full rounded-xl text-sm h-10 pl-8 focus:input-primary transition-colors"
                />
                {isSearching ? (
                  <span className="loading loading-spinner loading-xs absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none" />
                ) : (
                  <Search
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/30 pointer-events-none"
                  />
                )}
              </div>

              {showDropdown && memberSearch.length >= 2 && !isSearching && (
                <div className="animate-auth-route-in absolute top-full mt-1 w-full bg-base-100 border border-base-content/10 rounded-xl shadow-lg z-50 overflow-hidden">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <button
                        key={user.id}
                        type="button"
                        onMouseDown={() => addMember(user)}
                        className={`animate-auth-fade-up ${DELAY_CLASSES[Math.min(index, DELAY_CLASSES.length - 1)]} w-full flex items-center gap-3 px-4 py-2.5 hover:bg-base-200 transition-colors text-left`}
                      >
                        <img
                          src={`https://i.pravatar.cc/32?u=${user.id}`}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium text-base-content truncate">
                            {user.name}
                          </p>
                          <p className="text-[11px] text-base-content/50 truncate">{user.email}</p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="animate-auth-route-in px-4 py-3 text-[13px] text-base-content/40 text-center">
                      Nenhum usuário encontrado
                    </div>
                  )}
                </div>
              )}
            </div>

            {selectedMembers.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2.5">
                {selectedMembers.map((member) => (
                  <span
                    key={member.id}
                    className="animate-auth-fade-up flex items-center gap-1.5 bg-primary/8 text-primary text-[12px] font-medium px-2.5 py-1 rounded-full"
                  >
                    {member.name}
                    <button
                      type="button"
                      onClick={() => removeMember(member.id)}
                      className="text-primary/50 hover:text-primary transition-colors"
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 pt-1 border-t border-base-content/8">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-ghost btn-sm rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!name.trim() || isLoading}
              className="btn btn-primary btn-sm rounded-xl gap-1.5"
            >
              {isLoading && <span className="loading loading-spinner loading-xs" />}
              Criar grupo
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
