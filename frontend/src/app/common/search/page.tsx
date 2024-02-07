"use client";
import crud_user from "@/app/api/crud_user";
import Section from "@/components/sections/Section";
import DifferentText from "@/components/tools/DifferentText";
import { useEffect, useState } from "react";

export default function Page() {
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    // Verificar el sessionStorage para determinar si hay una sesión activa
    const isSessionActive = localStorage.getItem("token") !== null;
    setSessionActive(isSessionActive);

    async function fetchData() {
      if (isSessionActive) {
        //verify user state
        const sessionToken = JSON.parse(localStorage.getItem("token") ?? "");
        await crud_user.getUser(sessionToken || ""); // get user data from API
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Section
        title={
          <>
            <DifferentText color="--principal-red">Cursos </DifferentText>
            relacionados
          </>
        }
        description="Encontramos estos cursos, esperamos que sea lo que estás buscando."
        enrolled="none"
        sectionType="courses"
        subtype="search"
      />
      <Section
        title={
          <>
            <DifferentText color="--principal-blue">Instructores </DifferentText>
            relacionados
          </>
        }
        description="Encontramos a estos instructores, esperamos que sea lo que estás buscando."
        enrolled="none"
        sectionType="instructors"
        subtype="search"
      />
    </>
  );
}
