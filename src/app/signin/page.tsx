"use client";

import Image from "next/image";
import Link from "next/link";

import Button from "@/components/buttons/Buttons";
import icons from "@/components/icons/icons";
import crud_user from "@/app/api/crud_user"

import {useRouter, useParams} from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";

export default function Page() {

  const [newUser, setNewUser] = useState({
    email: "",
    name: "",
    lastname: "",
    password: "",
    role: "estudiante", // "estudiante" | "instructor
    semester: "1ro",
    approve_teacher: "",
    approve_teacher_email: "",
    user_description: "",
    enrolled_courses: [],
    //profilePhoto: null
  })

  const router = useRouter();
  const params = useParams();

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value
    })
  }

  const [verification, setVerification] = useState("")

  const handleVerification = (event: ChangeEvent<HTMLInputElement>) => {
    setVerification(event.target.value)
  }

  const text = "Registrarse";
  const color = "red";
  const size = "small";

  //Validación de contraseña
  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
    return regex.test(password);
  }

  //Manejo del botón de registro
  const handleRegister = async (e: FormEvent) => {
    try {
      let message = "";
      e.preventDefault();
      // verificar que todos los campos estén llenos
      if (newUser.name && newUser.lastname && newUser.email && newUser.semester && newUser.password && verification) {
        //Validar contraseña  
        if (validatePassword(newUser.password)) {
          if (newUser.password === verification) {
            //Registro exitoso
            message = "Registro exitoso";
            //Enviar datos al backend
            const response = await crud_user.createUser(newUser);
            console.log(response);
            //Envio de correo de verificación
            //const resEmail = await crud_user.sendVerificationEmail(newUser.email);
            //console.log(resEmail);
            //Redirigir a la página de inicio de sesión
            router.push("/login");
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
    } catch (error) {
      console.log(error)
    }
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
            name="name"
            onChange={handleChange}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
            required />
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Apellido:</p>
          <input
            type="text"
            name="lastname"
            onChange={handleChange}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
            required />
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Correo institucional:</p>
          <input
            type="email"
            name="email"
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
            <option value="1ro">1er semestre</option>
            <option value="2do">2do semestre</option>
            <option value="3ro">3er semestre</option>
            <option value="4to">4to semestre</option>
            <option value="5to">5to semestre</option>
            <option value="6to">6to semestre</option>
            <option value="7mo">7mo semestre</option>
            <option value="8vo">8vo semestre</option>
            <option value="9no">9no semestre</option>
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
            onChange={handleVerification}
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