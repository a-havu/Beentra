import { Button } from "@/components/ui/Button";
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
        <div className="flex gap-2 justify-center">
          <EditProject project={project} />
          <DeleteProject projectId={project.id} />
        </div>
      )}
      <br /><br />
      <h1>{project.projectName}</h1><br />
      {project.oneLiner && <p>{project.oneLiner}</p>}
      {project.techStack && <p>Tech stack: {project.techStack}</p>}
      {project.link && <p>Link: <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a></p>}
      {project.description && <p>{project.description}</p>}
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
  );
}