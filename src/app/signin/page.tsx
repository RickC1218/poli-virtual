"use client";

import Image from "next/image";
import Link from "next/link";

import Button from "@/components/buttons/buttons";
import icons from "@/components/icons/icons";

import { useState, ChangeEvent } from "react";

export default function Page() {

  const [selectedSemester, setSelectedSemester] = useState<string>("1er semestre");

  const text = "Registrarse";
  const color = "red";
  const size = "small";

  const handleSemesterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(event.target.value);
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
        <h1 className="text-[38px]">Registrarse</h1>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Nombre:</p>
          <input
            type="text"
            className="bg-[--white] border border-[--light-gray] rounded-[10px] p-2 text-sm w-[55%]" />
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Apellido:</p>
          <input
            type="text"
            className="bg-[--white] border border-[--light-gray] rounded-[10px] p-2 text-sm w-[55%]" />
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Correo institucional:</p>
          <input
            type="mail"
            className="bg-[--white] border border-[--light-gray] rounded-[10px] p-2 text-sm w-[55%]" />
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Semestre:</p>
          <select value={selectedSemester} onChange={handleSemesterChange} className="bg-[--white] border border-[--light-gray] rounded-[10px] p-2 text-sm w-[55%]">
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
            className="bg-[--white] border border-[--light-gray] rounded-[10px] p-2 text-sm w-[55%]" />
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Verificación:</p>
          <input
            type="text"
            className="bg-[--white] border border-[--light-gray] rounded-[10px] p-2 text-sm w-[55%]" />
        </div>

        <div className="flex items-center justify-center w-full m-5 p-2">
          <Button
            text={text}
            icon={icons.faRightToBracket}
            color={color}
            type={size}
          />
        </div>
      </div>
    </div>
  );
}