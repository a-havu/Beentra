'use client';
import { Button } from "../ui/button";
export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/';
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}