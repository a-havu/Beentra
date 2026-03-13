import { prisma } from "@/lib/prisma";

interface Props {
  params: { userId: string };
}

export default async function UserProjectsPage({ params }: Props) {
  const { userId } = params;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      createdProjects: true,
    },
  });

  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h1>{user.username}'s Projects</h1>
      <ul>
        {user.createdProjects.map((project) => (
          <li key={project.id}>
            {/* render project fields here */}
            <p>{project.projectName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
