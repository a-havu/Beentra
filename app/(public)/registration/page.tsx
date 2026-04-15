import { RegistrationForm } from "@/components/registration/RegistrationForm";

export const metadata = {
  title: "registration",
};

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      <h3 className="text-2xl font-bold text-center mb-4 mt-6">
        Create an Account
      </h3>
      <RegistrationForm admin={false} />
    </div>
  );
}
