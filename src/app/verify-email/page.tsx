"use client";
import Image from "next/image";
import Link from "next/link";
import crud_user from "@/app/api/crud_user";
import { useEffect, useState } from "react";
import DifferentText from "@/components/DifferentText";

export default function Page() {
  
  /*const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(
    crud_user.getLocalStorageValue('user')
  );   

  useEffect(() => {     // Función que se ejecutará cuando haya cambios en el localStorage    
    const handleStorageChange = () => {       
      setCurrentUserEmail(
        crud_user.getLocalStorageValue('user')
      );     
    };
  });
  */
  /*const verifyEmail = async () => {
    const response = await crud_user.getLocalStorageValue('user');
    console.log(response);
  }

  verifyEmail();*/

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
      <div className="col-span-4 md:col-span-2 w-[70%] rounded-[10px] bg-[--light] shadow-md shadow-gray-500/50 p-3 md:p-5 flex flex-col justify-center items-center">
      <h1 className="text-[38px] m-5 text-center align-middle">
        Tu 
        <DifferentText color="--principal-red"> correo </DifferentText>
        fue verificado exitosamente
      </h1>
      </div>
    </div>
  );
}