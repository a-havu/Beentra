import EventsSection from "@/components/events/EventsSection";
import FeaturedProjects from "@/components/projects/FeaturedProjects";
import { fetchIntraEvents, IntraEventInput } from "@/lib/IntraEvents";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const metadata = {
  title: "ft_transcendence",
};

export default async function HomePage() {
  const [result, session] = await Promise.all([
    fetchIntraEvents(),
    getSession(),
  ]);

  const intraEvents: IntraEventInput[] = result.success ? result.data : [];
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
    createdAt: rest.createdAt.toISOString(),
    updatedAt: rest.updatedAt.toISOString(),
    subscriberCount: _count.subscriptions,
    isSubscribed: userId ? (subscriptions as { userId: string }[]).length > 0 : false,
  }));

  return (
    <div className="flex flex-col main-page">
      <div className="events-section">
        <div className="w-full p-5">
          <EventsSection
            initialEvents={events}
            intraEvents={intraEvents}
            currentUserId={userId}
            currentUserRole={userRole}
          />
        </div>
      </div>
      <div className="projects-section">
        <FeaturedProjects />
      </div>
    </div>
  );
}
