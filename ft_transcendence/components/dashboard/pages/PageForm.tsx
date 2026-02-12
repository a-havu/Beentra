"use client";

import { createPage, updatePage } from "@/app/(protected)/actions";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";


type ActionResult = {
  success:boolean;
  error?:string;
}

type PageFormProps ={
  id?:number | null;
  initialData:{
    title:string,
    text:string,
  } | null
}


export default function PageForm({id = null, initialData = null}:PageFormProps) {

  async function handleSubmit(formData: FormData) {
    let result:ActionResult;

    if(id){
      const updatePageWithId = updatePage.bind(null, id);
      result = await updatePageWithId(formData);
    }
    else{
        result = await createPage(formData);
      }        
    if (!result.success) {
      alert("Error: " + result.error);
      return;
    }
    
   alert(id ? "Page updated!" : "Page created!");
      
    
  }

  return (
    <div className="flex flex-col">
      <div>
        <h1>adding new page</h1>
      </div>
      <div className="adding-page-form flex flex-col">
        <form action={handleSubmit}>
          <FieldGroup className="max-w-sm">
            <Field>
              <FieldLabel htmlFor="block-end-input">Page Title</FieldLabel>
              <InputGroup className="h-auto">
                <InputGroupInput
                  id="block-end-input"
                  placeholder="page title"
                  name="pageTitle"
                  defaultValue={initialData?.title}
                />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="block-end-textarea">Page Content</FieldLabel>
              <InputGroup>
                <InputGroupTextarea
                  id="block-end-textarea"
                  name="pageText"
                  placeholder="Write a comment..."
                  defaultValue={initialData?.text}
                />
              </InputGroup>
            </Field>

            <button type="submit" className="mt-4">
              {id?'update':'submit'}
            </button>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
