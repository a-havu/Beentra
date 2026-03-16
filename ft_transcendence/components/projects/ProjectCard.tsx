import Link from "next/link";
import Image from "next/image";

type Project = {
  id: string;
  projectName: string;
  oneLiner: string;
  techStack: string;
  creator?: { username: string } | null;
  image?: string | null;
};

export default function ProjectCard({ project }: { project: Project;}) {
  return (
    <Link className="flex-1 min-w-0" href={`/projects/${project.id}`}>
      <div className="project-card">
      <div className="project-image">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.projectName} image`}
            fill
            className="relative object-cover w-full h-full rounded-t-lg"
          />
        ) : (
          "🐝"
        )}
      </div>
      <div className="project-info">
        <h2>{project.projectName}</h2>
        <p className="">{project.oneLiner}</p>
        {project.techStack && (<p>Tech stack: {project.techStack}</p>)}
        {project.creator && (
          <p className="text-sm text-gray-500">
            {project.creator.username}
          </p>
        )}
      </div>
    </div>
    </Link>
  );
}
