"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import Banner from "@/components/banners/Banner";
import Section from "@/components/sections/Section";
import DifferentText from "@/components/tools/DifferentText";
import icons from "@/components/icons/icons";
import FormProfile from "@/components/forms/FormProfile";

export default function Page() {
  const [typeUser, setTypeUser] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("token") ?? "{}");
    setTypeUser(user.type);
  }, []);
  
  return (
    <>
      <div className="grid grid-cols-4 gap-2 bg-[--light] place-items-center p-10">
        <h1 className="text-[38px] col-span-4">
          Tu
          <DifferentText color="--principal-red"> perfil</DifferentText>
        </h1>
        {typeUser === "student" ? (
          <>
            <div className="col-span-1 hidden md:block">
              <FontAwesomeIcon
                icon={icons.faUser}
                className="w-[300px] h-[300px] text-[--principal-blue]"
              />
            </div>
            <FormProfile type="profile" />
          </>
        ) : (
          <>
            <div className="col-span-1 hidden md:block">
              <FontAwesomeIcon
                icon={icons.faUser}
                className="w-[300px] h-[300px] text-[--principal-blue]"
              />
            </div>
            <FormProfile type="profile-instructor" />
          </>
        )}
      </div>
      {typeUser === "student" ? (
        <Banner
          title={
            <>
              Conviértete en un
              <DifferentText color="--principal-blue"> instructor </DifferentText>
            </>
          }
          description="Crear una comunidad en línea donde los estudiantes de diferentes niveles académicos compartan conocimientos y habilidades, promoviendo un ciclo constante de aprendizaje y enseñanza para el crecimiento de todos los usuarios."
          button={true}
          image={true}
          addStyle={`bg-[--high-gray]`}
        />
      ) : (
        <Section
          title={
            <>
              <DifferentText color="--principal-red">Cursos </DifferentText>
              creados por ti
            </>
          }
          description="Gracias a tí, brindamos educación a estudiantes que lo necesitan"
          enrolled="enrolled"
          sectionType="courses"
        />
      )}
    </>
  );
}
