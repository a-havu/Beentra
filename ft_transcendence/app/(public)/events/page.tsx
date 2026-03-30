import AddEvent from "@/components/dashboard/AddEvent";
import FullEventList from "@/components/events/FullEventList";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Events",
};

export default async function EventsPage() {
  const session = await getSession();
  const userId = session?.userId ?? null;
  const userRole = session?.role ?? null;

  const raw = await prisma.event.findMany({
    orderBy: { date: "asc" },
    include: {
      _count: { select: { subscriptions: true } },
      subscriptions: userId ? { where: { userId } } : false,
    },
  });

  const events = raw.map(({ subscriptions, _count, ...rest }) => ({
    ...rest,
    date: rest.date.toISOString(),
    timeFrom: rest.timeFrom.toISOString(),
    timeTo: rest.timeTo.toISOString(),
    subscriberCount: _count.subscriptions,
    isSubscribed: userId
      ? (subscriptions as { userId: string }[]).length > 0
      : false,
  }));

  return (
    <div className="flex flex-col items-center p-5">
      <div className="flex flex-col items-center gap-6">
        <h1>All Events</h1>
		<div className="flex justify-center"><AddEvent /></div>
      </div>
      <div className="flex gap-5">
          <FullEventList
            events={events}
            currentUserId={userId}
            currentUserRole={userRole}
          />
      </div>
    </div>
  );
}
