export function GroupCardSkeleton() {
  return (
    <div className="bg-base-100 border border-base-content/10 rounded-2xl p-5 flex flex-col gap-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="skeleton w-10 h-10 rounded-xl shrink-0" />
        <div className="flex-1 flex flex-col gap-2 pt-0.5">
          <div className="skeleton h-4 w-3/4 rounded-lg" />
          <div className="skeleton h-3 w-1/2 rounded-lg" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <div className="skeleton w-6 h-6 rounded-full" />
          <div className="skeleton w-6 h-6 rounded-full" style={{ marginLeft: "-6px" }} />
          <div className="skeleton w-6 h-6 rounded-full" style={{ marginLeft: "-6px" }} />
        </div>
        <div className="skeleton h-3 w-20 rounded-lg" />
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-base-content/8">
        <div className="skeleton h-3 w-24 rounded-lg" />
        <div className="skeleton h-3 w-16 rounded-lg" />
      </div>
    </div>
  );
}
