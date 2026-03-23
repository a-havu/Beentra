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

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link className=" relative flex-1 min-w-0" href={`/projects/${project.id}`}>
      <div className="project-card">
        <div className="project-image relative h-50">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.projectName} image`}
              fill
              className="object-cover rounded-t-lg"
            />
          ) : (
            "🐝"
          )}
        </div>
        <div className="project-info w-80">
          <h2>{project.projectName}</h2>
          <p>{project.oneLiner}</p>
          {project.techStack && <p className="text-sm text-gray-500">{project.techStack}</p>}
          {project.createdAt && (
            <p className="text-sm text-gray-500 absolute bottom-3 right-2">
              {new Date(project.createdAt).toLocaleDateString()}
            </p>
          )}
          {project.creator && (
            <p className="text-sm text-gray-500 absolute bottom-8 right-2">
              {project.creator.username}
            </p>
          )}
        </div>
    </div>
    </Link>
  );
}
