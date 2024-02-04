"use client";
import Banner from "@/components/banners/Banner";
import DifferentText from "@/components/tools/DifferentText";
import BigBanner from "@/components/banners/BigBanner";
import Section from "@/components/sections/Section";
import { useEffect, useState } from "react";
import crud_user from "@/app/api/crud_user";

export default function Page() {
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    // Verificar el sessionStorage para determinar si hay una sesión activa
    const isSessionActive = localStorage.getItem("token") !== null;
    setSessionActive(isSessionActive);

    async function fetchData() {
      if(isSessionActive){
        //verify user state
        const sessionToken = JSON.parse(localStorage.getItem("token") ?? "");
        await crud_user.getUser(sessionToken || ""); // get user data from API
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {
        !sessionActive ? (
          <Banner
            title={<>
              Una nueva forma de
              <DifferentText color="--principal-red"> aprender </DifferentText>
              creada
              <DifferentText color="--principal-blue"> por </DifferentText>
              estudiantes
              <DifferentText color="--principal-blue"> para </DifferentText>
              estudiantes.
            </>}
            description="¡Descubre una comunidad educativa única y emocionante! 
            En nuestra plataforma de educación virtual, los estudiantes se convierten en maestros, compartiendo su conocimiento y pasión."
            button={true}
            image="/image.jpg"
          />
        ) : (
          <Section
            title={
              <>
                Tu
                <DifferentText color="--principal-red"> biblioteca </DifferentText>
                de cursos
              </>
            }
            description="Explora y administra tu aprendizaje de manera comoda."
            enrolled="enrolled"
            sectionType="courses"
            subtype="your-learning"
          />
        )}
      <Section
        title={
          <>
            Explora nuestra oferta de
            <DifferentText color="--principal-blue"> cursos </DifferentText>
            destacados
          </>
        }
        description="Te ofrecemos una amplia gama de cursos emocionantes impartidos por estudiantes apasionados como tú."
        enrolled="none"
        sectionType="courses"
        subtype="featured"
      />
      <Section
        title={
          <>
            <DifferentText color="--principal-red">Cursos </DifferentText>
            agregados recientemente
          </>
        }
        description="Te ofrecemos una amplia gama de cursos emocionantes impartidos por estudiantes apasionados como tú."
        enrolled="none"
        sectionType="courses"
        subtype="daily"
      />
      <Section
        title={
          <>
            <DifferentText color="--principal-blue">Instructores </DifferentText>
            destacados
          </>
        }
        description="Descubre a nuestros instructores destacados: expertos en sus campos, apasionados por la enseñanza y listos para guiarte hacia el éxito."
        enrolled="none"
        sectionType="instructors"
        subtype="featured"
      />
      {
        !sessionActive && (
          <BigBanner
            title={
              <>
                <DifferentText color="--principal-red">Únete </DifferentText>
                y
                <DifferentText color="--principal-blue"> transforma </DifferentText>
                tu futuro hoy
              </>
            }
            description="Al unirse a nuestra plataforma, tendrán acceso a oportunidades educativas innovadoras que les permitirán adquirir nuevas habilidades y conocimientos que pueden aplicar de inmediato en sus vidas y carreras."
            button={true}
            image={false}
          />
        )}
    </>
  );
}