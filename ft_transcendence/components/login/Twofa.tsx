"use client";

import { useState } from "react";
import Image from "next/image";
import TfaCodeInput from "./TfaCodeInput";

interface TwoFaProps {
  status: boolean;
}

export default function Twofa({ status }: TwoFaProps) {
  const [twofaStatus, setTwofaStatus] = useState(status);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const enableTwoFactor = async () => {
    try {
      const response = await fetch("/api/auth/2fa/setup");
      if (!response.ok) throw new Error("Fetching data failed");
      const data = await response.json();
      setQrCode(data.qrCode);
    } catch (e) {
      console.log("Error while activating 2fa:", e);
    }
  };

  const disableTwoFactor = async () => {
    try {
      const response = await fetch("/api/auth/2fa/setup", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          twoFactorEnabled: false,
          twoFactorSecret: null,
        }),
      });
      if (!response.ok) throw new Error("Failed to deactivate 2fa");
      setQrCode(null);
      setTwofaStatus(false);
    } catch (e) {
      console.log("Error while deactivating 2fa:", e);
    }
  };

  const handleStatus = async () => {
    if (!twofaStatus) {
      await enableTwoFactor();
    } else {
      await disableTwoFactor();
    }
  };

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
            Scan this code with an Authenticator app like Google Authenticator
          </p>
          <Image src={qrCode} alt="QR Code" width={200} height={200} />
          <TfaCodeInput
            apiUrl="/api/auth/2fa/activation"
            method="PUT"
            onSuccess={() => {
              setTwofaStatus(true);
              setQrCode(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
