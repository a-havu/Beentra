import { EventsTable } from "@/components/dashboard/EventsTable";
import CreateEvent from "@/components/events/CreateEvent";
import Calendar from "@/components/events/Calendar";
import AddEvent from "@/components/dashboard/AddEvent";
// import DisplayEventList from "@/components/events/DisplayEventList";

export const metadata = {
  title: "Events",
};

export default function EventsPage() {
  return (
    <div className="w-full p-10">
      <AddEvent />
      <div className="w-full max-w-4xl mx-auto h-full max-h-4xl">
        <Calendar />
      </div>
    </div>
    // <div className="flex flex-1 w-full items-center justify-center">
    //   <div className="flex gap-50 w-full items-center justify-center">
    //     <Calendar />
    //     {/* <CreateEvent /> */}
    //     {/* <EventsTable /> */}
    //   </div>
    // </div>
  );
}
