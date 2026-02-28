'use client';
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Input from '../ui/Input';
import Link from 'next/link';
import { loginZodSchema, loginFormTypes } from '@/types/zodScemas'







export function LoginForm() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<loginFormTypes>({
    resolver: zodResolver(loginZodSchema)
  })

  const loginHandler = async (data: loginFormTypes) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: data.userEmail,
          password: data.password,
        }),
      })
      if (response.ok) {
        router.refresh();
        router.push('/');
      } else {
        console.log('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(loginHandler)} className="general-form">
      <h1>Welcome back</h1>
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

      <button type="submit">Login</button>
      <hr />
      <p>Or continue with</p>
      <div className="flex flex-row gap-2">
        <Link href="/api/auth/github"><button type="button">Github</button></Link>
        <button type="button">Google</button>
        <button type="button">Intra42</button>
      </div>

      <p>Don't have an account? <a href="/registration">Sign up</a></p>
    </form>
  )
}
