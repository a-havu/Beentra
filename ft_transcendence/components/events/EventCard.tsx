type EventData = {
  id: string;
  title: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  location: string;
  organizer: string;
  image: string | null;
  description: string | null;
};

type Props = {
  event: EventData;
};

const EventCard = ({ event }: Props) => {
  const date = new Date(event.date).toLocaleDateString();
  const from = new Date(event.timeFrom).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const to = new Date(event.timeTo).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-4 mt-4 bg-white rounded-lg shadow-md">
      <h2>{event.title}</h2>
      <p>Organizer: {event.organizer}</p>
      <p>Date: {date}</p>
      <p>
        Time: {from} – {to}
      </p>
      <p>Location: {event.location}</p>
      {event.description && <p>{event.description}</p>}
    </div>
  );
};

export default EventCard;
