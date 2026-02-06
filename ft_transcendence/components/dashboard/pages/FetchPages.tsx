import { prisma } from "@/lib/prisma"

export default async function FetchPages(){
 const pages = await prisma.page.findMany()

 return(

<div className="page-list m-7">
            <ul>
          {pages.map(page => (
            <li key={page.id}>{page.title}</li>
          )
            
          )}
          </ul>
        </div>

 )

}