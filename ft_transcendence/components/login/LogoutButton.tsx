'use client';

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST' });
    window.location.href = '/';
  };

  return <button onClick={handleLogout}>Logout</button>;
}