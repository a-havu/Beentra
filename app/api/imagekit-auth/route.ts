import ImageKit from "imagekit";

export async function GET() {
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    return Response.json(
      { error: "Missing ImageKit env vars" },
      { status: 500 },
    );
  }

  const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });
  const { token, expire, signature } = imagekit.getAuthenticationParameters();

  return Response.json({ token, expire, signature, publicKey });
}
