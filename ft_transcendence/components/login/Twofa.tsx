"use client";

import { useState } from "react";
import Image from "next/image";
import TfaCodeInput from "./TfaCodeInput";
import { Button } from "@/components/ui/Button";

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
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Status:</span>
          <span className={`text-sm font-semibold ${twofaStatus ? "text-green-600" : "text-gray-400"}`}>
            {twofaStatus ? "Enabled" : "Disabled"}
          </span>
        </div>
        <Button
          variant={twofaStatus ? "delete" : "adding"}
          onClick={handleStatus}
        >
          {twofaStatus ? "Deactivate" : "Activate"}
        </Button>
      </div>
      {qrCode && (
        <div className="flex flex-col gap-3">
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
          <div className="flex justify-end">
            <Button variant="secondary" onClick={() => setQrCode(null)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
