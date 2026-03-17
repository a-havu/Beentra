import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import ProfileForm from "@/components/profile/ProfileForm";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      fullName: true,
      username: true,
      email: true,
      role: true,
      twoFactorEnabled: true,
      avatarUrl: true,
      createdAt: true,
    },
  });

  if (!user) {
    return (
      <div className="beentra-form-container py-10">
        <p className="text-gray-600">User not found.</p>
      </div>
    );
  }

  const userData = {
    ...user,
    createdAt: user.createdAt.toISOString(),
  };

  const isOwner = session?.userId === id;

  return <ProfileForm user={userData} isOwner={isOwner} />;
}
