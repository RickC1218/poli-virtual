"use client";
import CourseCard from "../cards/CourseCard";
import InstructorCard from "../cards/InstructorCard";
import crud_user from "@/app/api/crud_user";
import crud_course from "@/app/api/crud_course";
import icons from "../icons/icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useEffect, useRef, useState } from "react";

interface BannerCardsProps {
  state: "none" | "enrolled";
  type: "courses" | "instructors";
  subtype?:
    | "featured"
    | "daily"
    | "your-learning"
    | "your-courses"
    | "instructor-courses";
    instructorName?: string;
}
interface Instructor {
  email: string;
  name: string;
  lastname: string;
  semester: string;
  approve_teacher: string;
  score_teacher: number;
  image: string;
}
interface Course {
  id: number;
  instructor: string;
  name: string;
  assessment: number;
  image: string;
  category: string;
  state: "none" | "enrolled" | "completed" | "in-progress";
}

const BannerCards: React.FC<BannerCardsProps> = ({ state, type, subtype, instructorName }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const mounted = useRef(true);

  const fetchData = useCallback(async () => {
    let courses = [];
    let enrolledCourses = [];
    let instructors = [];
    const instructorCourses = instructorName?.replace(/-/g, ' ');

    switch (subtype) {
      case "featured":
        courses = await crud_course.getFeaturedCourses();
        break;
      case "daily":
        courses = await crud_course.getRecentlyAddedCourses();
        break;
      case "your-courses":
        courses = await crud_course.getUserCourses(instructorCourses ?? "");
        break;
      case "instructor-courses":
        courses = await crud_course.getUserCourses(instructorCourses ?? "");
        break;
        case "your-learning":
        enrolledCourses = await crud_user.getEnrolledCourses(getToken());
        setEnrolledCourses(Array.isArray(enrolledCourses) ? enrolledCourses : []);
        break;
      default:
        break;
    }
    setCourses(Array.isArray(courses) ? courses : []);
    instructors = await crud_user.getfeaturedInstructors();
    setInstructors(Array.isArray(instructors) ? instructors : []);
  }, [subtype]);

  useEffect(() => {
    fetchData();
    return () => {
      mounted.current = false;
    };
  }, [fetchData]);

  const getToken = () => {
    const sessionToken = JSON.parse(localStorage.getItem("token") ?? "{}");
    return sessionToken;
  };

  return (
    <>
      {type === "courses" ? (
        <div className="flex overflow-x-auto space-x-1 py-5">
          {state === "enrolled" ? (
            enrolledCourses.length > 0 ? (
              enrolledCourses.map((course: Course) => (
                <div key={course.id}>
                  <CourseCard
                    courseID={course.id}
                    title={course.name}
                    instructor={course.instructor}
                    assessment={course.assessment}
                    image="/course.jpg"
                    category={course.category}
                    state={course.state}
                  />
                </div>
              ))
            ) : (
              <div className="font-bold text-[--principal-red] hover:drop-shadow">
                {subtype === "your-courses" && (
                  <p>
                    <FontAwesomeIcon
                      icon={icons.faChevronRight}
                      className="mx-3 text-[--principal-red]"
                    />
                    No has creado ningún curso, crea uno para que los
                    estudiantes puedan aprender.
                  </p>
                )}
                {subtype === "instructor-courses" && (
                  <p>
                    <FontAwesomeIcon
                      icon={icons.faChevronRight}
                      className="mx-3 text-[--principal-red]"
                    />
                    El instructor no ha creado ningún curso.
                  </p>
                )}
                {subtype === "your-learning" && (
                  <p>
                    <FontAwesomeIcon
                      icon={icons.faChevronRight}
                      className="mx-3 text-[--principal-red]"
                    />
                    No te has inscrito a ningún curso, inscríbete para aprender.
                  </p>
                )}
                {(subtype === "featured" || subtype === "daily") && (
                  <p>
                    <FontAwesomeIcon
                      icon={icons.faChevronRight}
                      className="mx-3 text-[--principal-red]"
                    />
                    No hay cursos disponibles en este momento.
                  </p>
                )}
              </div>
            )
          ) : courses.length > 0 ? (
            courses.map((course: Course) => (
              <div key={course.id}>
                <CourseCard
                  courseID={course.id}
                  title={course.name}
                  instructor={course.instructor}
                  assessment={course.assessment}
                  image="/course.jpg"
                  category={course.category}
                  state={state}
                />
              </div>
            ))
          ) : (
            <div className="font-bold text-[--principal-red] hover:drop-shadow">
              <h1>No hay cursos agregados todavía.</h1>
            </div>
          )}
        </div>
      ) : (
        <div className="flex overflow-x-auto space-x-2 py-5">
          {instructors.length > 0 ? (
            instructors.map((instructor: Instructor) => (
              <div className="p-1" key={instructor.email}>
                <InstructorCard
                  email={instructor.email}
                  name={instructor.name}
                  lastname={instructor.lastname}
                  semester={`Estudiante de ${instructor.semester} semestre`}
                  tutor={`Ing. ${instructor.approve_teacher}`}
                  image="/PeterParker.jpg"
                  ranking={instructor.score_teacher}
                />
              </div>
            ))
          ) : (
            <h1>No hay instructor agregados todavía.</h1>
          )}
        </div>
      )}
    </>
  );
};

export default BannerCards;
