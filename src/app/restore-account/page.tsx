"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/buttons/Button";
import icons from "@/components/icons/icons";
import crud_user from "@/app/api/crud_user";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {

  const router = useRouter();

  const [pass, setPass] = useState({
    password: '',
    verification: ''
  });

  const handleChange = (e: any) => {
    setPass({
      ...pass,
      [e.target.name]: e.target.value
    });
  };

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000); // close the alert after 3 seconds
  };

    //Validating password
    const validatePassword = (password: string) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
      return regex.test(password);
    }

  const handleUpdateAccount = async (e:FormEvent) => {
    try {
      let message = "";
      e.preventDefault();
      // obtain the session token from the user object
      const session_token = JSON.parse(localStorage.getItem('token') ?? "{}");
      //Validate password
      if (validatePassword(pass.password)) {
        if (pass.password === pass.verification) {
          const userData = {
            password: pass.password,
          }
          // make sure the session token is available
          if (session_token) {
            // update the user
            const response = await crud_user.updatePassword(userData, session_token);
            message = response;
            // redirect to the explore page
            showAlert(message);
            router.push("/login");
            router.refresh();
          }else {
            message = 'Probablemente no has iniciado sesión.';
          }
        }  else {
          //Error
          message = "La contraseña y la verificación no coinciden.";
        }
        showAlert(message);
      } else {
        //password error
        message = "Contraseña inválida: La contraseña debe tener entre 8 y 15 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un caracter especial.";
        showAlert(message);
      }
    } catch (error) {
        showAlert('Error al actualizar la contraseña.');
      }
  }

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
        <h1 className="text-[38px] mb-5 text-center">Restauración de cuenta</h1>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Nueva contraseña:</p>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]" />
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Verificación:</p>
          <input
            type="password"
            name="verification"
            onChange={handleChange}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]" />
        </div>
        {alertMessage && (
          <div className={`${alertMessage.startsWith("Contraseña actualizada") ? 'bg-green-500' : 'bg-red-500'} text-[--light] z-40 p-2 rounded-md text-center`}>
            {alertMessage}
          </div>
        )}
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