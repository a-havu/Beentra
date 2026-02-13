import { RegistrationForm } from "@/components/registration/RegistrationForm"
export const metadata ={
  title:'registration'
}

export default function Home() {
  return (
    <div>
      <h3 className="text-2xl font-bold text-center mb-4">Create an Account</h3>
      <RegistrationForm />
    </div>
  );
}
 