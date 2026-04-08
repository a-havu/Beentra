import MyEvents from "@/components/events/MyEvents";
import MySubscribedEvents from "@/components/events/MySubscribedEvents";

export const metadata = {
  title: "My Events",
};


export default async function UserEventsPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;


  return (
    <div className="md:p-5 md:gap-5 flex items-center flex-col">
      <MyEvents userId={userId} />
      <MySubscribedEvents userId={userId} />
    </div>
  );
}
