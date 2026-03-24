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
    <Link className="relative flex-1 min-w-0" href={`/projects/${project.id}`}>
      <div className="flex-1 cursor-pointer rounded-xl h-80 border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col gap-3">
        <div className="relative w-full h-40 object-cover rounded-t-xl bg-[#DEDFFF] flex items-center justify-center text-5xl overflow-hidden">
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
        <div className="bg-white rounded-b-xl p-2 w-80">
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
