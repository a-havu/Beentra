import { prisma } from "@/lib/prisma";
import Image from "next/image";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const project = await prisma.project.findUnique({
    where: { id },
  });
  if (!project) return <div>Project not found</div>;

  return (
    <div>
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