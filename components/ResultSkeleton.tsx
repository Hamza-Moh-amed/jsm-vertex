
const ResultSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-4 rounded-lg border border-neutral-200 bg-surface p-4 shadow-sm sm:flex-row sm:gap-6">
    <div className="aspect-video w-full shrink-0 rounded-md bg-neutral-100 sm:w-69" />
    <div className="flex flex-1 flex-col gap-3 py-1">
      <div className="h-5 w-40 rounded-xs bg-neutral-100" />
      <div className="h-6 w-3/5 rounded-xs bg-neutral-100" />
      <div className="h-4 w-full rounded-xs bg-neutral-100" />
      <div className="mt-auto h-4 w-2/5 rounded-xs bg-neutral-100" />
    </div>
  </div>
  )
}

export default ResultSkeleton