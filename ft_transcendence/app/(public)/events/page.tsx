import Calendar from "@/components/events/Calendar";
import AddEvent from "@/components/dashboard/AddEvent";
import EventList from "@/components/events/EventList";
// import DisplayEventList from "@/components/events/DisplayEventList";

export const metadata = {
  title: "Events",
};

export default function EventsPage() {
  return (
    <div className="w-full p-5">
      <div className="mb-5  ">
        <AddEvent />
      </div>
      <div className="flex gap-8">
        <div className="flex-1">
          <h1>Todays Events</h1>
          <EventList />
        </div>
        <div className="flex-2">
          <Calendar />
        </div>
      </div>
      {/* <EventList />
      <div className="w-full max-w-4xl mx-auto h-full max-h-4xl">
        <Calendar />
      </div> */}
    </div>
  );
}
