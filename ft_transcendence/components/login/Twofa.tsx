"use client";

import { useState } from "react";
import Image from "next/image";
import VerifyTfa from "./VerifyTfa";
interface twoFaProps {
  status: boolean;
}

export default function Twofa({ status }: twoFaProps) {
  const [twofaStatus, settwofaStatus] = useState(status);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const handleStatus = async () => {
    try{
        if (!twofaStatus) {
          const response = await fetch("/api/auth/2fa/setup");
          if(!response.ok)
            throw new Error('Fetching data failed')

          const data = await response.json();
          setQrCode(data.qrCode);
        }
        else {
            const response = await fetch("/api/auth/2fa/setup", {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                twoFactorEnabled: false,
                twoFactorSecret: null,
              }),
            });
            if (!response.ok) {
              throw new Error("failed to deactivate 2fa");
            }
            setQrCode(null);
            settwofaStatus(false);
            }
        }catch (e) {
        console.log("error while deactivating 2fa:", e);
      }
    }
  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <h3>2fa status:</h3>
        <button className="cursor-pointer" onClick={handleStatus}>
          {twofaStatus ? "Deactivate" : "Activate"}
        </button>
      </div>
      {qrCode && (
        <div>
          <p>
            scan this code with Authenticator App like Google Authenticator
          </p>
          <Image src={qrCode} alt="Qr Code" width={200} height={200} />
          <VerifyTfa onSuccess={()=>{
               settwofaStatus(true);
      setQrCode(null);
          }}/>
        </div>
      )}
    </div>
  );
}
