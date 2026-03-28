import FullEventList from "@/components/events/FullEventList";
import { prisma } from "@/lib/prisma";



export default async function MySubscribedEvents({ userId }: { userId: string }) {

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return <div>User not found</div>;
  const currentUserId = user.id;
  const currentUserRole = user.role

  const raw = await prisma.event.findMany({
    where: {
      subscriptions: { some: { userId } },
    },
    orderBy: { date: "asc" },
    include: {
      _count: { select: { subscriptions: true } },
      subscriptions: { where: { userId: currentUserId } },
    },
  });

  const subscribedEvents = raw.map(({ subscriptions, _count, ...rest }) => ({
    ...rest,
    date: rest.date.toISOString(),
    timeFrom: rest.timeFrom.toISOString(),
    timeTo: rest.timeTo.toISOString(),
    createdAt: rest.createdAt.toISOString(),
    updatedAt: rest.updatedAt.toISOString(),
    subscriberCount: _count.subscriptions,
    isSubscribed: subscriptions.length > 0,
  }));

  return (
    <>
      <h1 className="mb-5">My subscribed Events</h1>
      <FullEventList events={subscribedEvents} currentUserId={currentUserId} currentUserRole={currentUserRole} />
    </>
  )
}
