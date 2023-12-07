"use client";

import Banner from "@/components/Banner";
import Section from "@/components/Section";
import DifferentText from "@/components/DifferentText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "@/components/icons/icons";
import Button from "@/components/buttons/Buttons";

import Link from "next/link";
import FormProfile from "@/components/FormProfile";

export default function Page() {
  const typeUser = "student";

  const text1 = "Cerrar sesión";
  const color1 = "red";
  const size = "big";

  const text2 = "Guardar cambios";
  const color2 = "blue";

  const text3 = "Cambiar contraseña";
  const color3 = "neutral";

  const text4 = "Crear curso";

  // Manejo del botón de actualizar perfil
  const handleUpdateProfile = () => {
    console.log("Perfil actualizado");
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-2 bg-[--light] place-items-center p-10">
        <h1 className="text-[38px] col-span-4">
          Tu
          <DifferentText color="--principal-red"> perfil</DifferentText>
        </h1>
        {typeUser === "student" ? (
          <>
            <div className="col-span-2 hidden md:block">
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
        <div className="py-10 col-span-4 flex items-center justify-center flex-wrap md:flex-nowrap md:space-x-8 md:space-y-1">
          <Link key="SignOut" href="/common/explore" className="p-2 md:p-0">
            <Button text={text1} icon={icons.faRightToBracket} color={color1} type={size} />
          </Link>
          <Link key="Explore" href="/common/profile" className="p-2 md:p-0">
            <Button
              text={text2}
              icon={icons.faFloppyDisk}
              color={color2}
              type={size}
              onClick={handleUpdateProfile}
            />
          </Link>
          <Link key="ChangePass" href="/common/profile" className="p-2 md:p-0">
            <Button text={text3} icon={icons.faLock} color={color3} type={size} />
          </Link>
          <Link key="newCourse" href="/common/categories/category/course" className={`p-2 md:p-0 ${typeUser === "student" ? 'hidden' : ''}`}>
            <Button text={text4} icon={icons.faBookOpen} color={color2} type={size} />
          </Link>
        </div>
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
