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
      <h2 className="m-1 md:m-10 text-[#44469A]">{page?.title}</h2>

      <article className="prose max-w-none p-6 bg-white rounded-lg shadow-md m-1 md:m-10">
        <div dangerouslySetInnerHTML={{ __html: page?.text }} />
      </article>
    </div>
  );
}
