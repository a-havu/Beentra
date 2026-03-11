'use client';

import ProjectCard from "./ProjectCard";
import { useState } from "react";

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

export default async function FeaturedProjects({ projects }: { projects: Project[] }) {
    const [selected, setSelected] = useState<Project | null>(null);

    return (
        <div>
            <h2>Featured Projects</h2>
            <ul className="featured-div">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={() => setSelected(project)}
                    />
                ))}
            </ul>
        </div>
    );
}