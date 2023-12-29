"use client";
import CourseCard from "../cards/CourseCard";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import crud_course from "@/app/api/crud_course";
import crud_user from "@/app/api/crud_user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../icons/icons";

interface Instructor {
  name: string;
  email: string;
}

interface Course {
  id: string;
  instructors: Instructor[];
  name: string;
  assessment: number;
  image: string;
  category: BigBannerCardsProps["category"];
  state: "none" | "enrolled" | "completed" | "in-progress";
}
interface BigBannerCardsProps {
  category: string;
  state: "none" | "enrolled";
}

const BigBannerCards: React.FC<BigBannerCardsProps> = ({ category, state }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const params = useParams();

  // get courses by category
  const getCourses = async () => {
    try {
      const categoryID = params.id;
      const allCourses = categoryID
        ? await crud_course.getCourses(category)
        : "";
      setCourses(Array.isArray(allCourses) ? allCourses : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  //get courses by your learning
  const getEnrolled = async () => {
    try {
      const sessionToken = JSON.parse(localStorage.getItem("token") ?? "{}");
      const enrolledCourses = await crud_user.getEnrolledCourses(sessionToken);
      setEnrolledCourses(Array.isArray(enrolledCourses) ? enrolledCourses : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCourses();
    if (localStorage.getItem("token")) getEnrolled();
  }, []);

  return (
    <div className="flex flex-wrap py-5 items-center justify-center lg:justify-start">
      {(state === "none" && params.id && courses.length > 0) ||
      (state === "enrolled" && enrolledCourses.length > 0) ? (
        (state === "none" ? courses : enrolledCourses).map((course: Course) => (
          <div className="p-1" key={course.id}>
            <CourseCard
              title={course.name}
              instructors={
                Array.isArray(course.instructors)
                  ? course.instructors
                      .map((instructor) => instructor.name)
                      .join(", ")
                  : "Nombres no encontrados"
              }
              assessment={course.assessment}
              image="/course.jpg"
              category={category}
              state={state}
            />
          </div>
        ))
      ) : (
        <button className="font-bold text-[--principal-red] hover:drop-shadow">
          <FontAwesomeIcon
            icon={icons.faChevronRight}
            className="mx-3 text-[--principal-red]"
          />
          {params.id ? (
            "No hay cursos disponibles en esta categoría."
          ) : (
            "No has iniciado a aprender, busca cursos según tus gustos."
          )}
        </button>
      )}
    </div>
  );
};

export default BigBannerCards;
