"use client";
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
    handleSubmit,setError,
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
        setError("root", { message: errorData.message || "Login failed" });
      }
    } catch (error) {
          setError("root", { message: "Something went wrong. Please try again." });

    }
  };

  return (
    <div className="beentra-form-container md:!w-200">
      <form className="beentra-form">
        <h1 className="p-1 flex justify-center">Welcome to Beentra</h1>
        <p className="p-1 flex justify-center">New here?<Link href="/registration" className="underline ml-1 font-semibold text-[#724015]">Sign Up</Link></p>

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
        {errors.root && (
  <p className="text-red-500 text-sm">{errors.root.message}</p>
)}
        <Button onClick={handleSubmit(loginHandler)}> Login</Button>

        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px bg-black" />
          <span className="text-md text-black whitespace-nowrap">
            or login with
          </span>
          <div className="flex-1 h-px bg-black" />
        </div>

        <div className="flex flex-col justify-center gap-2">
          <div className="flex flex-row gap-4 self-center ">
            <a href="/api/auth/github">
              <Button>Github</Button>
            </a>

            <a href="/api/auth/fortyTwo">
              <Button>Intra42</Button>
            </a>
          </div>
        

        </div>


        <h4 className="self-center">
          Developers: you can check out our <Link href="/apikey" className="underline font-semibold text-[#724015]">public API</Link>{" "}
        </h4>
      </form>

    </div>
  );
}
