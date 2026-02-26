"use client";
import { useSearchParams, useRouter } from "next/navigation";
import TfaCodeInput from "@/components/login/TfaCodeInput";

export default function VerifyLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  if (!token) return <p>Invalid or expired link.</p>;
  return (
    <>
      <h2>Verify code:</h2>
      <TfaCodeInput
        temptoken={token}
        apiUrl="/api/auth/2fa/verify"
        method="POST"
        onSuccess={async () => {
          await router.refresh();
          router.push("/");
        }}
      />
    </>
  );
}
