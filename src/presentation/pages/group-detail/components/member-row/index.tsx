import { useState } from "react";
import { X } from "lucide-react";
import type { GroupMember } from "../../../../../data/services/group-service/group.service";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
}

interface MemberRowProps {
  member: GroupMember;
  isOwner: boolean;
  isSelf: boolean;
  onRemove: (userId: string) => Promise<void>;
}

export function MemberRow({ member, isOwner, isSelf, onRemove }: MemberRowProps) {
  const [confirming, setConfirming] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  async function handleConfirmRemove() {
    setIsRemoving(true);
    try {
      await onRemove(member.user_id);
    } finally {
      setIsRemoving(false);
      setConfirming(false);
    }
  }

  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-base-content/5 last:border-0">
      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-[10px] flex items-center justify-center shrink-0 select-none">
        {getInitials(member.user.name)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-[13px] font-medium text-base-content truncate">
            {member.user.name}
          </p>
          {isSelf && (
            <span className="text-[10px] font-semibold text-primary/70 bg-primary/8 px-1.5 py-0.5 rounded-full shrink-0">
              Você
            </span>
          )}
        </div>
        <p className="text-[11px] text-base-content/40 truncate">{member.user.email}</p>
      </div>

      {isOwner && !isSelf && (
        confirming ? (
          <div className="flex items-center gap-1">
            <button
              onClick={handleConfirmRemove}
              disabled={isRemoving}
              className="btn btn-error btn-xs rounded-lg h-6 min-h-0 text-[11px]"
            >
              {isRemoving ? <span className="loading loading-spinner loading-xs" /> : "Remover"}
            </button>
            <button
              onClick={() => setConfirming(false)}
              disabled={isRemoving}
              className="btn btn-ghost btn-xs btn-square h-6 min-h-0"
            >
              <X size={11} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirming(true)}
            className="btn btn-ghost btn-xs btn-square text-base-content/25 hover:text-error transition-colors"
          >
            <X size={13} />
          </button>
        )
      )}
    </div>
  );
}
