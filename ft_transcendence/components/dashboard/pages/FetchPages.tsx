import { prisma } from "@/lib/prisma"
import { deletePage } from "@/app/(protected)/actions";

export default async function FetchPages(){
 const pages = await prisma.page.findMany()


 return(

<div className="page-list m-7">
            <ul>
          {pages?pages.map(page => (
            <li key={page.id}>{page.title} <button onClick={deletePage(page.id)}>Delete</button></li>
          )
            
          ):'NULL'}
          </ul>
        </div>

 )

}