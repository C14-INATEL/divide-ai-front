export function GroupDetailSkeleton() {
  return (
    <div className="w-full min-h-full p-5 flex flex-col gap-5 animate-pulse">
      <div className="h-4 w-20 bg-base-300 rounded-lg" />
      <div className="bg-base-100 border border-base-content/10 rounded-2xl p-6 h-36" />
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
        <div className="bg-base-100 border border-base-content/10 rounded-2xl h-72" />
        <div className="bg-base-100 border border-base-content/10 rounded-2xl h-72" />
      </div>
    </div>
  );
}
