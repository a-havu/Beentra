import { prisma } from "@/lib/prisma";


export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const project = await prisma.project.findUnique({
    where: { id },
  });
  if (!project) return <div>Project not found</div>;

  return (
    <div>
      <h1>{project.projectName}</h1><br />
      <p>{project.oneLiner}</p>
      <img src="https://headsupfortails.com/cdn/shop/articles/Kitten_Blog_images__Rottweiler_Dog_Breed_Guide-_Temperament_Appearance_Care_History.jpg?v=1759301197" alt={project.projectName} className="w-full h-64 object-cover rounded-lg mb-4" />
      {project.techStack && <p>Tech stack: {project.techStack}</p>}
      {project.link && <p>Link: <a href={project.link} target="_blank" rel="noopener noreferrer">{project.link}</a></p>}
      {project.description && <p>{project.description}</p>}
    </div>
  );
}