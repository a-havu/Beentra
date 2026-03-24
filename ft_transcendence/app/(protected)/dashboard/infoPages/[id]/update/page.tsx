import PageForm from "@/components/pages/PageForm";
import { prisma } from "@/lib/prisma";

export default async function UpdatePage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;

  const initialData = await prisma.page.findUnique({
    where: { id: Number(id) },
  });

  if (!initialData) throw new Error("no page found");

  return (
    <>
      <PageForm
        id={initialData.id}
        initialData={{
          title: initialData.title,
        }}
      />
    </>
  );
}
