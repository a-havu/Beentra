'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
      router.refresh(); // Refresh server components
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      disabled={isLoading}
      className="flex w-full items-center cursor-pointer text-[#9e1523] hover:text-[#cf404f] disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-md hover:bg-[#c8e6f4] transition-colors"
    >
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
}