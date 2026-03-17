'use client'
import ProjectCard from "./ProjectCard";
//import ProjectModal from "@/components/projects/ProjectModal";

type Project = {
  id: string;
  projectName: string;
  oneLiner: string;
  link?: string | null;
  techStack?: string | null;
  description?: string | null;
  creator?: { username: string } | null;
  image?: string | null;
};

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </>
  );
}