"use client";
import Image from "next/image";
import Link from "next/link";

import crud_user from "@/app/api/crud_user";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/buttons/Button";
import icons from "@/components/icons/icons";
import Swal from "sweetalert2";

export default function Page() {
  
  const [emailVerification, setEmailVerification] = useState("");
  const router = useRouter();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const showAlert = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    Toast.fire({
      icon: type,
      text: message,
      showConfirmButton: false,
      timer: 4000,
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailVerification(e.target.value)
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let message = "";
    try {
      //sanitize input
      const email = escapeHTML(emailVerification);
      const response = await crud_user.beInstructor({email});
      message = response;
      //redirect to confirm page
      if(message === "Rol del estudiante actualizado") {
        showAlert(message, "success");
        setTimeout(() => {
          // Redirect to the explore page after the delay
          router.push("/approve-to-be-teacher/confirm");
          router.refresh();
        }, 2000);
      }
    } catch (error) {
      showAlert("Error al enviar el correo de verificación", "error");
    }
  };

  const escapeHTML = (unsafe: string): string => {
    return unsafe.replace(/[&<">']/g, (match) => {
      switch (match) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case '"':
          return "&quot;";
        case "'":
          return "&#x27;";
        case ">":
          return "&gt;";
        default:
          return match;
      }
    });
  };

  return (
    <div className="h-screen grid grid-cols-3 lg:grid-cols-4 gap-2 bg-[--white] place-items-center md:p-10">
      <div className="col-span-1 lg:col-span-2 hidden md:block">
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
      <form className="col-span-4 md:col-span-2 w-[70%] rounded-[10px] bg-[--light] shadow-md shadow-gray-500/50 p-3 md:p-5 flex flex-col justify-center items-center " onSubmit={handleSubmit}>
        <div className="block md:hidden py-5">
          <Link key="Explorar" href="/common/explore">
            <Image src="/logo.png" alt="logo" width={85} height={21.268} />
          </Link>
        </div>
        <h1 className="text-[38px] text-center mb-5">Confirmación de correo electrónico</h1>
        <p className="mx-2 text-start align-middle">Escribe el correo del estudiante que ha pedido ser instructor.</p>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Correo institucional:</p>
          <input
            type="email"
            name="emailVerification"
            onChange={handleInputChange}
            value={emailVerification}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]" />
        </div>
        <div className="flex items-center justify-center w-full m-5 p-2">
          <Button
            text="Enviar correo"
            icon={icons.faEnvelope}
            color="blue"
            type="small"
          />
        </div>
        <p className="text-base flex">
          <Link
            key="Quienes somos"
            href="/common/us"
            className="block md:flex-none hover:text-[--principal-blue] hover:drop-shadow"
          >
            ¿Quienes somos?
          </Link>
        </p>
      </form>
    </div>
  );
}