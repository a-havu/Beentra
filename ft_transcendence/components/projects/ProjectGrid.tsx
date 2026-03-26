"use client";
import ProjectCard from "./ProjectCard";
import { LocalProject } from "@/types/general";

export default function ProjectGrid({
  projects,
}: {
  projects: LocalProject[];
}) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
