"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import Banner from "@/components/banners/Banner";
import Section from "@/components/sections/Section";
import DifferentText from "@/components/tools/DifferentText";
import icons from "@/components/icons/icons";
import FormProfile from "@/components/forms/FormProfile";
import crud_user from "@/app/api/crud_user";
import StarRating from "@/components/tools/StarRating";
import { useRouter } from "next/navigation";

// Define the initial state for a new user
const initialUserState = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  role: "student",
  semester: "",
  approve_teacher: "",
  approve_teacher_email: "",
  user_description: "",
  score_teacher: 0,
  profile_image_url: "",
};
export default function Page() {
  const [user, setUser] = useState(initialUserState);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const sessionToken = JSON.parse(localStorage.getItem("token") ?? "{}");
      try {
        const user = await crud_user.getUser(sessionToken || "");
        user.profile_image_url = user.profile_image_url.replace('s3.amazonaws.com/', '');
        setUser(user);
      } catch (error) {
        console.log(error);
        router.push("/common/explore");
      }
    }
    fetchData();
  }, [user]);

  return (
    <>
      <div className="grid grid-cols-4 gap-2 bg-[--light] p-10">
        <h1 className="text-[38px] text-center col-span-4">
          Tu
          <DifferentText color="--principal-red"> perfil</DifferentText>
        </h1>
        {user.role === "student" ? (
          <>
            <div className="col-span-4 md:col-span-1 flex flex-col justify-center">
              <div className="flex justify-center self-start w-full">
                {user.profile_image_url ? (
                  <div
                    className={`bg-cover w-[175px] h-[175px] bg-top rounded-full`}
                    style={{
                      backgroundImage: `url('${user.profile_image_url}')`,
                    }}
                  ></div>
                ) : (
                  <div className="w-[175px] h-[175px] rounded-full">
                    <FontAwesomeIcon
                      icon={icons.faUser}
                      className="w-[175px] h-[175px] text-[--principal-blue]"
                    />
                  </div>
                )}
              </div>
            </div>
            <FormProfile type="profile" />
          </>
        ) : (
          <>
            <div className="col-span-4 md:col-span-1 flex flex-col justify-start">
              <div className="flex justify-center self-start w-full">
              {user.profile_image_url ? (
                  <div
                    className={`bg-cover w-[175px] h-[175px] bg-top rounded-full`}
                    style={{
                      backgroundImage: `url('${user.profile_image_url}')`,
                    }}
                  ></div>
                ) : (
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
            <FormProfile type="profile-instructor" />
          </>
        )}
      </div>
      {user.role === "student" ? (
        <Banner
          title={
            <>
              Conviértete en un
              <DifferentText color="--principal-blue"> instructor</DifferentText>
            </>
          }
          description="Crear una comunidad en línea donde los estudiantes de diferentes niveles académicos compartan conocimientos y habilidades, promoviendo un ciclo constante de aprendizaje y enseñanza para el crecimiento de todos los usuarios."
          button={true}
          image="/image4.jpg"
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
          enrolled="none"
          sectionType="courses"
          subtype="your-courses"
          userName={user.name + "-" + user.lastname}
        />
      )}
    </>
  );
}
