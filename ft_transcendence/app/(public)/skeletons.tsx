export function TodaysEventsSkeleton() {
  return (
    <div className="flex-1 animate-pulse">
      <div className="h-6 w-36 rounded bg-[#7A3D02]/10 mb-4" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-20 w-full rounded-xl bg-[#7A3D02]/10 mb-3" />
      ))}
    </div>
  );
}

export function CalendarSkeleton() {
  return (
    <div className="flex-[2] animate-pulse">
      {/* Calendar header */}
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 w-24 rounded bg-[#7A3D02]/10" />
        <div className="flex gap-2">
          <div className="h-8 w-8 rounded bg-[#7A3D02]/10" />
          <div className="h-8 w-8 rounded bg-[#7A3D02]/10" />
        </div>
      </div>
      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="h-4 rounded bg-[#7A3D02]/10" />
        ))}
      </div>
      {/* Calendar grid */}
      {[...Array(5)].map((_, row) => (
        <div key={row} className="grid grid-cols-7 gap-1 mb-1">
          {[...Array(7)].map((_, col) => (
            <div key={col} className="h-16 rounded bg-[#7A3D02]/10" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function EventsSkeleton() {
  return (
    <div className="flex gap-8 animate-pulse">
      <TodaysEventsSkeleton />
      <CalendarSkeleton />
    </div>
  );
}

export function ProjectsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-7 w-48 rounded-md bg-[#7A3D02]/10 mb-4 mx-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-xl bg-[#7A3D02]/10 p-4"
          >
            <div className="h-32 w-full rounded-lg bg-[#7A3D02]/15" />
            <div className="h-4 w-3/4 rounded bg-[#7A3D02]/15" />
            <div className="h-3 w-full rounded bg-[#7A3D02]/10" />
            <div className="h-3 w-2/3 rounded bg-[#7A3D02]/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
