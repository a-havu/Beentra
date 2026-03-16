/*
/v2/campus/:campus_id/events
hive is: 13
*/

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
    return { suceess: false, error: "cannot get token from intra" };

  const data = await tokenResponse.json();
  return { success: true, access_token: data.access_token };
}

export async function fetchIntraEvents() {
  const tokenResponse = await getAccessToken();
  if (!tokenResponse) return tokenResponse;
  const eventsRespone = await fetch(
    "https://api.intra.42.fr/v2/campus/13/events",
    {
      headers: {
        Authorization: `Bearer ${tokenResponse.access_token}`,
      },
    },
  );
  if (!eventsRespone.ok)
    return { success: false, error: "cannot fetch events" };

  const events = await eventsRespone.json();

  console.log("events: ", events);
  return { success: true, data: events };
}
