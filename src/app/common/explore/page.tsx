"use client";
import Banner from "@/components/Banner";
import DifferentText from "@/components/DifferentText";
import BigBanner from "@/components/BigBanner";
import Section from "@/components/Section";
import { useEffect, useState } from "react";

export default function Page() {
  const [sessionActive, setSessionActive] = useState(false);

  useEffect(() => {
    // Verificar el sessionStorage para determinar si hay una sesión activa
    const isSessionActive = sessionStorage.getItem("currentUser") !== null;
    setSessionActive(isSessionActive);
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
            image={true}
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