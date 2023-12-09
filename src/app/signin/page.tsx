"use client";

import Image from "next/image";
import Link from "next/link";
import FormProfile from "@/components/FormProfile";

export default function Page() {
  
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