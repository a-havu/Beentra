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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
