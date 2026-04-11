import { prisma } from "@/lib/prisma";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Terms",
};

export default async function termsofservice() {
  const page = await prisma.page.findFirst({
    where: { slug: "terms" },
  });
  if (!page) return <p>No content found.</p>;
  return (
    <div>
      <h2 className="m-10 text-[#44469A]">{page?.title}</h2>

      <article className="prose max-w-none p-6 bg-white rounded-lg shadow-md m-10">
        <div dangerouslySetInnerHTML={{ __html: page?.text }} />
      </article>
    </div>
  );
}
