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


import {session_data} from '@/types/session' //import types from types file

export default function AddingPage(user_data:session_data){

  const session = user_data
  console.log(session);
  async function createPage(formData:FormData){
      'use server'

      const rawFormData = {
        pageTitle: formData.get('pageTitle'),
        pageText:formData.get('pageText')
      }
      console.log("session:", session.email);
      console.log(rawFormData)

  }



    return (
            <div className="flex flex-col">
                <div>
                    <h1>adding new page</h1>
                </div>
                <div className="adding-page-form flex flex-col">
                    <form action={createPage}>
                      <FieldGroup className="max-w-sm">
                        <Field>
                          <FieldLabel htmlFor="block-end-input">Page Title</FieldLabel>
                          <InputGroup className="h-auto">
                            <InputGroupInput 
                              id="block-end-input" 
                              placeholder="page title" 
                              name="pageTitle"
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

