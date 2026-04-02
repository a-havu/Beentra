'use client';


export const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };


export default function LogoutButton() {
  
  return <button onClick={handleLogout} className="flex justify-end w-full cursor-pointer text-[#9e1523] hover:text-[#cf404f]">Logout</button>;
}
