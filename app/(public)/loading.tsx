// app/(public)/loading.tsx  (or wherever your page lives)

export default function Loading() {
  return (
    <div className="flex flex-col main-page animate-pulse">

      {/* EventsSection skeleton */}
      <div className="events-section">
        <div className="w-full p-5">
          {/* Section title */}
          <div className="h-7 w-40 rounded-md bg-[#7A3D02]/10 mb-4" />
          {/* Event cards row */}
          <div className="flex gap-4 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col gap-3 min-w-[260px] rounded-xl bg-[#7A3D02]/10 p-4">
                <div className="h-4 w-3/4 rounded bg-[#7A3D02]/15" />
                <div className="h-3 w-1/2 rounded bg-[#7A3D02]/10" />
                <div className="h-3 w-2/3 rounded bg-[#7A3D02]/10" />
                <div className="mt-2 h-8 w-24 rounded-lg bg-[#7A3D02]/15" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FeaturedProjects skeleton */}
      <div className="projects-section">
        {/* Section title */}
        <div className="h-7 w-48 rounded-md bg-[#7A3D02]/10 mb-4 mx-5" />
        {/* Project cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3 rounded-xl bg-[#7A3D02]/10 p-4">
              <div className="h-32 w-full rounded-lg bg-[#7A3D02]/15" />
              <div className="h-4 w-3/4 rounded bg-[#7A3D02]/15" />
              <div className="h-3 w-full rounded bg-[#7A3D02]/10" />
              <div className="h-3 w-2/3 rounded bg-[#7A3D02]/10" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
