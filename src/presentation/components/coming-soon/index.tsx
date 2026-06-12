interface ComingSoonProps {
  title?: string;
  message?: string;
}

export function ComingSoon({
  title = "Em breve",
  message = "Esta página está em construção.",
}: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-20 px-6 text-center">
      <img
        src="/undraw_construction-workers_z99i.svg"
        alt="Em construção"
        className="w-72 max-w-full opacity-90"
      />
      <div className="flex flex-col gap-1.5">
        <h2 className="text-xl font-bold text-base-content">{title}</h2>
        <p className="text-sm text-base-content/50">{message}</p>
      </div>
    </div>
  );
}