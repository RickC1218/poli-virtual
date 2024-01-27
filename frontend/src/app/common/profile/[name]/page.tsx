"use client";

import crud_user from "@/app/api/crud_user";
import Button from "@/components/buttons/Button";
import icons from "@/components/icons/icons";
import Section from "@/components/sections/Section";
import DifferentText from "@/components/tools/DifferentText";
import StarRating from "@/components/tools/StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const initialUserState = {
  name: "",
  lastname: "",
  email: "",
  role: "instructor",
  semester: "",
  approve_teacher: "",
  approve_teacher_email: "",
  user_description: "",
  score_teacher: 0,
  profile_image_url: "",
};

export default function Page() {
  const [user, setUser] = useState(initialUserState);
  const params = useParams();
  const userName = params.name as string;
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsUserLoggedIn(localStorage.getItem("token") !== null);
      const user = await crud_user.getInstructor(userName);
      if (user.profile_image_url) {
        user.profile_image_url = user.profile_image_url.replace('s3.amazonaws.com/', '')
      }
      setUser(user);
    }
    fetchData();
  });

  return (
    <>
      <div className="grid grid-cols-4 gap-2 bg-[--light] p-10">
        <h1 className="text-[38px] text-center col-span-4">
          Perfil del
          <DifferentText color="--principal-red"> instructor</DifferentText>
        </h1>
        <div className="col-span-4 md:col-span-1 flex flex-col justify-start">
          <div className="flex justify-center self-start w-full">
          {user.profile_image_url ? (
            <div className={`bg-cover w-[175px] h-[175px] bg-top rounded-full`} style={{ backgroundImage: `url('${user.profile_image_url}')` }}></div>
          ): (
            <div className="w-[175px] h-[175px] rounded-full">
              <FontAwesomeIcon
                  icon={icons.faUser}
                  className="w-[175px] h-[175px] text-[--principal-blue]"
                />
            </div>
          )}          
          </div>
          <div className="flex justify-center items-center w-full pt-5">
            <StarRating ranking={user.score_teacher} />
          </div>
        </div>
        <div
          className={`col-span-4 md:col-span-3 w-full p-3 md:p-5 flex flex-col justify-center items-center`}
        >
          <div
            className={`w-full p-3 md:col-span-2 flex flex-col justify-center items-center`}
          >
            <div className="flex items-center justify-between w-full mx-2 p-2">
              <p className="font-bold">Nombre:</p>
              <p className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%] truncate">
                {user.name}
              </p>
            </div>
            <div className="flex items-center justify-between w-full mx-2 p-2">
              <p className="font-bold">Apellido:</p>
              <p className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%] truncate">
                {user.lastname}
              </p>
            </div>
            <div className="flex items-center justify-between w-full mx-2 p-2">
              <p className="font-bold">Correo institucional:</p>
              <p className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%] truncate">
                {user.email}
              </p>
            </div>
            <div className="flex items-center justify-between w-full mx-2 p-2">
              <p className="font-bold">Semestre:</p>
              <p className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%] truncate">
                {user.semester}
              </p>
            </div>
            <div className="flex items-center justify-between w-full mx-2 p-2">
              <p className="font-bold">Profesor que lo aprueba:</p>
              <p className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%] truncate">
                {user.approve_teacher}
              </p>
            </div>
            <div className="flex items-center justify-between w-full mx-2 p-2">
              <p className="font-bold">Correo del profesor:</p>
              <p className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%] truncate">
                {user.approve_teacher_email}
              </p>
            </div>
            <div
              className={`flex items-center justify-between w-full mx-2 p-2`}
            >
              <p className="font-bold">Descripción:</p>
              <textarea
                rows={7}
                className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
                placeholder={user.user_description}
                disabled
              />
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
        enrolled="none"
        sectionType="courses"
        subtype="instructor-courses"
        userName={userName || ""}
      />
    </>
  );
}
