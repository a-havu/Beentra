import Link from "next/link";
import Image from "next/image";
import { LocalProject } from "@/types/general";

export default function ProjectCard({ project }: { project: LocalProject }) {
  return (
    <Link className="relative flex-1 min-w-0" href={`/projects/${project.id}`}>
      <div className="flex-1 cursor-pointer rounded-xl md:h-80 border border-gray-200 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col gap-3">
        <div className="relative w-full h-40 object-cover rounded-t-xl bg-[#DEDFFF] flex items-center justify-center text-5xl overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.projectName} image`}
              fill
              loading="eager"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-t-lg"
            />
          ) : (
              <Image
              src="/logo.svg"
              alt="logo"
              width={32}
              height={32}
              className="w-27 px-10 py-4 rounded-lg flex items-center justify-center"
              />
          )}
        </div>
        <div className="bg-white rounded-b-xl p-1">
          <h2 className="leading-none p-1">{project.projectName}</h2>
          <p className="p-1 leading-4.5 text-md/7 md:max-w-80">{project.oneLiner}</p>
          {project.techStack && (
            <p className="text-sm p-1 text-gray-500">{project.techStack}</p>
          )}
          {project.createdAt && (
            <p className="text-sm text-gray-500 p-1 leading-none md:absolute md:bottom-3 md:right-2">
              {new Date(project.createdAt).toLocaleDateString()}
            </p>
          )}
          {project.creator && (
            <p className="text-sm text-gray-500 ml-1 mb-2 leading-none md:absolute md:bottom-8 md:right-2">
              {project.creator.username}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
