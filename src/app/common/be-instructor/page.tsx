'use client';

import Banner from "@/components/Banner";
import DifferentText from "@/components/DifferentText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "@/components/icons/icons";
import Button from "@/components/buttons/Buttons";

import { useState, ChangeEvent } from "react";
import Link from "next/link";

export default function Page() {


  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("1er semestre");

  const text = "Enviar";
  const color = "blue";
  const size = "small";

  //Manejo del campo de nombre
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  //Manejo del campo de apellido
  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  //Manejo del campo de correo
  const handleMailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value);
  };

  //Manejo del cambio de semestre
  const handleSemesterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(event.target.value);
  };


  //Manejo del botón de actualizar perfil
  const handleUpdateProfile = () => {
    let message = "";
    // verificar que todos los campos estén llenos
    if (name && lastName && mail && selectedSemester) {
      message = "Perfil actualizado";
    } else {
      message = "Todos los campos deben estar llenos";
    }
    console.log(message);
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-2 place-items-center bg-[--light] p-10">
        <h1 className="text-[38px] col-span-4">Formulario para ser
          <DifferentText color="--principal-red"> instructor</DifferentText>
        </h1>
        <div className="col-span-2 hidden md:block">
          <FontAwesomeIcon icon={icons.faUser} className="w-[300px] h-[300px] text-[--principal-blue]" />
        </div>
        <div className="col-span-4 md:col-span-2 w-[70%] p-3 md:p-5 flex flex-col justify-center items-center ">
          <div className="flex items-center justify-between w-full mx-2 p-2">
            <p className="font-bold">Nombre:</p>
            <input
              type="text"
              onChange={handleNameChange}
              className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
              required />
          </div>
          <div className="flex items-center justify-between w-full mx-2 p-2">
            <p className="font-bold">Apellido:</p>
            <input
              type="text"
              onChange={handleLastNameChange}
              className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
              required />
          </div>
          <div className="flex items-center justify-between w-full mx-2 p-2">
            <p className="font-bold">Correo institucional:</p>
            <input
              type="mail"
              onChange={handleMailChange}
              className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
              required />
          </div>
          <div className="flex items-center justify-between w-full mx-2 p-2">
            <p className="font-bold">Semestre:</p>
            <select value={selectedSemester} onChange={handleSemesterChange} className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]">
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
            <p className="font-bold">Profesor que te aprueba:</p>
            <input
              type="text"
              onChange={handleLastNameChange}
              className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
              required />
          </div>
          <div className="flex items-center justify-between w-full mx-2 p-2">
            <p className="font-bold">Correo del profesor:</p>
            <input
              type="mail"
              onChange={handleMailChange}
              className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
              required />
          </div>
        </div>
        <div className="py-10 col-span-4 flex items-center justify-center space-y-2 md:space-x-8 md:space-y-0">
          <Link
            key="sendMail"
            href="/"
          >
            <Button
              text={text}
              icon={icons.faChevronRight}
              color={color}
              type={size}
            />
          </Link>
        </div>
      </div>
    </>
  );
}