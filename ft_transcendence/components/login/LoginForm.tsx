"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Input from "../ui/Input";
import Link from "next/link";
import { loginZodSchema, loginFormTypes } from "@/types/zodScemas";
import { Button } from "../ui/Button";

export function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormTypes>({
    resolver: zodResolver(loginZodSchema),
  });

  const loginHandler = async (data: loginFormTypes) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: data.userEmail,
          password: data.password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.twoFactor) router.push("/logintfa");
        else {
          router.push("/");
          router.refresh();
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
  <div className="beentra-form-container">
    <form  className="beentra-form">
      <h1>Welcome to Beentra</h1>
      <p>Login to your personal Hive life</p>

      {/* Use Input component for email too */}
      <Input
        label="Email"
        name="userEmail"
        id="userEmail"
        type="email"
        placeholder="user@example.ps"
        register={register}
        errors={errors}
      />

      {/* Corrected password input */}
      <Input
        label="Password"
        name="password"
        id="password"
        type="password"
        placeholder="********"
        register={register}
        errors={errors}
      />

      <Button onClick={handleSubmit(loginHandler)}> Login</Button>
      <hr />
      
      <div className="flex flex-col justify-center gap-2">
          <h4 className="self-center">Or continue with</h4>
          <div className="flex flex-row gap-4 self-center ">
                <Link href="/api/auth/github" prefetch={false}>
                <Button>Github</Button>
              </Link>
              <button type="button">Intra42</button>
          </div>
          <hr />
          <h4 className="self-center">Don't have an account?</h4>
      <a className="self-center" href="/registration"><Button>Sign up</Button></a>
      </div>
    <div className="staticPages self-center">
    <h4 className="self-center">Read our <Link href='/terms'>terms</Link> and <Link href='/privacy'>privacy</Link></h4>
    <h4 className="self-center">for developers you can check our <Link href='/apikey'>public API</Link> </h4>
    </div>
      
    </form>

    </div>
  );
}
