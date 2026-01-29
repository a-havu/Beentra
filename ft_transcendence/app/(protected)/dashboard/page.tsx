import { getSession } from "@/lib/auth";


export const metadata ={
  title:'Dashboard'
}



export default async function Home() {
  const session = await getSession();

  return (
    <div>
      <h3>Welcome, {session.username}, you are {session.role}!</h3>
      <h3> Dashboard Page</h3>
    </div>
  );
}
