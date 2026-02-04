'use client'

import { useState } from "react";





export default function AddingPage(){
    const [title,setTitle]=useState("");
    const [text, setText] = useState("")


    const handleAddingPage = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        console.log("handling page");
    }


    return (
            <div className="flex flex-col">
                <div>
                    <h1>adding new page</h1>
                </div>
                <div className="adding-page-form flex flex-col">
                    <form className="flex flex-col justify-start gap-4 bg-blue-200" onSubmit={handleAddingPage}>
                        <fieldset className="flex flex-col">
                            <label htmlFor="page-title">Page title:</label>
                            <input type="text" name="page-title" placeholder="page title" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                        </fieldset>
                        <fieldset className="flex flex-col">
                            <label htmlFor="text">Page Text:</label>
                            <textarea  name="page-text" placeholder="page text" value={text} onChange={(e)=>setText(e.target.value)}></textarea>  
                        </fieldset>
                        <fieldset className="flex flex-col">
                            <button type="submit">add page</button>
                        </fieldset>

                    </form>
                </div>
            </div>
    )
}