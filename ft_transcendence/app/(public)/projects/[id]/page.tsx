import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { getSession } from "@/lib/auth";
import EditProject from "@/components/projects/EditProject";
import DeleteProject from "@/components/projects/DeleteProject";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      creator: {
        select: { id: true, username: true, fullName: true },
      },
    },
  });

  if (!project) return <div>Project not found</div>;

  const isCreator = session?.userId === project.creatorId;

	return (
    <div className="max-w-4xl mx-auto">
      {/* Actions */}
      {isCreator && (
        <div className="flex gap-2 justify-center mb-6">
          <EditProject project={project} />
          <DeleteProject projectId={project.id} />
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-8">
        <h1 className="text-3xl font-bold text-[#44469A] mb-2">
          {project.projectName}
        </h1>
        {project.oneLiner && (
          <h4 className="text-xl mb-4">{project.oneLiner}</h4>
        )}
        
        {/* Tech Stack */}
        {project.techStack && (
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {project.techStack.split(',').filter(t => t.trim()).map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#e8e1fd] text-gray-700 rounded-full text-sm font-medium"
              >
                {tech.trim()}
              </span>
            ))}
          </div>
        )}

        {/* Link */}
        {project.link && (
          <a
		  	className="text-[#724015] underline font-semibold hover:text-[#5a3210] transition-all duration-200 ease-in-out"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.link}
          </a>
        )}
      </div>
	{/* Image + Description */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Image Column */}
        <div className="w-full md:w-1/3 flex justify-center">
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
			<Image
				src="/logo.svg"
				alt="logo"
				width={50}
				height={50}
				className=" bg-[#e8e1fd] rounded-lg flex items-center justify-center"
					/>
          )}
        </div>

        {/* Description Column */}
        <div className="w-full md:w-2/3">
          {project.description && (
            <p className="whitespace-pre-line bg-white p-6 rounded-lg text-lg leading-relaxed shadow-sm border border-gray-100">
              {project.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}