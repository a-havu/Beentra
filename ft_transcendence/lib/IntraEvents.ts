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

export async function getAccessToken() {
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
    return { success: false, error: "cannot get token from intra" }; // fixed typo

  const data = await tokenResponse.json();
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
    },
  );

  if (!eventsResponse.ok)
    return { success: false, error: "cannot fetch events" };

  const events = await eventsResponse.json();
  return { success: true, data: events };
}
