"use client";

import StarRating from "@/components/tools/StarRating";
import BannerThemeCard from "@/components/cards/BannerThemeCard";
import CommentCard from "@/components/cards/CommentCard";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import crud_category from "@/app/api/crud_category";
import DifferentText from "@/components/tools/DifferentText";
import crud_course from "@/app/api/crud_course";
import crud_user from "@/app/api/crud_user";
import Swal from "sweetalert2";
import FormComment from "@/components/forms/FormComment";
import { Category, Course } from "../page";

export default function Page() {

  const { id, courseID } = useParams();
  const routerNotFound = useRouter();

  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [user, setUser] = useState<any | undefined>(undefined);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const showAlert = (
    message: string,
    type: "success" | "error" | "warning" | "info"
  ) => {
    Toast.fire({
      icon: type,
      text: message,
      showConfirmButton: false,
      timer: 4000,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {

        const sessionToken = JSON.parse(localStorage.getItem("token") ?? "{}");
        if (sessionToken) {
          const user = await crud_user.getUser(sessionToken ?? "");
          setUser(user);
        }
        const categoryData = await crud_category.getCategoryById(id);
        const courseData = await crud_course.getCourseById(courseID);
        if (categoryData === "Error desconocido") {
          routerNotFound.push("/common/not-found");
        } else if (categoryData.name === courseData.category) {
          setCategory(categoryData as Category);
          setCourse(courseData as Course);
          courseData.courseID = courseID;

          //finish page
          courseData.state = "completed";
        } else {
          routerNotFound.push("/common/not-found");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
    if (courseID) {
      fetchData();
    }
    showAlert("Curso completado", "success");
  }, [courseID]);

  if (
    !course ||
    (course && course.courseID === "0") ||
    !category ||
    (category && category.id === "0")
  ) {
    return (
      <div
        className={`flex flex-between w-full h-full flex-col justify-center`}
      >
        <div className="w-full p-6 md:px-20 md:py-10 self-center">
          <h1 className="text-[32px] xl:text-[38px] text-center lg:text-start">
            <DifferentText color="--principal-blue">Cargando...</DifferentText>
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-between w-full h-full flex-col justify-between`}>
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-5 bg-[--gray] lg:gap-2 w-full p-6 md:px-20">
        <div className="col-span-5 self-center flex justify-center items-center">
          <FormComment />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-5 lg:gap-2 w-full p-6 md:px-20">
        <div className="col-span-5 py-10">
          <h3 className="text-[32px] text-start py-4">Temario del curso:</h3>
          {course.modules.map((module, id) => {
            return (
              <div key={id} className={`text-[--gray]`}>
                <BannerThemeCard
                  title={module.title}
                  description={module.description}
                  cuantity={module.content.length}
                  duration={module.duration}
                  content={module.content}
                  action="read"
                  currentSubtopic={""}
                  course={course.name}
                  course_ID={course.courseID}
                  />
              </div>
            );
          })}
        </div>
        <div className="col-span-5 px-4 pt-6 flex flex-col justify-between items-center sm:items-start">
          <div className="pt-6 md:pt-0">
            <h1 className="text-[32px] xl:text-[38px] pb-4">
              Acerca del curso
            </h1>
            <p className="font-bold">
              {course.name}
            </p>
            <p className="pb-4">{course.instructor}</p>
            <div className="flex w-full">
              <StarRating ranking={course.assessment} />
            </div>
          </div>
          <div className="flex flex-col md:items-start">
            <p className="font-bold text-start">Descripción del curso:</p>
            <p>
              {course.description}
            </p>
          </div>
        </div>
        <div className="col-span-5 py-10">
          <h3 className="text-[32px] text-start py-4">
            Comentarios del curso:
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-5 px-10">
            {course.comments?.map((comment, index) => (
                <div key={index} className="col-span-1">
                  <CommentCard
                    name={comment.name}
                    assessment={comment.assessment}
                    comment={comment.comment}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

