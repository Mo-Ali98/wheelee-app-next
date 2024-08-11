export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80dvh] w-full">
      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center">
          <div className="h-12 w-12 animate-pulse rounded-full bg-fuchsia-500" />
          <div className="ml-4 h-12 w-12 animate-pulse rounded-full bg-fuchsia-400" />
          <div className="ml-4 h-12 w-12 animate-pulse rounded-full bg-fuchsia-300" />
        </div>
      </div>
    </div>
  );
}
