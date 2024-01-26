"use client";

import Link from "next/link";

import Breadcrumbs from "@/components/tools/Breadcrumbs";
import Button from "@/components/buttons/Button";
import icons from "@/components/icons/icons";
import StarRating from "@/components/tools/StarRating";
import BannerThemeCard from "@/components/cards/BannerThemeCard";
import CommentCard from "@/components/cards/CommentCard";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import crud_category from "@/app/api/crud_category";
import DifferentText from "@/components/tools/DifferentText";
import crud_course from "@/app/api/crud_course";
import { Module, Content } from "@/components/forms//FormCourse";
import crud_user from "@/app/api/crud_user";


interface Category {
  id: number;
  name: string;
}
interface Comment {
  student: string;
  description: string;
  assessment: number;
}
interface Course {
  courseID: number;
  name: string;
  instructor: string;
  description: string;
  assessment: number;
  course_image_url: string;
  trailer_video_url: string;
  comments: Comment[];
  modules: Module[];
  category: string;
  state: "none" | "enrolled" | "completed" | "in-progress";
}

export default function Page() {
  const { id, courseID } = useParams();
  const routerNotFound = useRouter();
  let redirectVideoCourse = "";

  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [user, setUser] = useState<any>(null);
  const [userCourse, setUserCourse] = useState<any>(null);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const sessionToken = JSON.parse(localStorage.getItem("token") ?? "{}");
        const categoryData = await crud_category.getCategoryById(id);
        const courseData = await crud_course.getCourseById(courseID);
        if (categoryData === "Error desconocido") {
          routerNotFound.push("/common/not-found");
        } else if (categoryData.name === courseData.category) {
          setCategory(categoryData as Category);
          setCourse(courseData as Course);
          courseData.courseID = courseID;
          courseData.course_image_url = 
          courseData.course_image_url.replace("s3.amazonaws.com/", "")
          courseData.trailer_video_url = courseData.trailer_video_url.replace("s3.amazonaws.com/", "")
          // asign video to ref
          videoRef.current = courseData.trailer_video_url;
          // set course
          setCourse(courseData as Course);
        } else {
          routerNotFound.push("/common/not-found");
        }
        // get user
        if (sessionToken) {
          const user = await crud_user.getUser(sessionToken ?? "");
          setUser(user);

          /* verify if the user isn't subscribe in the course */
          const userCourses = await crud_user.getEnrolledCourses(sessionToken ?? "");
          //console.log("userCourses", userCourses)
          const userCourse = userCourses.find((course: any) => course.courseID === courseID);
          //console.log("userCourse", userCourse);
          setUserCourse(userCourse);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (courseID) {
      fetchData();
    }
  }, [courseID]);

  const handleNoneCourse = async () => {
    const sessionToken = JSON.parse(localStorage.getItem("token") ?? "{}");
    console.log(course)
    try {
      if (course) {
        const courseNone = {
          name: course.name,
          state: "enrolled",
          last_module_name: course.modules[0].title,
          last_subtopic_name: course.modules[0].content[0].title
        }
        console.log("courseNone", courseNone)
        const response = await crud_user.updateUser(courseNone, sessionToken);
        console.log("response", response)
        console.log("user", user)
      }
    } catch (error) {
      console.log("error", error)
    }
  };

  const handleEnrolledCourse = async () => {
    const sessionToken = JSON.parse(localStorage.getItem("token") ?? "{}");
    console.log(course)
    try {
      if (course) {
        const courseNone = {
          name: course.name,
          state: "enrolled",
          last_module_name: course.modules[0].title,
          last_subtopic_name: course.modules[0].content[0].title
        }
        console.log("courseNone", courseNone)
        const response = await crud_user.updateUser(courseNone, sessionToken);
        console.log("response", response)
        console.log("user", user)
      }
    } catch (error) {
      console.log("error", error)
    }
  };

  const handleCompletedCourse = async () => {
    const sessionToken = JSON.parse(localStorage.getItem("token") ?? "{}");
    console.log(course)
    try {
      if (course) {
        const courseNone = {
          name: course.name,
          state: "completed",
          last_module_name: course.modules[0].title,
          last_subtopic_name: course.modules[0].content[0].title
        }
        console.log("courseNone", courseNone)
        const response = await crud_user.updateUser(courseNone, sessionToken);
        console.log("response", response)
        console.log("user", user)
      }
    } catch (error) {
      console.log("error", error)
    }
  };

  const handleInProgressCourse = async () => {
    const sessionToken = JSON.parse(localStorage.getItem("token") ?? "{}");
    console.log(course)
    try {
      if (course) {
        const courseNone = {
          name: course.name,
          state: "in-progress",
          last_module_name: course.modules[0].title,
          last_subtopic_name: course.modules[0].content[0].title
        }
        console.log("courseNone", courseNone)
        const response = await crud_user.updateUser(courseNone, sessionToken);
        console.log("response", response)
        console.log("user", user)
      }
    } catch (error) {
      console.log("error", error)
    }
  };

  if (
    !course ||
    (course && course.courseID === 0) ||
    !category ||
    (category && category.id === 0)
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
  const breadcrumbs = [
    { name: "Categorías", path: "/common/categories" },
    { name: `${category.name}`, path: `/common/categories/${category.id}` },
    {
      name: `${course.name}`,
      path: `/common/categories/${category.id}/${course.courseID}`,
    },
  ];

  return (
    <div className={`flex flex-between w-full h-full flex-col justify-between`}>
      <div className="px-6 py-1 md:px-20 bg-[--high-gray]">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-5 lg:gap-2 w-full p-6 md:px-20 md:py-10">
        <div className="col-span-5 lg:col-span-3 self-center">
        <video
          ref={videoRef}
          controls
          className="w-full h-[450px] rounded-[25px]"
        >
          <source src={course.trailer_video_url} type="video/mp4" />
          <track kind="captions" src="path_to_captions.vtt" label="Captions" />
        </video>
        </div>
        <div className="col-span-5 lg:col-span-2 px-4 flex flex-col justify-between items-center sm:items-start">
          <div className="pt-6 md:pt-0">
            <h1 className="text-[32px] xl:text-[38px] pb-4">{course.name}</h1>
            <p className="pb-4">{course.instructor}</p>
            <div className="flex w-full">
              <StarRating ranking={course.assessment} />
            </div>
          </div>
          <div className="flex flex-col md:items-start">
            <h3 className="text-[32px] text-start">Descripción del curso:</h3>
            <p>{course.description}</p>
            { user !== "Error desconocido" ? (
                <div className="mt-6 self-center md:self-start">
                  {!userCourse && 
                    <Link
                      key="Inscribirse"
                      href={`/common/categories/${category.id}/${course.courseID}/${redirectVideoCourse}`}
                      className="block md:flex-none"
                    >
                      <Button
                        text="Inscribirse"
                        icon={icons.faBagShopping}
                        color="blue"
                        type="big"
                        onClick={handleNoneCourse}
                      />
                    </Link>
                  }
                  {userCourse && userCourse.state === "enrolled" &&
                    <Link
                      key="Iniciar curso"
                      href={`/common/categories/${category.id}/${course.courseID}/${redirectVideoCourse}`}
                      className="block md:flex-none"
                    >
                      <Button
                        text="Iniciar curso"
                        icon={icons.faChevronRight}
                        color="blue"
                        type="big"
                        onClick={handleEnrolledCourse}
                      />
                    </Link>
                  }
                  {userCourse && userCourse.state === "completed" &&
                    <Link
                      key="Ver certificado"
                      href={`/common/categories/${category.id}/${course.courseID}/${redirectVideoCourse}`}
                      className="block md:flex-none"
                    >
                      <Button
                        text="Ver certificado"
                        icon={icons.faCheck}
                        color="blue"
                        type="big"
                        onClick={handleCompletedCourse}
                      />
                    </Link>
                  }
                  {userCourse && userCourse.state === "in-progress" &&
                    <Link
                      key="Continuar curso"
                      href={`/common/categories/${category.id}/${course.courseID}/${redirectVideoCourse}`}
                      className="block md:flex-none"
                    >
                      <Button
                        text="Continuar curso"
                        icon={icons.faStopwatch}
                        color="blue"
                        type="big"
                        onClick={handleInProgressCourse}
                      />
                    </Link>
                  }
                </div>
              ) : (
                <div className="mt-6 self-center md:self-start">
                  <Link
                    key="Inscribirse"
                    href={'/login'}
                    className="block md:flex-none"
                  >
                    <Button
                      text="Inscribirse"
                      icon={icons.faBagShopping}
                      color="blue"
                      type="big"
                    />
                  </Link>
                </div>
              )
            }
          </div>
        </div>
        <div className="col-span-5 py-10">
          <h3 className="text-[32px] text-start py-4">Temario del curso:</h3>
          {course.modules.map((module, id) => (
            <div key={id}>
              <BannerThemeCard
                title={module.title}
                description={module.description}
                cuantity={module.content.length}
                duration={module.duration}
                content={module.content}
                action="read"
              />
            </div>
          ))
          }
        </div>
        <div className="col-span-5 py-10">
          <h3 className="text-[32px] text-start py-4">
            Comentarios del curso:
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-5 px-10">
            {course.comments.map((comment, index) => (
                <div key={index} className="col-span-1">
                  <CommentCard
                    name={comment.student}
                    calification={comment.assessment}
                    comment={comment.description}
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
