import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import type { Group } from "../../../data/services/group-service/group.service";

const MAX_VISIBLE_AVATARS = 3;

interface GroupCardProps {
  group: Group;
  isOwner?: boolean;
}

export function GroupCard({ group, isOwner = false }: GroupCardProps) {
  const parts = group.name.trim().split(/\s+/);
  const initials = parts.length === 1
    ? parts[0].charAt(0).toUpperCase()
    : (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  const memberCount = group.members.length;
  const visibleMembers = group.members.slice(0, MAX_VISIBLE_AVATARS);
  const overflow = memberCount - MAX_VISIBLE_AVATARS;
  const createdAt = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(group.created_at));

  return (
    <div className="bg-base-100 border border-base-content/10 rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:border-base-content/20 hover:shadow-md transition-all duration-200 group/card">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold text-base flex items-center justify-center shrink-0 select-none">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 min-w-0">
            <h3 className="font-semibold text-base-content text-[15px] leading-snug truncate">
              {group.name}
            </h3>
            {isOwner && (
              <span className="shrink-0 text-[10px] font-semibold text-primary/80 bg-primary/8 px-2 py-0.5 rounded-full">
                Organizador
              </span>
            )}
          </div>

          {memberCount === 0 ? (
            <p className="text-[12px] text-base-content/40 mt-1.5">Sem membros</p>
          ) : (
            <div className="flex items-center gap-2 mt-1.5">
              <div className="flex items-center">
                {visibleMembers.map((member, i) => {
                  const nameParts = member.user.name.trim().split(/\s+/);
                  const initials = nameParts.length === 1
                    ? nameParts[0].charAt(0).toUpperCase()
                    : (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
                  return (
                    <div
                      key={member.user_id}
                      className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-[8px] flex items-center justify-center ring-2 ring-base-100 shrink-0 select-none"
                      style={{ marginLeft: i === 0 ? 0 : "-6px" }}
                    >
                      {initials}
                    </div>
                  );
                })}
                {overflow > 0 && (
                  <span
                    className="w-6 h-6 rounded-full bg-base-300 text-base-content/60 text-[10px] font-semibold flex items-center justify-center ring-2 ring-base-100"
                    style={{ marginLeft: "-6px" }}
                  >
                    +{overflow}
                  </span>
                )}
              </div>
              <span className="text-[12px] text-base-content/40">
                {memberCount === 1 ? "1 membro" : `${memberCount} membros`}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-base-content/8">
        <span className="text-[11px] text-base-content/40">{createdAt}</span>
        <Link
          to={`/grupos/${group.id}`}
          className="text-[12px] font-medium text-primary flex items-center gap-1 opacity-60 group-hover/card:opacity-100 transition-opacity"
        >
          Ver grupo
          <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
