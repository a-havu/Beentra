'use client';

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/';
  };

  return <button onClick={handleLogout} className="flex items-center justify-start cursor-pointer">Logout</button>;
}
