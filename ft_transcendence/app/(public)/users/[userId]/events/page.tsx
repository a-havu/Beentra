import MyEvents from "@/components/events/MyEvents";

export const metadata = {
  title: "My Events",
};


export default async function UserEventsPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;


  return (
    <div className="w-full p-5">
      <MyEvents userId={userId} />
    </div>
  );
}
