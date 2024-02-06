"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

import icons from "../icons/icons";
import crud_user from "@/app/api/crud_user";
import crud_course from "@/app/api/crud_course";
import FormSyllabus from "./FormSyllabus";
import Swal from "sweetalert2";

interface Instructor {
  email: string;
  name: string;
  lastname: string;
}
export interface CourseState {
  name: string;
  description: string;
  assessment: number;
  category: string;
  instructor: string;
  comments?: Comment[];
  course_image_url: File | null;
  trailer_video_url: File | null;
  modules: Module[];
}
interface Comment {
  student: string;
  assessment: number;
  comment: string;
}
export interface Module {
  title: string;
  description: string;
  cuantity: number;
  duration: number;
  content: Content[];
  action: "add" | "edit" | "read" | "delete" | "show";
  currentSubtopic?: string;
  course: string;
  course_ID: string;
}
export interface Content {
  title: string;
  duration: number;
  video_url: File | null;
  parentId: string;
  action: "add" | "edit" | "read" | "delete";
}

const FormCourse = () => {
  const router = useRouter();

  const [user, setUser] = useState<Instructor>({
    email: "",
    name: "",
    lastname: "",
  });

  const [isDragOver, setIsDragOver] = useState(false);

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
  
  /* Create course */
  const [course, setCourse] = useState<CourseState>({
    name: "",
    description: "",
    assessment: 0.5,
    category: "Fundamentos de programación",
    instructor: user.name + " " + user.lastname,
    course_image_url: null,
    trailer_video_url: null,
    modules: [],
    comments: [],
  });

  const allowedVideoTypes = ["video/mp4", "video/webm", "video/ogg"];

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleVideoDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      if (!allowedVideoTypes.includes(files[0].type)) {
        showAlert("El archivo debe ser un video", "error");
        return;
      } else {
        const droppedFile = files[files.length - 1];
        setCourse({
          ...course,
          trailer_video_url: droppedFile,
        });
      }
    }
    setIsDragOver(false);
  };

  const handleVideoDrag = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!allowedVideoTypes.includes(file.type)) {
        showAlert("El archivo debe ser un video", "error");
        event.target.value = "";
        return;
      } else {
        setCourse({
          ...course,
          trailer_video_url: file,
        });
      }
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.includes("image/")) {
        setCourse({
          ...course,
          course_image_url: file,
        });
      } else {
        showAlert("El archivo debe ser una imagen", "error");
        event.target.value = "";
      }
    }
  };

  
  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setCourse({
      ...course,
      [event.target.name]: event.target.value,
    });
  };

  // Modules
  const [modules, setModules] = useState<Module[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const loadingToast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  
    const loadingAlert = (
      message: string,
      type: "success" | "error" | "warning" | "info"
    ) => {
      loadingToast.fire({
        icon: type,
        title: message,
      });
    };
  
    loadingAlert("Cargando...", "info");
  
    try {
      if (modules.length === 0) {
        showAlert("El curso debe tener al menos un módulo", "error");
        return;
      }
      // Create course
      await crud_course.createCourse(course, modules);
      loadingToast.close(); // Cerrar la alerta de carga
  
      showAlert("Curso creado exitosamente", "success");
      router.push("/common/profile");
    } catch (err) {
      loadingToast.close(); // Cerrar la alerta de carga en caso de error
      showAlert("Error al crear el curso", "error");
    }
  };

  // Confirm syllabus
  const handleConfirmSyllabus = (updateModules: Module[]) => {
    setCourse({
      ...course,
      modules: updateModules,
    });
  };
  
  useEffect(() => {
    async function fetchData() {
      const sessionToken = JSON.parse(localStorage.getItem("token") ?? "{}");
      const user = await crud_user.getUser(sessionToken || "");
      setUser(user);
      setCourse({
        ...course,
        instructor: user.name + " " + user.lastname,
      });
    }
    fetchData();
  }, []);

  return (
    <form onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-0 w-full p-6 md:px-20 md:py-10"
    >
      <div className="col-span-5 lg:col-span-3 self-center rounded-[25px] flex items-center justify-center w-full">
        <label
          htmlFor={`dropzone-file-${course.trailer_video_url}`}
          className={`flex flex-col items-center justify-center w-full h-[450px] rounded-[25px] border-2 border-[--medium-gray] text-[--principal-red] font-bold border-dashed cursor-pointer bg-[--high-gray] 
          ${
            isDragOver
              ? "bg-[--medium-gray] border-[--principal-blue] text-[--principal-blue]"
              : ""
          }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleVideoDrop}
        >
          {course.trailer_video_url === null ? (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FontAwesomeIcon
                icon={icons.faCloudArrowUp}
                className="w-[50px] h-[50px] text-[--principal-blue]"
              />
              <p className="mb-2 text-sm text-[--principal-blue] ">
                Da click y escoge el trailer de tu nuevo curso o arrastralo
                aquí.
              </p>
              <p className="text-xs text-[--gray]">MP4 (Max 100MB)</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FontAwesomeIcon
                icon={icons.faCheck}
                className="w-[50px] h-[50px] text-[--principal-blue]"
              />
              <p className="mb-2 text-sm text-[--principal-blue]">
                Archivo cargado exitosamente
              </p>
              <p className="text-xs text-[--principal-red]">{course.trailer_video_url.name}</p>
            </div>
          )}
          <input
            id={`dropzone-file-${course.trailer_video_url}`}
            type="file"
            name="dragVideo"
            className="hidden"
            onChange={handleVideoDrag}
          />
        </label>
      </div>
      <div className="col-span-5 lg:col-span-2 px-4 lg:flex lg:flex-col justify-between items-center sm:items-start w-full">
        <div className="flex flex-col md:items-start">
          <div className="w-full pt-6 md:pt-0">
            <div className={`flex items-center justify-between w-full py-2`}>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={course.name}
                className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-[32px] xl:text-[38px] w-full mb-2"
                placeholder="Título del curso"
                required
              />
            </div>
            <div className={`flex items-center justify-between w-full py-2`}>
              <p className="font-bold">Autor del curso:</p>
              <input
                type="text"
                name="instructor"
                onChange={handleChange}
                value={course.instructor}
                className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[60%]"
                required
                disabled
              />
            </div>
            <div className={`flex items-center justify-between w-full py-2`}>
              <p className="font-bold">Categoría del curso:</p>
              <select
                name="category"
                onChange={handleChange}
                value={course.category}
                className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[60%]"
              >
                <option value="Fundamentos de programación">
                  Fundamentos de programación
                </option>
                <option value="Inteligencia artificial">
                  Inteligencia artificial
                </option>
                <option value="Bases de datos">Bases de datos</option>
                <option value="Seguridad Informática">
                  Seguridad Informática
                </option>
                <option value="Arquitectura de computadoras">
                  Arquitectura de computadoras
                </option>
                <option value="Redes y comunicación de datos">
                  Redes y comunicación de datos
                </option>
                <option value="Desarrollo Front-End">
                  Desarrollo Front-End
                </option>
                <option value="Desarrollo Back-End">Desarrollo Back-End</option>
                <option value="Desarrollo móvil">Desarrollo móvil</option>
                <option value="Desarrollo de juegos">
                  Desarrollo de juegos
                </option>
                <option value="DevOps y automatización">
                  DevOps y automatización
                </option>
                <option value="QA Testing">QA Testing</option>
              </select>
            </div>
            <div
              className={`flex flex-wrap items-start justify-between w-full py-2`}
            >
              <p className="font-bold">Descripción:</p>
              <textarea
                onChange={handleChange}
                name="description"
                rows={7}
                value={course.description}
                className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-full"
                required
              />
            </div>
            <div className={`flex items-center justify-between w-full py-2`}>
              <p className="font-bold">Imagen para curso:</p>
              <input
                onChange={handleFileChange}
                type="file"
                name="dragImage"
                className=" w-[60%] p-2 text-[--principal-red] font-bold file:mr-4 file:py-2 file:px-6  
                file:rounded-[10px] file:border-0
                file:text-sm file:font-semibold
                file:bg-[--principal-blue] file:text-[--light] 
                hover:file:shadow-md hover:file:shadow-blue-500/50"
              ></input>
            </div>
          </div>
        </div>
      </div>
      <FormSyllabus 
        course={course.name}
        courseID={""}
        modules={modules}
        setModules={setModules}       
        onConfirmSyllabus={handleConfirmSyllabus}
      />
    </form>
  );
};

export default FormCourse;
