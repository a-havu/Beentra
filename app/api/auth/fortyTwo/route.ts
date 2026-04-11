export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.FORTY_TWO_CLIENT_ID!,
    redirect_uri: process.env.FORTY_TWO_REDIRECT_URI!,
    response_type: "code",
    scope: "public",
  });

  return Response.redirect(`https://api.intra.42.fr/oauth/authorize?${params}`);
}
