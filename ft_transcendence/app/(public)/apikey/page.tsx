"use client";

import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { EmailInputType, UserEmailZodSchema } from "@/types/zodScemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import FormTitle from '@/components/ui/FormTitle'
export default function ApiKeyPage() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailInputType>({
    resolver: zodResolver(UserEmailZodSchema),
  });

  const onSubmithandler = async (data: EmailInputType) => {
    try {
      const response = await fetch("/api/apikey", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSuccess(true);
        alert("Success, the api key sent to your email.");
      } else {
        alert("Failed, please try again");
      }
    } catch (e) {
      console.log("error:", e);
    }
  };

  return (
    <>
   
      <div className="bentra-form-container">
        <form className="beentra-form" onSubmit={handleSubmit(onSubmithandler)}>
          <FormTitle title="API KEY generating" subTitle="welcome to our public api"/>
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
          disabled={success}> {success ? "Done ✅" : "Submit"}</Button>
        </form>
      </div>
    </>
  );
}
