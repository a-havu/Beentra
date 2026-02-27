import Input from "../ui/Input";
import { useForm } from "react-hook-form";

interface TfaCodeInputProps {
  onSuccess: () => void;
  apiUrl: string;
  method: "PUT" | "POST";
  temptoken?: string;
}

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
  } = useForm<{ code: string }>();

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
    <form onSubmit={handleSubmit(checkCode)}>
      <Input
        label="Enter 2FA code"
        name="code"
        id="code"
        type="text"
        placeholder="Enter the code from your authenticator app"
        register={register}
        errors={errors}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
