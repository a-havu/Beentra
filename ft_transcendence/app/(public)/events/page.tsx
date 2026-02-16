import { EventsTable } from "@/components/dashboard/EventsTable";
import CreateEvent from "@/components/events/CreateEvent";
// import DisplayEventList from "@/components/events/DisplayEventList";

export const metadata = {
  title: "Events",
};

export default function EventsPage() {
  return (
    <div className="flex flex-1 w-full items-center justify-center">
      <div className="flex gap-50 w-full items-center justify-center">
        <CreateEvent />
        <EventsTable />
      </div>
    </div>
  );
}
