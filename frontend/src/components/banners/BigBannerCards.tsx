"use client";
import CourseCard from "../cards/CourseCard";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const mounted = useRef(true);
  
  const fetchData = useCallback(async () => {
    if (state === "none") {
      try {
        const categoryID = params.id;
        const allCourses = categoryID
          ? await crud_course.getCourses(category)
          : "";
        setCourses(Array.isArray(allCourses) ? allCourses : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    } else {
      try {
        const sessionToken = JSON.parse(localStorage.getItem("token") ?? "{}");
        const enrolledCourses = await crud_user.getEnrolledCourses(sessionToken);
        setEnrolledCourses(Array.isArray(enrolledCourses) ? enrolledCourses : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
  }, [category, state, params.id]);

  useEffect(() => {
    fetchData();
    mounted.current = false;
  }, [fetchData]);

  return (
    <div className="flex flex-wrap py-3 items-center justify-center lg:justify-start space-x-1 space-y-1">
      { state === "none" ? (
        <>
          {courses.length > 0 ? (
            courses.map((course: Course) => (
              <div key={course.id}>
                <CourseCard
                  courseID={course.id}
                  title={course.name}
                  instructor={course.instructor}
                  assessment={course.assessment}
                  image={course.course_image_url ? course.course_image_url : "/course.jpg"}
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
              {params.id && (
                "No hay cursos disponibles en esta categoría."
              )}
            </button>
          )}
        </>
      ) : (
        <>
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((course: Course) => (
              <div key={course.id}>
                <CourseCard
                  courseID={course.id}
                  title={course.name}
                  instructor={course.instructor}
                  assessment={course.assessment}
                  image={course.course_image_url ? course.course_image_url : "/course.jpg"}
                  category={course.category}
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
              {state === "enrolled" && ("No te has inscrito en ningún curso aún.")}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default BigBannerCards;
