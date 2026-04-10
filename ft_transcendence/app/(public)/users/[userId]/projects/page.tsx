import ProjectGrid from "@/components/projects/ProjectGrid";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "My projects",
};

interface Props {
  params: { userId: string };
}

export default async function UserProjectsPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  const projects = await prisma.project.findMany({
    where: { creatorId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      creator: {
        select: { id: true, username: true, fullName: true },
      },
    },
  });

  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1 className="flex justify-center text-[#44469A] ml-9 mr-9 md:ml-0">
        These are your projects, {user.username}!
      </h1>
      {projects.length > 0 ? (
        <ProjectGrid projects={projects} />
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
}
