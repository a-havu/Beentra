import Calendar from "@/components/events/Calendar";
import AddEvent from "@/components/dashboard/AddEvent";
import EventList from "@/components/events/EventList";




import Image from "next/image";
export const metadata ={
  title:'ft_transcendence'
}
export default function HomePage() {
  return (
      <div className="flex flex-col main-page">
        <div className="events-section">
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
              </div>
        </div>
        <div className="projects-section">
              <h1>featured Projects </h1>
        </div>
        
      </div>
  );
}
