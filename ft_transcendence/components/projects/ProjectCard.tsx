import Link from "next/link";
import Image from "next/image";

type Project = {
  id: string;
  projectName: string;
  oneLiner: string;
  techStack: string;
  creator?: { username: string } | null;
  image?: string | null;
  createdAt: string | Date;
};

export default function ProjectCard({ project }: { project: Project;}) {
  return (
    <div
      onClick={onClick}
      className="beentra-card cursor-pointer overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-4xl">
        🐝
      </div>
      <div className="project-info">
        <h2>{project.projectName}</h2>
        <p>{project.oneLiner}</p>
        {project.techStack && (<p>Tech stack: {project.techStack}</p>)}
         {project.createdAt && (
          <p className="text-sm text-gray-500 absolute bottom-3 left-2">
            {new Date(project.createdAt).toLocaleDateString()}
          </p>
        )}
        {project.creator && (
          <p className="text-sm text-gray-500 absolute bottom-8 left-2">
            {project.creator.username}
          </p>
        )}
      </div>
    </div>
    </Link>
  );
}
