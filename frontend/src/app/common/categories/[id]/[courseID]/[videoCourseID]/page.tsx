"use client";

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "@/components/icons/icons";
import Swal from "sweetalert2";
import { Category, Course } from "../page";

export default function Page() {
  const { id, courseID, videoCourseID } = useParams();
  const routerNotFound = useRouter();

  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [user, setUser] = useState<any>(null);
  const [currentModule, setCurrentModule] = useState<string | null>(null);
  const [currentSubtopic, setCurrentSubtopic] = useState<string | null>(null);
  const [currentVideo, setCurrentVideo] = useState<File | string | any>(null);

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
          // asign video to ref
          const module_subtopic_name = videoCourseID.toString().split("_");
          const currentModule = decodeURIComponent(module_subtopic_name[0]);
          const currentSubtopic = decodeURIComponent(module_subtopic_name[1]);
          
          // asign current module and subtopic
          courseData.modules.forEach((module: Module) => {
            if (module.title === currentModule) {
              setCurrentModule(module.title);
              module.content.forEach((content: Content) => {
                if (content.title === currentSubtopic) {
                  setCurrentSubtopic(content.title);
                  if (content.video_url) {
                    if (typeof content.video_url === 'string' || content.video_url instanceof String){
                      setCurrentVideo(content.video_url.replace("s3.amazonaws.com/", ""));
                      videoRef.current = currentVideo;
                    }
                  }
                }
              });
            }
          });
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
  }, [courseID]);

  useEffect(() => {
    const handleVideoEnd = async () => {
      if (!course) return;
  
      const sessionToken = JSON.parse(localStorage.getItem("token") ?? "{}");
      if (!sessionToken) return;

      // Search the current module index
      const currentModuleIndex = course.modules.findIndex((mod: Module) => mod.title === currentModule);
  
      // Search the current subtopic index
      const currentSubtopicIndex = course.modules[currentModuleIndex]?.content.findIndex((content: Content) => content.title === currentSubtopic);
  
      // If the current module index is not the last one, get the next module
      if (currentModuleIndex !== -1 && currentModuleIndex < course.modules.length - 1) {
        // If the current subtopic index is not the last one, get the next subtopic
        if (currentSubtopicIndex !== -1 && currentSubtopicIndex < course.modules[currentModuleIndex].content.length - 1) {
          const nextSubtopic = course.modules[currentModuleIndex].content[currentSubtopicIndex + 1].title;
          const nextVideoUrl = course.modules[currentModuleIndex].content[currentSubtopicIndex + 1].video_url;
          setCurrentSubtopic(nextSubtopic);
          setCurrentVideo(nextVideoUrl);

          await crud_user.addLastVideoWatched(
            {
              "name": course.name,
              "state": "in-progress",
              "last_module_name": currentModule,
              "last_subtopic_name": nextSubtopic,
            },
            sessionToken,
          )
          // redirect to the next video
          window.location.href = `/common/categories/${id}/${courseID}/${currentModule + "_" + nextSubtopic}`;
        } else {
          // If the current subtopic index is the last one, get the next module
          const nextModule = course.modules[currentModuleIndex + 1];
          const nextSubtopic = nextModule.content[0]?.title || '';
          const nextVideoUrl = nextModule.content[0]?.video_url ?? '';
          setCurrentModule(nextModule.title);
          setCurrentSubtopic(nextSubtopic);
          setCurrentVideo(nextVideoUrl);

          await crud_user.addLastVideoWatched(
            {
              "name": course.name,
              "state": "in-progress",
              "last_module_name": nextModule.title,
              "last_subtopic_name": nextSubtopic,
            },
            sessionToken,
          )
          // redirect to the next video
          window.location.href = `/common/categories/${id}/${courseID}/${nextModule.title + "_" + nextSubtopic}`;
        }
      } else {
        // If the current subtopic index is not the last one, get the next subtopic
        if (currentSubtopicIndex !== -1 && currentSubtopicIndex < course.modules[currentModuleIndex].content.length - 1) {
          const nextSubtopic = course.modules[currentModuleIndex].content[currentSubtopicIndex + 1].title;
          const nextVideoUrl = course.modules[currentModuleIndex].content[currentSubtopicIndex + 1].video_url;
          setCurrentSubtopic(nextSubtopic);
          setCurrentVideo(nextVideoUrl);

          await crud_user.addLastVideoWatched(
            {
              "name": course.name,
              "state": "in-progress",
              "last_module_name": currentModule,
              "last_subtopic_name": nextSubtopic,
            },
            sessionToken,
          )
          // redirect to the next video
          window.location.href = `/common/categories/${id}/${courseID}/${currentModule + "_" + nextSubtopic}`;
        } else {
          // If the current module index is the last one, get the next module
          await crud_user.addLastVideoWatched(
            {
              "name": course.name,
              "state": "completed",
              "last_module_name": currentModule,
              "last_subtopic_name": currentSubtopic,
            },
            sessionToken,
          )
          setCurrentModule('¡Felicidades!');
          setCurrentSubtopic('¡Has terminado el curso!');
          setCurrentVideo('');

          // when the video ends, redirect to the finish page
          // redirect to the finish page
          window.location.href = `/common/categories/${id}/${courseID}/finish`;
        }
      }
    };
  
    if (videoRef.current) {
      // Cuando se carga el componente, iniciamos el video y añadimos el listener de fin
      videoRef.current.addEventListener('ended', handleVideoEnd);
      videoRef.current.play().catch(error => console.error("Error al reproducir el video:", error));
    }
  
    return () => {
      // Limpieza del evento cuando el componente se desmonta
      if (videoRef.current) {
        videoRef.current.removeEventListener('ended', handleVideoEnd);
      }
    };
  
  }, [currentModule, currentSubtopic, course]); 

  const handleBeforeVideo = async () => {
    // redirect to the previous video
    if (!course) return;

    const sessionToken = JSON.parse(localStorage.getItem("token") ?? "{}");
    
    const currentModuleIndex = course.modules.findIndex((mod: Module) => mod.title === currentModule);
    const currentSubtopicIndex = course.modules[currentModuleIndex]?.content.findIndex((content: Content) => content.title === currentSubtopic);

    if (currentModuleIndex > 0 ) {
      if(currentSubtopicIndex === 0) {
        // si el subtema actual es el primero del modulo, entonces se debe ir al ultimo subtema del modulo anterior
        const previousModule = course.modules[currentModuleIndex - 1];
        const previousSubtopic = previousModule.content[previousModule.content.length - 1].title;
        const previousVideoUrl = previousModule.content[previousModule.content.length - 1].video_url;
        setCurrentModule(previousModule.title);
        setCurrentSubtopic(previousSubtopic);
        setCurrentVideo(previousVideoUrl);
        await crud_user.addLastVideoWatched(
          {
            "name": course.name,
            "state": "in-progress",
            "last_module_name": previousModule.title,
            "last_subtopic_name": previousSubtopic,
          },
          sessionToken,
        )
        // redirect to the previous video
        window.location.href = `/common/categories/${id}/${courseID}/${previousModule.title + "_" + previousSubtopic}`;
      } else {
        // si el subtema actual no es el primero del modulo, entonces se debe ir al subtema anterior
        const previousSubtopic = course.modules[currentModuleIndex].content[currentSubtopicIndex - 1].title;
        const previousVideoUrl = course.modules[currentModuleIndex].content[currentSubtopicIndex - 1].video_url;
        setCurrentSubtopic(previousSubtopic);
        setCurrentVideo(previousVideoUrl);
        await crud_user.addLastVideoWatched(
          {
            "name": course.name,
            "state": "in-progress",
            "last_module_name": currentModule,
            "last_subtopic_name": previousSubtopic,
          },
          sessionToken,
        )
        // redirect to the previous video
        window.location.href = `/common/categories/${id}/${courseID}/${currentModule + "_" + previousSubtopic}`;
      }
    } else if (currentModuleIndex === 0){
      if(currentSubtopicIndex === 0) {
        // si el modulo actual es el primero y el subtema actual es el primero, entonces se debe mostrar un mensaje de que es el primer video del curso
        showAlert("Este es el primer video del curso", "info");
      } else {
        // si el modulo actual es el primero, pero el subtema no es el primero, entonces se debe ir al subtema anterior
        const previousSubtopic = course.modules[currentModuleIndex].content[currentSubtopicIndex - 1].title;
        const previousVideoUrl = course.modules[currentModuleIndex].content[currentSubtopicIndex - 1].video_url;
        setCurrentSubtopic(previousSubtopic);
        setCurrentVideo(previousVideoUrl);
        await crud_user.addLastVideoWatched(
          {
            "name": course.name,
            "state": "in-progress",
            "last_module_name": currentModule,
            "last_subtopic_name": previousSubtopic,
          },
          sessionToken,
        )
        // redirect to the previous video
        window.location.href = `/common/categories/${id}/${courseID}/${currentModule + "_" + previousSubtopic}`;
      }
    }
  };


  const handleAfterVideo = async () => {
    // redirect to the previous video
    if (!course) return;

    const sessionToken = JSON.parse(localStorage.getItem("token") ?? "{}");
    
    const currentModuleIndex = course.modules.findIndex((mod: Module) => mod.title === currentModule);
    const currentSubtopicIndex = course.modules[currentModuleIndex]?.content.findIndex((content: Content) => content.title === currentSubtopic);

    if (currentModuleIndex < course.modules.length - 1) {
      if(currentSubtopicIndex === course.modules[currentModuleIndex].content.length - 1) {
        // si el subtema actual es el ultimo del modulo, entonces se debe ir al primer subtema del modulo siguiente
        const nextModule = course.modules[currentModuleIndex + 1];
        const nextSubtopic = nextModule.content[0].title;
        const nextVideoUrl = nextModule.content[0].video_url;
        setCurrentModule(nextModule.title);
        setCurrentSubtopic(nextSubtopic);
        setCurrentVideo(nextVideoUrl);
        await crud_user.addLastVideoWatched(
          {
            "name": course.name,
            "state": "in-progress",
            "last_module_name": nextModule.title,
            "last_subtopic_name": nextSubtopic,
          },
          sessionToken,
        )
        // redirect to the previous video
        window.location.href = `/common/categories/${id}/${courseID}/${nextModule.title + "_" + nextSubtopic}`;
      } else {
        // si el subtema actual no es el ultimo del modulo, entonces se debe ir al subtema siguiente
        const nextSubtopic = course.modules[currentModuleIndex].content[currentSubtopicIndex + 1].title;
        const nextVideoUrl = course.modules[currentModuleIndex].content[currentSubtopicIndex + 1].video_url;
        setCurrentSubtopic(nextSubtopic);
        setCurrentVideo(nextVideoUrl);
        await crud_user.addLastVideoWatched(
          {
            "name": course.name,
            "state": "in-progress",
            "last_module_name": currentModule,
            "last_subtopic_name": nextSubtopic,
          },
          sessionToken,
        )
        // redirect to the previous video
        window.location.href = `/common/categories/${id}/${courseID}/${currentModule + "_" + nextSubtopic}`;
      }
    } else if (currentModuleIndex === course.modules.length - 1){
      if(currentSubtopicIndex === course.modules[currentModuleIndex].content.length - 1) {
        // si el modulo actual es el ultimo y el subtema actual es el ultimo, entonces se debe mostrar un mensaje de que es el ultimo video del curso
        showAlert("Este es el último video del curso", "info");
      } else {
        // si el modulo actual es el ultimo, pero el subtema no es el ultimo, entonces se debe ir al subtema siguiente
        const nextSubtopic = course.modules[currentModuleIndex].content[currentSubtopicIndex + 1].title;
        const nextVideoUrl = course.modules[currentModuleIndex].content[currentSubtopicIndex + 1].video_url;
        setCurrentSubtopic(nextSubtopic);
        setCurrentVideo(nextVideoUrl);
        await crud_user.addLastVideoWatched(
          {
            "name": course.name,
            "state": "in-progress",
            "last_module_name": currentModule,
            "last_subtopic_name": nextSubtopic,
          },
          sessionToken,
        )
        // redirect to the previous video
        window.location.href = `/common/categories/${id}/${courseID}/${currentModule + "_" + nextSubtopic}`;
      }
    }
  };
  
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
      <div className="grid grid-cols-5 gap-0 lg:grid-cols-5 bg-[--gray] lg:gap-2 w-full p-6 md:px-20 md:py-10">
        <div className="col-span-5 self-center flex justify-center items-center">
          <video
            ref={videoRef}
            controls
            className="w-full h-[500px] rounded-[25px]"
            autoPlay
          >
            <source src={currentVideo} type="video/mp4" />
            <track
              kind="captions"
              src="path_to_captions.vtt"
              label="Captions"
            />
          </video>
        </div>
        <div className="col-span-5 w-full text-[--white] pt-2 flex justify-center items-center">
          {currentModule}
          <FontAwesomeIcon icon={icons.faChevronRight} className="mx-3 text-[--principal-red]" />
          {currentSubtopic}
        </div>
      </div>
      <div className="col-span-5 self-center flex items-center justify-between w-[70%] pt-3">
        <button onClick={handleBeforeVideo} className="flex justify-around items-center text-[--white] text-base font-bold rounded-[10px] cursor-pointer bg-[--principal-blue] w-[175px] h-[50px] p-3 hover:shadow-lg hover:shadow-blue-500/50">
          <FontAwesomeIcon icon={icons.faChevronLeft} className=" w-[18px] text-[--white]" />
          Video anterior
        </button>
        <button onClick={handleAfterVideo} className="flex justify-around items-center text-[--white] text-base font-bold rounded-[10px] cursor-pointer bg-[--principal-blue] w-[175px] h-[50px] p-3 hover:shadow-lg hover:shadow-blue-500/50">
          Video siguiente
          <FontAwesomeIcon icon={icons.faChevronRight} className="w-[18px] text-[--white]" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-5 lg:gap-2 w-full p-6 md:px-20 md:py-10">
        <div className="col-span-5 py-10">
          <h3 className="text-[32px] text-start py-4">Temario del curso:</h3>
          {course.modules.map((module, id) => {

            const currentIndex = course.modules.findIndex((mod) => mod.title === currentModule);
            
            return (
              <div key={id} className={`text-${id > currentIndex ? '[--high-gray]' : '[--gray]'}`}>
                <BannerThemeCard
                  title={module.title}
                  description={module.description}
                  cuantity={module.content.length}
                  duration={module.duration}
                  content={module.content}
                  action="read"
                  currentSubtopic={currentSubtopic ?? ""}
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
