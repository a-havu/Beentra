import { EventsTable } from "@/components/dashboard/EventsTable";
import CreateEvent from "@/components/events/CreateEvent";
import Calendar from "@/components/events/Calendar";
// import DisplayEventList from "@/components/events/DisplayEventList";

export const metadata = {
  title: "Events",
};

export default function EventsPage() {
  return (
    <div className="w-full p-10">
      <div className="w-full max-w-6xl mx-auto">
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
