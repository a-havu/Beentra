'use client'

import { useSearchParams } from "next/navigation";
import VerifyTfa from "@/components/login/VerifyTfa";


export default function VerifyLogin() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) return <p>Invalid or expired link.</p>;

  return (
    <>
      <h2>verify code:</h2>
      <VerifyTfa token={token} />
    </>
  );
}
