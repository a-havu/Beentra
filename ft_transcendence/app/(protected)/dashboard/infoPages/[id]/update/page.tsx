import AddingPage from "@/components/dashboard/pages/AddingPage"


export default async function UpdatePage({ params }: { params: { id: string } }) {
  const {id} = await params

  return (
    <>
    <AddingPage />
      <h2>Editing page</h2>
      <h3>Editing {id} page</h3>
    </>
  )
}
