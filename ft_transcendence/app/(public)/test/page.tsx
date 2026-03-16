import { fetchIntraEvents } from "@/lib/IntraEvents";

export default async function intraEvents() {
  const response = await fetchIntraEvents();
  return (
    <>
      <h2>intra Events</h2>
      {console.log(response.data)}
      {response.data.map((event) => (
        <div key={event.id}>
          <h4>{event.name}</h4>
        </div>
      ))}
    </>
  );
}
