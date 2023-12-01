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

  const text1 = "Cerrar sesión";
  const color1 = "red";
  const size1 = "big";

  const text2 = "Guardar cambios";
  const color2 = "blue";
  const size2 = "big";

  const text3 = "Cambiar contraseña";
  const color3 = "neutral";
  const size3 = "big";

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
      <div className="grid grid-cols-4 gap-2 bg-[--light] place-items-center p-10">
        <h1 className="text-[38px] col-span-4">Tu 
          <DifferentText color="--principal-red"> perfil</DifferentText>
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
        </div>
        <div className="py-10 col-span-4 flex items-center justify-center space-y-2 md:space-x-8 md:space-y-0">
          <Link
            key="SingOut"
            href='/common/explore'
          >
            <Button
              text={text1}
              icon={icons.faRightToBracket}
              color={color1}
              type={size1}
            />
          </Link>
          <Button
            text={text2}
            icon={icons.faRightToBracket}
            color={color2}
            type={size2}
            onClick={handleUpdateProfile}
          />
          <Button
            text={text3}
            icon={icons.faRightToBracket}
            color={color3}
            type={size3}
          />
        </div>
      </div>
      <Banner
        title={<>
          Conviértete en un
          <DifferentText color="--principal-blue"> instructor </DifferentText>
        </>}
        description="Crear una comunidad en línea donde los estudiantes de diferentes niveles académicos compartan conocimientos y habilidades, promoviendo un ciclo constante de aprendizaje y enseñanza para el crecimiento de todos los usuarios."
        button={true}
        image={true}
        addStyle={`bg-[--high-gray]`}
      />
    </>
  );
}