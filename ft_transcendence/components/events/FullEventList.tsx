import EventCard, { EventData } from "./EventCard";

type Props = {
  events: EventData[];
  currentUserId: string | null;
};

const FullEventList = ({ events, currentUserId }: Props) => {
  if (events.length === 0) return <p>No events found.</p>;

  return (
    <div>
      {events.map((event, index) => {
        const currentDay = event.date.slice(0, 10);
        const prevDay = index > 0 ? events[index - 1].date.slice(0, 10) : null;
        const showDateHeader = currentDay !== prevDay;

        return (
          <div key={event.id}>
            {showDateHeader && (
              <h1 className="text-sm font-semibold text-gray-500 mt-6 mb-2">
                {new Date(currentDay).toLocaleDateString("en-FI", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h1>
            )}
            <EventCard event={event} currentUserId={currentUserId} />
          </div>
        );
      })}
    </div>
  );
};

export default FullEventList;
