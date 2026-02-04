'use client'

import { useState } from "react";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"




export default function AddingPage(){
const [title, setTitle] = useState<string>("");
const [text, setText] = useState<string>("")


   const handleAddingPage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Title:", title);
    console.log("Text:", text);
}


    return (
            <div className="flex flex-col">
                <div>
                    <h1>adding new page</h1>
                </div>
                <div className="adding-page-form flex flex-col">
                    <form onSubmit={handleAddingPage}>
  <FieldGroup className="max-w-sm">
    <Field>
      <FieldLabel htmlFor="block-end-input">Page Title</FieldLabel>
      <InputGroup className="h-auto">
        <InputGroupInput 
          id="block-end-input" 
          placeholder="page title" 
          name="page-title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
      </InputGroup>
    </Field>
    
    <Field>
      <FieldLabel htmlFor="block-end-textarea">Page Content</FieldLabel>
      <InputGroup>
        <InputGroupTextarea
          id="block-end-textarea"
          name="page-text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e)=>setText(e.target.value)}
        />
      </InputGroup>
    </Field>
    
    <button type="submit" className="mt-4">
      Submit
    </button>
  </FieldGroup>
</form>
                </div>
            </div>
    )
}

