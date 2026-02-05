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

import {createPage} from '@/app/(protected)/actions'
export default async function AddingPage(){

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

