import { EventData } from "@/types/general";

export type IntraEventInput = {
  id: number;
  name: string;
  description: string | null;
  location: string | null;
  kind: string | null;
  max_people: number | null;
  nbr_subscribers: number;
  begin_at: string;
  end_at: string;
  campus_ids: number[];
  cursus_ids: number[];
  created_at: string;
  updated_at: string;
  prohibition_of_cancellation: string | null;
  waitlist: string | null;
};

let cachedToken: { token: string; expiresAt: number } | null = null;

export function formatIntraEvent(event: IntraEventInput): EventData {
  return {
    id: String(event.id),
    title: event.name,
    type: event.kind ?? "Intra",
    date: event.begin_at,
    timeFrom: event.begin_at,
    timeTo: event.end_at,
    location: event.location ?? "",
    organizer: "42 Intra",
    description: event.description ?? null,
    image: null,
    creatorId: null,
    maxSpots: event.max_people ?? 0,
    subscriberCount: event.nbr_subscribers,
    isSubscribed: false,
  };
}

export async function getAccessToken() {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return { success: true, access_token: cachedToken.token };
  }

  const client_id = process.env.FORTY_TWO_CLIENT_ID;
  const client_secret = process.env.FORTY_TWO_CLIENT_SECRET;

  const tokenResponse = await fetch("https://api.intra.42.fr/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: client_id!,
      client_secret: client_secret!,
    }),
  });

  if (!tokenResponse.ok)
    return { success: false, error: "cannot get token from intra" };

  const data = await tokenResponse.json();
  cachedToken = { token: data.access_token, expiresAt: Date.now() + (data.expires_in - 60) * 1000 };
  return { success: true, access_token: data.access_token };
}

export async function fetchIntraEvents() {
  const tokenResponse = await getAccessToken();

  if (!tokenResponse.success)
    return { success: false, error: tokenResponse.error }; // fixed check

  const eventsResponse = await fetch(
    "https://api.intra.42.fr/v2/campus/13/events",
    {
      headers: {
        Authorization: `Bearer ${tokenResponse.access_token}`,
      },
      next: { revalidate: 300 },
    },
  );

  if (!eventsResponse.ok)
    return { success: false, error: "cannot fetch events" };

  const events = await eventsResponse.json();
  return { success: true, data: events };
}
