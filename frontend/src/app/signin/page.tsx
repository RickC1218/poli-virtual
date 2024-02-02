"use client";

import Image from "next/image";
import Link from "next/link";
import FormProfile from "@/components/forms/FormProfile";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token !== "undefined" && token !== "null") {
      router.push("/common/explore");
    }
  });
  
  return (
    <div className="h-screen grid grid-cols-4 gap-2 bg-[--white] place-items-center p-10">
      <div className="col-span-2 hidden md:block">
        <Link
          key="Explorar"
          href='/common/explore'
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={300}
            height={212.68}
          />
        </Link>
      </div>
      <FormProfile type="new-user" />
    </div>
  );
}