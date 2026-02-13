'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState("")
  const [password, setPassword] = useState("")

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: userEmail,
          password: password,
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
    <form onSubmit={loginHandler}>
      <h1>Welcome back</h1>
      <p>Login to your personal Hive life</p>

      <div>
        <label htmlFor="userEmail">Email</label>
        <input
          id="userEmail"
          type="email"
          placeholder="user@example.ps"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <a href="#">Forgot your password?</a>
        <input
          id="password"
          type="password"
          value={password}
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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