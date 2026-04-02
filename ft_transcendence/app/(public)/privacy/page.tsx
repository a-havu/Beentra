import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "privacy",
};

export default async function privacyPage() {
  const page = await prisma.page.findFirst({
    where: { slug: "privacy" },
  });
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
