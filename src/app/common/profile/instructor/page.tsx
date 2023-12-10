"use client";

import Section from "@/components/sections/Section";
import DifferentText from "@/components/tools/DifferentText";
import Image from "next/image";
import FormProfile from "@/components/forms/FormProfile";

export default function Page() {
  return (
    <>
      <div className="grid grid-cols-4 gap-2 bg-[--light] place-items-center p-10">
        <h1 className="text-[38px] col-span-4">
          Perfil del
          <DifferentText color="--principal-red"> instructor</DifferentText>
        </h1>
            <div className="col-span-1 hidden md:block">
              <Image
                src="/PeterParker.jpg"
                width={350}
                height={300}
                alt={`Imagen del instructor`}
                className="rounded-2xl justify-self-end"
              />
            </div>
            <div className="col-span-4 block md:hidden bg-cover w-[175px] h-[175px] bg-top rounded-full bg-[url('/PeterParker.jpg')]" ></div>
            <FormProfile type="profile-instructor" />
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
        />
    </>
  );
}
