import ProjectGrid from "@/components/projects/ProjectGrid";
import { prisma } from "@/lib/prisma";

export const metadata ={
  title:'My projects'
}

interface Props {
  params: { userId: string };
}

export default async function UserProjectsPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;

  console.log("userId from params:", userId);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    });

  const projects = await prisma.project.findMany({
    where: { creatorId: userId },
    orderBy: { createdAt: "desc" },
  });

  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1 className="flex justify-center">These are your projects, {user.username}!</h1><br></br>
      { projects.length > 0 ?
      <ProjectGrid projects={projects} />
      : <p>No projects found.</p> }
    </div>
  );
}
