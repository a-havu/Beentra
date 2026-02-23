import 'dotenv/config'
import Twofa from '@/components/login/Twofa'

interface profilePageParams{
    id:string,
}

export default async function ProfilePage({params}:{params:Promise<profilePageParams>}){
    const {id} = await params

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/${id}`)
    const userData = await response.json()

    return(
        <div>
            {`hello ${userData.email}`}
            <Twofa status="false"/>
        </div>
    )
}
