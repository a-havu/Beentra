'use client';


export const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };


export default function LogoutButton() {
  
  return <button onClick={handleLogout} className="flex items-center justify-start cursor-pointer">Logout</button>;
}
