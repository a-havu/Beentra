import { fetchIntraEvents } from "@/lib/IntraEvents";

export default async function intraEvents() {
  <h2>intra Events</h2>;
  const events = await fetchIntraEvents();

  console.log("Events: ", events);
}
