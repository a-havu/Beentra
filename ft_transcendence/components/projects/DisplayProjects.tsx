import { prisma } from "@/lib/prisma";
import ProjectGrid from "@/components/projects/ProjectGrid";

export default async function DisplayProjects() {
  const projects = await prisma.project.findMany({ // fetch all projects
    orderBy: { createdAt: "desc" },
    include: { creator: { select: { username: true } } }, // include creator's username
  });

  return <ProjectGrid projects={projects} />; // render the projects in a grid
}