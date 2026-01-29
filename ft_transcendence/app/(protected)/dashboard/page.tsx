export const metadata ={
  title:'Dashboard'
}



export default async function Home() {


  return (
    <div>
      <h3>Welcome, {session.username}!</h3>
      <h3> Dashboard Page</h3>
    </div>
  );
}
