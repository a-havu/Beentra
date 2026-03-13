import { prisma } from "@/lib/prisma";

export const metadata = {
  title: 'Terms'
}



export default async function termsofservice() {
  const page = await prisma.page.findFirst({
    where: { slug: 'terms' }
  })
  if (!page) return <p>No content found.</p>;
  return (
    <div>
      <h2>{page?.title}</h2>

      <article className="prose max-w-none p-6">
        <div dangerouslySetInnerHTML={{ __html: page?.text }} />

      </article>
    </div>
  );
}
