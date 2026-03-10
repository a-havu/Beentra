import 'dotenv/config'
import Twofa from '@/components/login/Twofa'

interface UserData {
  id: string
  email: string
  username: string
  twoFactorEnabled: boolean
}

interface profilePageParams{
    id:string,
}

export default async function ProfilePage({params}:{params:Promise<profilePageParams>}){
    const {id} = await params

    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/${id}`)
    if(!response.ok){
        
    }
    const userData:UserData = await response.json()
    return(
        <div>
            {`hello ${userData.email}`}
            <Twofa status={userData.twoFactorEnabled}/>
        </div>
    )
}
