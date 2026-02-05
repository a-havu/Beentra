import CreateEvent from "@/components/events/CreateEvent";

export const metadata = {
  title: "Events",
};

export default function EventsPage() {
  return (
   <div className="flex flex-1 w-full items-center justify-center">
    <div className="w-full max-w-xs">
      <CreateEvent />
      </div>
   </div>
  )
}
