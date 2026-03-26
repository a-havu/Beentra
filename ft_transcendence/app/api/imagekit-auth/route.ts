import crypto from "crypto";

export async function GET() {
  const token = crypto.randomUUID();
  const expire = Math.floor(Date.now() / 1000) + 2400;
  const signature = crypto
    .createHmac("sha1", process.env.IMAGEKIT_PRIVATE_KEY!)
    .update(token + expire)
    .digest("hex");

  return Response.json({ token, expire, signature });
}
