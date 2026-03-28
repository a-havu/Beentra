import MyEvents from "@/components/events/MyEvents";
import MySubscripedEvents from "@/components/events/MySubscripedEvents";

export const metadata = {
  title: "My Events",
};


export default async function UserEventsPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;


  return (
    <div className="w-full p-5 gap-5">
      <MyEvents userId={userId} />
      <MySubscripedEvents userId={userId} />
    </div>
  );
}
