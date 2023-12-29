"use client";
import { useEffect, useState } from "react";
import CourseCard from "../cards/CourseCard";
import InstructorCard from "../cards/InstructorCard";
import crud_user from "@/app/api/crud_user";
import crud_course from "@/app/api/crud_course";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../icons/icons";

interface BannerCardsProps {
  state: "none" | "enrolled";
  type: "courses" | "instructors";
  subtype?: "featured" | "daily" | "your-learning";
}
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
  category: string;
  state: "none" | "enrolled" | "completed" | "in-progress";
}

const BannerCards: React.FC<BannerCardsProps> = ({ state, type, subtype }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  // Obtain courses by type
  const getCoursesByType = async (type: "featured" | "daily") => {
    try {
      const allCourses =
        type === "featured"
          ? await crud_course.getFeaturedCourses()
          : await crud_course.getRecentlyAddedCourses();
      setCourses(Array.isArray(allCourses) ? allCourses : []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  //get courses by your learning
  const getEnrolled = async () => {
    try {
      const sessionToken = JSON.parse(localStorage.getItem('token') ?? "{}");
      const enrolledCourses = await crud_user.getEnrolledCourses(sessionToken);
      setEnrolledCourses(Array.isArray(enrolledCourses) ? enrolledCourses : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    switch (subtype) {
      case "featured":
      case "daily":
        getCoursesByType(subtype);
        break;
      case "your-learning":
        getEnrolled();
        break;
      default:
        break;
    }
  }, [subtype]);

  return (
    <div>
      {type === "courses" ? (
        <div className="flex overflow-x-auto space-x-2 py-5">
          {state === "enrolled"
            ? enrolledCourses.length > 0
              ? enrolledCourses.map((course) => (
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
                      category={course.category}
                      state={course.state}
                    />
                  </div>
                ))
              : <button className="font-bold text-[--principal-red] hover:drop-shadow">
                <FontAwesomeIcon icon={icons.faChevronRight} className="mx-3 text-[--principal-red]" />
                No has iniciado a aprender, busca cursos según tus gustos.
                </button>
            : courses.length > 0
            ? courses.map((course) => (
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
                    category={course.category}
                    state={state}
                  />
                </div>
              ))
            : <h1>No hay cursos agregados todavía.</h1>
          }
        </div>
      ) : (
        <div className="flex overflow-x-auto space-x-2 py-5">
          <div className="p-1">
            <InstructorCard
              name="Ricardo Erazo"
              description="Estudiante de 9no semestre"
              tutor="Ing. Ordoñez"
              ranking={3.8}
              image="/PeterParker.jpg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerCards;
