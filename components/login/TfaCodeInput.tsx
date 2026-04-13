import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "../ui/Button"


interface TfaCodeInputProps {
  onSuccess: () => void;
  apiUrl: string;
  method: "PUT" | "POST";
  temptoken?: string;
}
const zodSchema = z.object({
  code: z.string().length(6, { message: "Code must be exactly 6 digits" }).regex(/^\d+$/, { message: "Code must be digits" })
})

type FormData = z.infer<typeof zodSchema>

export default function TfaCodeInput({
  onSuccess,
  apiUrl,
  method,
  temptoken,
}: TfaCodeInputProps) {




  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(zodSchema) });

  const checkCode = async ({ code }: { code: string }) => {
    try {
      const response = await fetch(apiUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, temptoken }),
      });
      if (!response.ok) {
        const data = await response.json();
        setError("code", { message: data.error });
        return;
      }
      onSuccess();
    } catch (e) {
      setError("code", { message: "Something went wrong, please try again" });
    }
  };

  return (
	<div className="w-full flex items-center bg-[#CDCEFF] rounded-xl p-4">
    <form onSubmit={handleSubmit(checkCode)} className="w-full">
      <Input
        label="Enter 2FA code"
        name="code"
        id="code"
        type="text"
        placeholder="Enter the code from your authenticator app"
        register={register}
        errors={errors}
      />

		<div className="flex justify-end gap-3 mt-6">
      <Button type="submit">Submit</Button>
			</div>
    </form>
	</div>
  );
}
