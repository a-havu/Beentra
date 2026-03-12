import Link from "next/link";
import Image from "next/image";

type Project = {
  id: string;
  projectName: string;
  oneLiner: string;
  creator?: { username: string } | null;
  image?: string | null;
};

export default function ProjectCard({ project }: { project: Project;}) {
  return (
    <Link className="flex-1 min-w-0" href={`/projects/${project.id}`}>
      <div className="project-card">
      <div className="relative w-full h-40 bg-purple-100 flex items-center justify-center text-4xl">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.projectName} image`}
            fill
            className="object-cover w-full h-full rounded-t-lg"
          />
        ) : (
          "🐝"
        )}
      </div>
      <div className="p-4">
        <h2>{project.projectName}</h2>
        <p>{project.oneLiner}</p>
        {project.creator && (
          <p>@{project.creator.username}</p>
        )}
      </div>
    </div>
    </Link>
  );
}