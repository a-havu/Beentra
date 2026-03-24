"use client";
import ProjectCard from "./ProjectCard";
import { LocalProject } from "@/types/general";

export default function FeaturedProjects({
  projects,
}: {
  projects: LocalProject[];
}) {
  return (
    <>
      <br></br>
      <h1 className="flex justify-center">Featured Projects</h1>
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
