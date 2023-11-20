"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      router.push('/common');
    }, 1000);

    return () => clearTimeout(redirectTimeout);
  }, [router]);
  return (
    <main>
    </main>
  );
}