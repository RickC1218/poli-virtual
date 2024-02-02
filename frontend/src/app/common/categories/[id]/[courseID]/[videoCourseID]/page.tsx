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
  const { id, courseID, videoCourseID } = useParams();
  const routerNotFound = useRouter();

  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [user, setUser] = useState<any>(null);
  const [currentModule, setCurrentModule] = useState<string | null>(null);
  const [currentSubtopic, setCurrentSubtopic] = useState<string | null>(null);
  const [currentVideo, setCurrentVideo] = useState<File | string | any>(null);

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
                  console.log(content.video_url)
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
    const handleVideoEnd = () => {
      if (!course) return;
  
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
        } else {
          // If the current subtopic index is the last one, get the next module
          const nextModule = course.modules[currentModuleIndex + 1];
          const nextSubtopic = nextModule.content[0]?.title || '';
          const nextVideoUrl = nextModule.content[0]?.video_url ?? '';
          setCurrentModule(nextModule.title);
          setCurrentSubtopic(nextSubtopic);
          setCurrentVideo(nextVideoUrl);
        }
      } else {
        // If the current module index is the last one, get the next module
        setCurrentModule('¡Felicidades!');
        setCurrentSubtopic('¡Has terminado el curso!');
        setCurrentVideo('https://www.youtube.com/watch?v=6ZfuNTqbHE8');
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

  return (
    <div className={`flex flex-between w-full h-full flex-col justify-between`}>
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-5 bg-[--gray] lg:gap-2 w-full p-6 md:px-20 md:py-10">
        <div className="col-span-5 self-center">
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
