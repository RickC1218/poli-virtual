"use client";

import Image from "next/image";
import Link from "next/link";

import Button from "@/components/buttons/Button";
import icons from "@/components/icons/icons";

import crud_user from "@/app/api/crud_user";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const text = "Enviar correo";
  const color = "red";
  const size = "small";

  const signinlink = {
    href: "/signin",
    name: "Registrarse",
    label: "Registrarse",
  };

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token !== "undefined" && token !== "null") {
      router.push("/common/explore");
    }
  });
  const [email, setEmail] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 2000); // close the alert after 2 seconds
  };

  const sendEmail = async() => {
    const response = await crud_user.sendEmailToRestorePassword(email);
    showAlert(response);
    if (response.startsWith("Correo electrónico enviado")) {
      localStorage.setItem("email", email);
    }
  };

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
      <div className="col-span-4 md:col-span-2 w-[70%] rounded-[10px] bg-[--light] shadow-md shadow-gray-500/50 p-3 md:p-5 flex flex-col justify-center items-center ">
      <h1 className="text-[38px] mb-5 text-center">Recuperar cuenta</h1>
          <div className="flex items-center justify-between w-full mx-2 p-2">
            <p className="font-bold">Correo institucional:</p>
            <input
              type="mail"
              name="email"
              onChange={handleChange}
              className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]" />
          </div>
          {alertMessage && (
          <div className={`${alertMessage.startsWith("Correo electrónico enviado") ? 'bg-green-500' : 'bg-red-500'} text-[--light] z-40 p-2 rounded-md text-center`}>
            {alertMessage}
          </div>
        )}
          <div className="flex items-center justify-center w-full m-5 p-2">
          <Button
            text={text}
            icon={icons.faEnvelope}
            color={color}
            type={size}
            onClick={sendEmail}
          />
        </div>
        <p className="text-base flex">
          ¿Aún no tienes cuenta? &nbsp;
          <Link
            key={signinlink.name}
            href={signinlink.href}
            className="block md:flex-none hover:text-[--principal-blue] hover:drop-shadow"
          >
            {signinlink.name}
          </Link>
        </p>
      </div>
    </div>
  );
}