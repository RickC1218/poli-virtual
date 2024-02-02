"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/buttons/Button";
import icons from "@/components/icons/icons";
import crud_user from "@/app/api/crud_user";

import { useEffect, FormEvent, useState } from "react";
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

  const [pass, setPass] = useState({
    password: "",
    verification: "",
  });

  const handleChange = (e: any) => {
    setPass({
      ...pass,
      [e.target.name]: e.target.value,
    });
  };

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

  //Validating password
  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
    return regex.test(password);
  };

  const handleUpdateAccount = async (e: FormEvent) => {
    try {
      let message = "";
      e.preventDefault();
      //Validate password
      if (validatePassword(pass.password)) {
        if (pass.password === pass.verification) {
          const userData = {
            email: localStorage.getItem("email"),
            password: pass.password,
          };
          // make sure the session token is available
          // update the user
          const response = await crud_user.restorePassword(userData);
          message = response;
          // redirect to the explore page
          if (message.startsWith("Contraseña actualizada")) {
            localStorage.removeItem("email");
            showAlert(message, "success");
            router.push("/login");
            router.refresh();
          }
        } else {
          //Error
          message = "La contraseña y la verificación no coinciden.";
          showAlert(message, "error");
        }
      } else {
        //password error
        message =
          "Contraseña inválida: La contraseña debe tener entre 8 y 15 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un caracter especial.";
        showAlert(message, "warning");
      }
    } catch (error) {
      showAlert("Error al actualizar la contraseña.", "error");
    }
  };

  return (
    <div className="h-screen grid grid-cols-3 lg:grid-cols-4 gap-2 bg-[--white] place-items-center md:p-10">
      <div className="col-span-1 lg:col-span-2 hidden md:block">
        <Link key="Explorar" href="/common/explore">
          <Image src="/logo.png" alt="logo" width={300} height={212.68} />
        </Link>
      </div>
      <div className="col-span-4 md:col-span-2 w-[70%] rounded-[10px] bg-[--light] shadow-md shadow-gray-500/50 p-3 md:p-5 flex flex-col justify-center items-center ">
        <div className="block md:hidden py-5">
          <Link key="Explorar" href="/common/explore">
            <Image src="/logo.png" alt="logo" width={85} height={21.268} />
          </Link>
        </div>
        <h1 className="text-[38px] mb-5 text-center">Restauración de cuenta</h1>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Nueva contraseña:</p>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          />
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Verificación:</p>
          <input
            type="password"
            name="verification"
            onChange={handleChange}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          />
        </div>
        <div className="flex items-center justify-center w-full m-5 p-2">
          <Link onClick={handleUpdateAccount} href="/login">
            <Button
              text="Restaurar cuenta"
              icon={icons.faLock}
              color="red"
              type="small"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
