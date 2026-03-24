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
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
