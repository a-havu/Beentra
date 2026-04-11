import AddEvent from "@/components/dashboard/AddEvent";
import EventGrid from "@/components/events/EventGrid";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { fetchIntraEvents, formatIntraEvent } from "@/lib/IntraEvents";
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

  const dbEvents = raw.map(({ subscriptions, _count, ...rest }) => ({
    ...rest,
    date: rest.date.toISOString(),
    timeFrom: rest.timeFrom.toISOString(),
    timeTo: rest.timeTo.toISOString(),
    subscriberCount: _count.subscriptions,
    isSubscribed: userId
      ? (subscriptions as { userId: string }[]).length > 0
      : false,
  }));

  const intraResult = await fetchIntraEvents();
  const intraEvents = intraResult.success
    ? (intraResult.data ?? []).map(formatIntraEvent)
    : [];

  const events = [...dbEvents, ...intraEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="flex flex-col items-center p-6">
      <div className="flex flex-col items-center gap-6">
        <h1>All Beentra Events</h1>
        <div className="flex justify-center">
          <AddEvent />
        </div>
      </div>
      <div className="flex gap-5 mt-6">
        <EventGrid
          events={events}
          currentUserId={userId}
          currentUserRole={userRole}
        />
      </div>
    </div>
  );
}
