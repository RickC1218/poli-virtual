"use client";
import Image from "next/image";
import Link from "next/link";

import crud_user from "@/app/api/crud_user";
import DifferentText from "@/components/tools/DifferentText";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token !== "undefined" && token !== "null") {
      router.push("/common/explore");
    }
  });

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const showAlert = (
    message: string,
    type: "success" | "error" | "warning" | "info"
  ) => {
    Toast.fire({
      icon: type,
      text: message,
      showConfirmButton: false,
      timer: 4000,
    });
  };

  const verifyEmail = async () => {
    try {
      const sessionToken = localStorage.getItem("emailVerify");
      const email = await crud_user.emailVerification(sessionToken ?? "");

      if (email === "Correo electrónico verificado") {
        localStorage.removeItem("emailVerify");
        showAlert("Correo electrónico verificado", "success");
      } else {
        showAlert("Error al verificar el correo electrónico", "warning");
      }
    } catch (error) {
      console.log(error);
    }
  };

  verifyEmail();

  return (
    <div className="h-screen grid grid-cols-3 lg:grid-cols-4 gap-2 bg-[--white] place-items-center md:p-10">
      <div className="col-span-1 lg:col-span-2 hidden md:block">
        <Link key="Explorar" href="/common/explore">
          <Image src="/logo.png" alt="logo" width={300} height={212.68} />
        </Link>
      </div>
      <div className="col-span-4 md:col-span-2 w-[70%] rounded-[10px] bg-[--light] shadow-md shadow-gray-500/50 p-3 md:p-5 flex flex-col justify-center items-center">
        <div className="block md:hidden py-5">
          <Link key="Explorar" href="/common/explore">
            <Image src="/logo.png" alt="logo" width={85} height={21.268} />
          </Link>
        </div>
        <h1 className="text-[38px] m-5 text-center align-middle">
          Tu
          <DifferentText color="--principal-red"> correo </DifferentText>
          fue verificado exitosamente
        </h1>
        <div className="flex items-center justify-center w-full m-5 p-2">
          <h1 className="m-5 text-center align-middle">
            Regresa a la pestaña anterior para iniciar sesión
          </h1>
        </div>
      </div>
    </div>
  );
}
