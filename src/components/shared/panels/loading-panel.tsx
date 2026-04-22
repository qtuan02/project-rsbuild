import { Skeleton } from "@/components/ui/skeleton";

interface LoadingPanelProps {
  itemCount?: number;
  columns?: number;
  className?: string;
}

export const LoadingPanel = ({
  itemCount = 6,
  columns = 3,
  className,
}: LoadingPanelProps) => {
  return (
    <div
      className={`grid gap-4 ${className || ""}`}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: itemCount }).map((_, i) => (
        <div key={i} className="space-y-3 rounded-lg border p-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
};
