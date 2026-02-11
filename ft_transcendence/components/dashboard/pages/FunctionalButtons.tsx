'use client'
import {deletePage, updatePage} from '@/app/(protected)/actions'


export default function FunctionalButtons({id}:{id:number}){
    
    const HandleDelete=async (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const deleted = await deletePage(id);
        if(deleted.success){
            alert(`page ${deleted.data?.title} is deleted`)
        }
    }

     const HandleEdit=(e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        console.log("delete button clicked", id);
    }




    return(
        <div>
            <button onClick={HandleDelete}>Delete</button>
            <button onClick={HandleEdit}>Edit</button>
        </div>
    )
} 