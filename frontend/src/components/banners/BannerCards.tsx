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
  profile_image_url: string;
}
interface Course {
  id: number;
  instructor: string;
  name: string;
  assessment: number;
  course_image_url: string;
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
        try {
          courses = await crud_course.getFeaturedCourses();
        } catch (error) {
          // console.log(error);
        }
        break;
      case "daily":
        try {
          courses = await crud_course.getRecentlyAddedCourses();
        } catch (error) {
          // console.log(error);
        }
        break;
      case "your-courses":
        try {
          courses = await crud_course.getUserCourses(instructorCourses ?? "");
        } catch (error) {
          // console.log(error);
        }
        break;
      case "instructor-courses":
        try {
          courses = await crud_course.getUserCourses(instructorCourses ?? "");
        } catch (error) {
          // console.log(error);
        }
        break;
        case "your-learning":
        try {
          enrolledCourses = await crud_user.getEnrolledCourses(getToken());
          setEnrolledCourses(Array.isArray(enrolledCourses) ? enrolledCourses : []);
        } catch (error) {
          // console.log(error);
        }
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
                    image={course.course_image_url ? course.course_image_url : "/course.jpg"}
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
                  image={course.course_image_url ? course.course_image_url : "/course.jpg"}
                  category={course.category}
                  state={state}
                />
              </div>
            ))
          ) : (
            <div className="font-bold text-[--principal-red] hover:drop-shadow">
              <p>
                <FontAwesomeIcon
                  icon={icons.faChevronRight}
                  className="mx-3 text-[--principal-red]"
                />
                No hay cursos disponibles en este momento.
              </p>
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
                  image={instructor.profile_image_url ? instructor.profile_image_url : "/PeterParker.jpg"}
                  ranking={instructor.score_teacher}
                />
              </div>
            ))
          ) : (
            <div className="font-bold text-[--principal-red] hover:drop-shadow">
              <p>
                <FontAwesomeIcon
                  icon={icons.faChevronRight}
                  className="mx-3 text-[--principal-red]"
                />
                No hay instructores disponibles en este momento.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BannerCards;
