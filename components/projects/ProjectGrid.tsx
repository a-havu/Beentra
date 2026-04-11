"use client";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { LocalProject } from "@/types/general";

const GRID_SIZE = 6;

export default function ProjectGrid({ projects }: { projects: LocalProject[] }) {
	const [page, setPage] = useState(1);
	const totalPages = Math.ceil(projects.length / GRID_SIZE);
	const paginated = projects.slice((page - 1) * GRID_SIZE, page * GRID_SIZE);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {paginated.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

	  {/* Pagination controls */}
	  {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-6">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-xl bg-[#e9ccb5] border-2 border-[#e9ccb5] disabled:opacity-40 hover:bg-[#fcf1d8] hover:cursor-pointer"
          >
			Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded-xl ${
                p === page ? "bg-[#6b421f] text-white" : "bg-[#e9ccb5] border-2 border-[#e9ccb5] hover:bg-[#fcf1d8] hover:cursor-pointer"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-xl bg-[#e9ccb5] disabled:opacity-40 border-2 border-[#e9ccb5] hover:bg-[#fcf1d8] hover:cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

