"use client";

import Image from "next/image";
import Link from "next/link";

import Button from "@/components/buttons/Buttons";
import icons from "@/components/icons/icons";

import { useState, ChangeEvent, FormEvent } from "react";
import crud_user from "@/app/api/crud_user"

export default function Page() {

  const [newUser, setNewUser] = useState({
    userName: "",
    userLastName: "",
    mail: "",
    semester: "1er semestre",
    password: "",
    verification: ""
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value
    })
  }

  const text = "Registrarse";
  const color = "red";
  const size = "small";

  //Validación de contraseña
  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
    return regex.test(password);
  }

  /*//Crear usuario a través del backend
  const getUser = async () => {
    const res = await fetch('/api/crud_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    console.log(res);
  }*/
  //Manejo del botón de registro
  const handleRegister = async (e: FormEvent) => {
    let message = "";
    // verificar que todos los campos estén llenos
    if (newUser.userName && newUser.userLastName && newUser.mail && newUser.semester && newUser.password && newUser.verification) {
      //Validar contraseña  
      if (validatePassword(newUser.password)) {
        console.log("Contraseña válida");
        if (newUser.password === newUser.verification) {
          //Registro exitoso
          message = "Registro exitoso";
          e.preventDefault();

          //Enviar datos al backend
          console.log(await crud_user.getUser("", ""))
        } else {
          //Error
          message = "La contraseña y la verificación no coinciden";
        }
      } else {
        //Contraseña inválida
        message = "Contraseña inválida: La contraseña debe tener entre 8 y 15 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un caracter especial";
      }
    } else {
      message = "Todos los campos deben estar llenos";
    }
    console.log(message);
  }

  const loginlink = {
    href: "/login",
    name: "Iniciar sesión",
    label: "Iniciar sesión",
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
      <form onSubmit={handleRegister} className="col-span-4 md:col-span-2 w-[70%] rounded-[10px] bg-[--light] shadow-md shadow-gray-500/50 p-3 md:p-5 flex flex-col justify-center items-center ">
        <h1 className="text-[38px]">Registrarse</h1>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Nombre:</p>
          <input
            type="text"
            name="userName"
            onChange={handleChange}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
            required />
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Apellido:</p>
          <input
            type="text"
            name="userLastName"
            onChange={handleChange}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
            required />
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Correo institucional:</p>
          <input
            type="mail"
            name="mail"
            onChange={handleChange}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
            required />
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Semestre:</p>
          <select 
            onChange={handleChange} 
            name="semester"
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]">
            <option value="1">1er semestre</option>
            <option value="2">2do semestre</option>
            <option value="3">3er semestre</option>
            <option value="4">4to semestre</option>
            <option value="5">5to semestre</option>
            <option value="6">6to semestre</option>
            <option value="7">7mo semestre</option>
            <option value="8">8vo semestre</option>
            <option value="9">9no semestre</option>
          </select>
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Contraseña:</p>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
            required />
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Verificación:</p>
          <input
            type="password"
            name="verification"
            onChange={handleChange}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
            required />
        </div>

        <div className="flex items-center justify-center w-full m-5 p-2">
          <Button
            text={text}
            icon={icons.faRightToBracket}
            color={color}
            type={size}
          />
        </div>
        <p className="text-base flex">
          ¿Ya tienes cuenta? &nbsp;
          <Link
            key={loginlink.name}
            href={loginlink.href}
            className="block md:flex-none hover:text-[--principal-blue] hover:drop-shadow"
          >
            {loginlink.name}
          </Link>
        </p>
      </form>
    </div>
  );
}