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

  if (!tokenResponse)
    return { suceess: false, error: "cannot get token from intra" };

  return tokenResponse;
}

export async function fetchIntraEvents() {
  const tokenResponse = await getAccessToken();
  console.log("tokenResponse: ", tokenResponse);
}
