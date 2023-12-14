"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { AuthProvider } from '@/context/AuthContext';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      router.push('/common/explore');
    }, 1000);

    return () => clearTimeout(redirectTimeout);
  }, [router]);
  return (
    <main>
    </main>
  );
}