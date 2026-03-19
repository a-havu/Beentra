'use client';
import ProjectCard from "./ProjectCard";

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

export default function FeaturedProjects({ projects }: { projects: Project[] }) {

    return (
		<>
            <br></br><h1 className="flex justify-center">Featured Projects</h1>
			<div className="project-grid">
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