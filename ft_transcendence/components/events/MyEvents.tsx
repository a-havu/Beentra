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
    <>
      <h1 className="mb-5">Events for {user.username}</h1>
      <FullEventList events={events} currentUserId={currentUserId} currentUserRole={currentUserRole} />
    </>
  )
}
