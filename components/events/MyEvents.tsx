import FullEventList from "@/components/events/FullEventList";
import { prisma } from "@/lib/prisma";



export default async function MyEvents({ userId }: { userId: string }) {

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return <div>User not found</div>;
  const currentUserId = user.id;
  const currentUserRole = user.role

  const raw = await prisma.event.findMany({
    where: { creatorId: userId },
    orderBy: { date: "asc" },
    include: {
      _count: { select: { subscriptions: true } },
      subscriptions: currentUserId ? { where: { userId: currentUserId } } : false,
    },
  });

  const events = raw.map(({ subscriptions, _count, ...rest }) => ({
    ...rest,
    date: rest.date.toISOString(),
    timeFrom: rest.timeFrom.toISOString(),
    timeTo: rest.timeTo.toISOString(),
    subscriberCount: _count.subscriptions,
    isSubscribed: currentUserId ? (subscriptions as { userId: string }[]).length > 0 : false,
  }));

  return (
    <div className="w-full md:w-150">
      <h1 className="mt-5 text-[#44469A] flex justify-center">Organizer: {user.username}</h1>
      <FullEventList events={events} currentUserId={currentUserId} currentUserRole={currentUserRole} />
    </div>
  )
}
