"use client";
import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { EmailInputType, UserEmailZodSchema } from "@/types/zodScemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import FormTitle from "@/components/ui/FormTitle";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ApiKeyPage() {
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const router = useRouter();

  const showToast = (
    message: string,
    type: "success" | "error",
    duration = 3000,
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailInputType>({
    resolver: zodResolver(UserEmailZodSchema),
  });

  const onSubmithandler = async (data: EmailInputType) => {
    if (submitting || success) return;
    setSubmitting(true);

    try {
      const response = await fetch("/api/apikey", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        showToast("API key sent to your email!", "success");
        setTimeout(() => router.push("/reference"), 3000);
      } else {
        showToast("Failed, please try again.", "error");
      }
    } catch (e) {
      console.log("error:", e);
      showToast("Something went wrong.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center">
    <div className="beentra-form-container">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all
            ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}

      <form className="beentra-form" onSubmit={handleSubmit(onSubmithandler)}>
        <FormTitle
          title="API key generating"
          subTitle="Welcome to our public API"
        />
        <p>
          Please add your email to receive an email containing the API key
        </p>
        <p>If you already have the key, go to: <Link href="/reference" className="underline font-semibold text-[#724015]">API Reference</Link></p>
        <Input
          label="your email"
          name="userEmail"
          placeholder="enter your Email"
          id="userEmail"
          required
          type="email"
          register={register}
        />
        <p>
          <span className="bg-red-600">{errors?.userEmail?.message}</span>
        </p>
        <Button
          variant="adding"
          onClick={handleSubmit(onSubmithandler)}
          disabled={success || submitting}
        >
          {success ? "Done ✅" : submitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
    </div>
  );
}
