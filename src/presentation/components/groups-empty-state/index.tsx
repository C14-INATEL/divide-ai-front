import { Plus } from "lucide-react";

interface GroupsEmptyStateProps {
  onCreateGroup: () => void;
}

export function GroupsEmptyState({ onCreateGroup }: GroupsEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6 animate-auth-fade-up">
      <div className="animate-auth-pulse">
        <svg
          width="140"
          height="140"
          viewBox="0 0 140 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Dashed orbit circle */}
          <circle
            cx="70"
            cy="70"
            r="54"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 5"
            className="text-base-content/20"
          />

          {/* Center person */}
          <circle cx="70" cy="56" r="9" className="fill-primary opacity-80" />
          <path
            d="M52 88c0-9.941 8.059-18 18-18s18 8.059 18 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-primary opacity-80"
          />

          {/* Left person */}
          <circle cx="32" cy="72" r="7" className="fill-primary opacity-50" />
          <path
            d="M18 98c0-7.732 6.268-14 14-14s14 6.268 14 98"
            stroke="currentColor"
            strokeWidth="0"
          />
          <path
            d="M19 96c0-7.18 5.82-13 13-13s13 5.82 13 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-primary opacity-50"
          />

          {/* Right person */}
          <circle cx="108" cy="72" r="7" className="fill-primary opacity-50" />
          <path
            d="M95 96c0-7.18 5.82-13 13-13s13 5.82 13 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-primary opacity-50"
          />

          {/* Small dots on orbit (people positions) */}
          <circle cx="70" cy="16" r="3" className="fill-primary/30" />
          <circle cx="117" cy="43" r="3" className="fill-primary/30" />
          <circle cx="117" cy="97" r="3" className="fill-primary/30" />
          <circle cx="70" cy="124" r="3" className="fill-primary/30" />
          <circle cx="23" cy="97" r="3" className="fill-primary/30" />
          <circle cx="23" cy="43" r="3" className="fill-primary/30" />
        </svg>
      </div>

      <div className="text-center flex flex-col gap-1.5">
        <h2 className="text-base font-semibold text-base-content">
          Nenhum grupo por aqui
        </h2>
        <p className="text-[13px] text-base-content/50 max-w-[260px] leading-relaxed">
          Crie seu primeiro grupo e comece a dividir despesas com quem importa.
        </p>
      </div>

      <button
        onClick={onCreateGroup}
        className="btn btn-primary btn-sm rounded-xl gap-1.5"
      >
        <Plus size={15} strokeWidth={2.5} />
        Criar grupo
      </button>
    </div>
  );
}
