import FullEventList from "@/components/events/FullEventList";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "My Events",
};

export default async function UserEventsPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const session = await getSession();
  const currentUserId = session?.userId ?? null;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return <div>User not found</div>;

  const raw = await prisma.event.findMany({
    where: {
      OR: [
        { creatorId: userId },
        { subscriptions: { some: { userId } } },
      ],
    },
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
    <div className="w-full p-5">
      <h1 className="mb-5">Events for {user.username}</h1>
      <FullEventList events={events} currentUserId={currentUserId} />
    </div>
  );
}
