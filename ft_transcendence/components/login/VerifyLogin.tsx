"use client";
import { useRouter } from "next/navigation";
import TfaCodeInput from "@/components/login/TfaCodeInput";

interface Props {
  tempToken: string;
}

export default function VerifyLogin({ tempToken }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center">
      <h2 className="mt-6">Verify code:</h2>
      <TfaCodeInput
        temptoken={tempToken}
        apiUrl="/api/auth/2fa/verify"
        method="POST"
        onSuccess={async () => {
          await router.refresh();
          router.push("/");
        }}
      />
    </div>
  );
}
