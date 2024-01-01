"use client";

import crud_user from "@/app/api/crud_user";
import Button from "@/components/buttons/Button";
import icons from "@/components/icons/icons";
import Section from "@/components/sections/Section";
import DifferentText from "@/components/tools/DifferentText";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const initialUserState = {
  name: "nombre del instructor",
  lastname: "apellido del instructor",
  email: "example@epn.edu.ec",
  role: "instructor",
  semester: "5to",
  approve_teacher: "rick erazo",
  approve_teacher_email: "ricardo.erazo@epn.edu.ec",
  user_description: "cyvgubhnknbhvgytyvgbuhnj",
  score_teacher: 0,
};

export default function Page() {

  const [user, setUser] = useState(initialUserState);
  const isUserLoggedIn = !!localStorage.getItem("token");
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const userName = params.email;
      console.log(userName);
      // !function of getInstructor
      // !const storedUser = await crud_user.getInstructor(userName || "");
      // !setUser({ ...initialUserState, ...storedUser });
    }
    fetchData();
  })


  return (
    <>
      <div className="grid grid-cols-4 gap-2 bg-[--light] p-10">
        <h1 className="text-[38px] text-center col-span-4">
          Perfil del
          <DifferentText color="--principal-red"> instructor</DifferentText>
        </h1>
        <div className="col-span-1 items-start hidden md:block">
          <Image
            src="/PeterParker.jpg"
            width={350}
            height={300}
            alt={`Imagen del instructor`}
            className="rounded-2xl justify-self-end"
          />
        </div>
        <div className="col-span-4 block md:hidden bg-cover w-[175px] h-[175px] bg-top rounded-full bg-[url('/PeterParker.jpg')]"></div>
        <div
          className={`col-span-3 md:col-span-3 w-full p-3 md:p-5 flex flex-col justify-center items-center`}
        >
          <div
            className={`w-full p-3 md:col-span-2 flex flex-col justify-center items-center`}
          >
            <div className="flex items-center justify-between w-full mx-2 p-2">
              <p className="font-bold">Nombre:</p>
              <p className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]">
                {user.name}
              </p>
            </div>
            <div className="flex items-center justify-between w-full mx-2 p-2">
              <p className="font-bold">Apellido:</p>
              <p className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]">
                {user.lastname}
              </p>
            </div>
            <div className="flex items-center justify-between w-full mx-2 p-2">
              <p className="font-bold">Correo institucional:</p>
              <p className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]">
                {user.email}
              </p>
            </div>
            <div className="flex items-center justify-between w-full mx-2 p-2">
              <p className="font-bold">Semestre:</p>
              <p className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]">
                {user.semester}
              </p>
            </div>
            <div className="flex items-center justify-between w-full mx-2 p-2">
              <p className="font-bold">Profesor que lo aprueba:</p>
              <p className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]">
                {user.approve_teacher}
              </p>
            </div>
            <div className="flex items-center justify-between w-full mx-2 p-2">
              <p className="font-bold">Correo del profesor:</p>
              <p className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]">
                {user.approve_teacher_email}
              </p>
            </div>
            <div
              className={`flex items-center justify-between w-full mx-2 p-2`}
            >
              <p className="font-bold">Descripción:</p>
              <textarea rows={7} className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]" placeholder={user.user_description} disabled/>
            </div>
          </div>
          {!isUserLoggedIn && (
            <div
              className={`py-10 col-span-4 flex items-center justify-center flex-wrap md:flex-nowrap md:space-x-8 md:space-y-1`}
            >
              <Link
                key="Registrarse"
                href="/signin"
                className="block mx-2 md:flex-none"
              >
                <Button
                  text="Registrarse"
                  icon={icons.faRightToBracket}
                  type="big"
                  color="red"
                />
              </Link>
              <Link
                key="Iniciar sesión"
                href="/login"
                className="block mx-2 md:flex-none"
              >
                <Button
                  text="Iniciar sesión"
                  icon={icons.faUser}
                  type="big"
                  color="blue"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
      <Section
        title={
          <>
            <DifferentText color="--principal-red">Cursos </DifferentText>
            creados por el instructor
          </>
        }
        description="La educación impartida por el instructor está dejando huella"
        enrolled="enrolled"
        sectionType="courses"
        subtype="instructor-courses"
      />
    </>
  );
}
