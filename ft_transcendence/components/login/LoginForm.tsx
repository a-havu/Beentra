'use client';
import { z, ZodType } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

interface FormData {
  userEmail: string,
  password: string,
}

export function LoginForm() {
  const zodSchema: ZodType<FormData> = z.object({
    userEmail: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  })

  const router = useRouter()

  // Add formState with errors here
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(zodSchema)
  })

  const loginHandler = async (data: FormData) => {
    try {
      const response = await fetch('/api/login', {
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
    <form onSubmit={handleSubmit(loginHandler)}>
      <h1>Welcome back</h1>
      <p>Login to your personal Hive life</p>
      <div>
        <label htmlFor="userEmail">Email</label>
        <input
          {...register("userEmail")}
          id="userEmail"
          type="email"
          placeholder="user@example.ps"
        />
        {errors.userEmail && (
          <p style={{ color: 'red', fontSize: '14px' }}>
            {errors.userEmail.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          {...register("password")}
          id="password"
          type="password"
          placeholder="********"
        />
        {errors.password && (
          <p style={{ color: 'red', fontSize: '14px' }}>
            {errors.password.message}
          </p>
        )}
      </div>
      <button type="submit">Login</button>
      <hr />
      <p>Or continue with</p>
      <button type="button">Github</button>
      <button type="button">Google</button>
      <button type="button">Intra42</button>
      <p>Don't have an account? <a href="/registration">Sign up</a></p>
    </form>
  )
}
