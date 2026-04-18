export function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton items have no stable id
            i
          }
          className="animate-pulse"
          data-ocid={`skeleton.item.${i + 1}`}
        >
          <div className="aspect-[3/4] bg-muted rounded-sm mb-4" />
          <div className="h-4 bg-muted rounded-sm w-3/4 mb-2" />
          <div className="h-4 bg-muted rounded-sm w-1/3" />
        </div>
      ))}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] bg-muted rounded-sm mb-4" />
      <div className="h-4 bg-muted rounded-sm w-3/4 mb-2" />
      <div className="h-4 bg-muted rounded-sm w-1/3" />
    </div>
  );
}
