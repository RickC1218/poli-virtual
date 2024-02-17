"use client";

import Image from "next/image";
import Link from "next/link";

import Button from "@/components/buttons/Button";
import icons from "@/components/icons/icons";
import crud_user from "@/app/api/crud_user";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function Page() {
  const text = "Iniciar sesión";
  const color = "blue";
  const size = "small";

  const signinlink = {
    href: "/signin",
    name: "Registrarse",
    label: "Registrarse",
  };

  const forgotlink = {
    href: "/forgot-password",
    name: "¿Olvidaste tu contraseña?",
    label: "¿Olvidaste tu contraseña?",
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

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
    }
  });

  const showAlert = (message: string, type: 'success' | 'error') => {
    Toast.fire({
      icon: type,
      text: message,
      showConfirmButton: false,
      timer: 2000,
    });
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

    //Validating email
    const validateEmail = (email: string) => {
      const regex = /^[a-zA-Z0-9._%+-]+@epn\.edu\.ec$/;
      return regex.test(email);
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let message = "";

    //sanitize inputs
    user.email = escapeHTML(user.email);
    user.password = escapeHTML(user.password);

    // validate email
    if (!validateEmail(user.email)) {
      message = "Correo electrónico inválido";
      showAlert(message, "error");
      return;
    }

    // make login request
    const response = await crud_user.login(user);
    if (response === "Contraseña incorrecta" || response === "Usuario no encontrado" || response === "Correo electrónico no verificado" || response === "Correo electrónico y contraseña no ingresados"){
      message = response;
      showAlert(message, "error");
      setUser({
        email: "",
        password: "",
      });
    } else {
      localStorage.setItem("token", JSON.stringify(response));
      if (response) {
        message = "Inicio de sesión exitoso";
        showAlert(message, "success");
        setTimeout(() => {
          // Redirect to the explore page after the delay
          router.push("/common/explore");
          router.refresh();
        }, 2000);
      } else {
        message = response;
        showAlert(message, "error");
      }
    }
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
          <Link
            key="Explorar"
            href='/common/explore'
          >
            <Image
              src="/logo.png"
              alt="logo"
              width={85}
              height={21.268}
            />
          </Link>
        </div>
        <h1 className="text-[38px] mb-5">Inicio de sesión</h1>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Correo institucional:</p>
          <input
            type="email"
            name="email"
            onChange={handleInputChange}
            value={user.email}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]" />
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Contraseña:</p>
          <input
            type="password"
            name="password"
            onChange={handleInputChange}
            value={user.password}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]" />
        </div>
        <Link
          key={forgotlink.name}
          href={forgotlink.href}
          className="flex self-end pr-2 md:flex-none hover:text-[--principal-red] hover:drop-shadow-md"
        >
          {forgotlink.name}
        </Link>
        <div className="flex items-center justify-center w-full m-5 p-2">
          <Button
            text={text}
            icon={icons.faUser}
            color={color}
            type={size}
          />
        </div>
        <p className="text-base flex">
          ¿Aún no tienes cuenta? &nbsp;
          <Link
            key={signinlink.name}
            href={signinlink.href}
            className="block md:flex-none hover:text-[--principal-red] hover:drop-shadow"
          >
            {signinlink.name}
          </Link>
        </p>
      </form>
    </div>
  );
}