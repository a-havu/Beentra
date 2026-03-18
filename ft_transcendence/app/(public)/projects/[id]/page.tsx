import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { getSession } from "@/lib/auth";
import EditProject from "@/components/projects/EditProject";
import DeleteProject from "@/components/projects/DeleteProject";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const [project, session] = await Promise.all([
    prisma.project.findUnique({ where: { id },  }),
    getSession(),
  ]);

  if (!project) return <div>Project not found</div>;

  const isCreator = session?.userId === project.creatorId;

  return (
    <div>
      {isCreator && (
        <div className="flex gap-2 justify-end">
          <EditProject project={project} />
          <DeleteProject projectId={project.id} />
        </div>
      )}
      <br /><br />
      <div className="flex flex-col items-center gap-4">
      <h1 className="text-[#44469A]">{project.projectName}</h1><br />
      {project.oneLiner && <h3>{project.oneLiner}</h3>}
      <div className="flex row gap-4">{project.techStack && <p>Tech stack: {project.techStack}</p>}<p>|</p>
      {project.link && <p className="underline"><a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a></p>}
      </div>
      {project.description && <p className="whitespace-pre-line bg-[#DEDFFF] p-4 rounded-lg">{project.description}</p>}
      <br />
      <div className="relative max-w-lg">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.projectName} image`}
            width={0}
            height={0}
            sizes="100w"
            className="w-full h-auto max-h-96 rounded-lg object-contain"
          />
        ) : (
          <span className="text-4-xl">🐝</span>
        )}
        </div>
        </div>
    </div>
  );
}