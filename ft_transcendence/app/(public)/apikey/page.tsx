'use client'

import Input from '@/components/ui/Input'
import { useForm } from 'react-hook-form'
import {EmailInputType, UserEmailZodSchema} from '@/types/zodScemas'
import { zodResolver } from '@hookform/resolvers/zod'



export default function ApiKeyPage(){
    const{register, handleSubmit ,formState:{errors} } = useForm<EmailInputType>({
        resolver : zodResolver(UserEmailZodSchema)
    })
    
    const onSubmit=async (data:EmailInputType)=>{
        const response = await fetch('/api/apikey',{
            method:'POST',
            headers:{
            'content-type':'text/javascript',
            },
            body:JSON.stringify(data),
        }

        )
    }

    return(<>
    <h3>API KEY generating page</h3>
    <p>welcome to our publi api</p>
    <form onSubmit={handleSubmit(onSubmit)}>
        <Input label='your email' name ="userEmail" placeholder='enter your Email' id='userEmail' required  type='email' register={register}/>
        <p><span className="bg-red-600">{errors?.userEmail?.message}</span></p>
        <button>Submit</button>
    </form>
    </>)

}