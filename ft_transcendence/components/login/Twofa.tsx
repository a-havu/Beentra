'use client'

import { useState } from "react"

interface twoFaProps{
    status:boolean
}




export default function Twofa({status}:twoFaProps){
const [twofaStatus, settwofsStatus] = useState(status)


const handleStatus=()=>{
    const tfaStatus = twofaStatus
    

    settwofsStatus(!tfaStatus)
}

return (
    <div className="flex flex-row gap-4">
        <h3>2fa status:</h3>
        <button className="cursor-pointer" onClick={handleStatus}>{twofaStatus?'Deactivate':'Activate'}</button>
    </div>
)
}