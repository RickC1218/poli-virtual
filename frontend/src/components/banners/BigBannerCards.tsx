"use client";
import CourseCard from "../cards/CourseCard";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import crud_course from "@/app/api/crud_course";
import crud_user from "@/app/api/crud_user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../icons/icons";

interface Course {
  id: number;
  instructor: string;
  name: string;
  assessment: number;
  course_image_url: string;
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
    <div className="flex flex-wrap py-3 items-center justify-center lg:justify-start space-x-1 space-y-1">
      {(state === "none" && params.id && courses.length > 0) ||
      (state === "enrolled" && enrolledCourses.length > 0) ? (
        ((state === "none")  ? courses : enrolledCourses).map((course: Course) => (
          <div key={course.id}>
            <CourseCard
              courseID={course.id}
              title={course.name}
              instructor={course.instructor}
              assessment={course.assessment}
              image={course.course_image_url ? course.course_image_url : ""}
              category={category}
              state={course.state}
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
