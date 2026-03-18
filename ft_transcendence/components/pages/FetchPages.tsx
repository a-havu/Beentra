

import { prisma } from "@/lib/prisma"
import FunctionalButtons from "./FunctionalButtons";

export default async function FetchPages(){
  const pages = await prisma.page.findMany()
  
 return(

<div className="page-list m-7">
            <ul>
          {pages?pages.map(page => (
            <li key={page.id}><div className="flex flex-row gap-5"><div>{page.title} </div><div><FunctionalButtons id={page.id} /></div></div></li>
          )
            
          ):'NULL'}
          </ul>
        </div>

 )

}
