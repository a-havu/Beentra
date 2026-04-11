export async function uploadImage(file: File): Promise<string> {
  // get auth token from server
  const auth = await fetch("/api/imagekit-auth").then(r => r.json());

  // send image to ImageKit
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", file.name);
  formData.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!);
  formData.append("signature", auth.signature);
  formData.append("expire", auth.expire);
  formData.append("token", auth.token);

  const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.url; // save to Prisma
}