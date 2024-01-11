"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "../buttons/Button";
import icons from "../icons/icons";
import BannerThemeCard, {
  BannerThemeCardProps,
} from "../cards/BannerThemeCard";
import crud_user from "@/app/api/crud_user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../tools/Modal";

interface Instructor {
  email: string;
  name: string;
  lastname: string;
}
interface Content {
  title: string;
  video_url: string;
}
interface ThemeCardFormData {
  title: string;
  description: string;
  cuantity: number;
  duration: number;
  content: Content[] | null;
  action: "add" | "edit" | "read" | "delete";
}

interface CourseState {
  name: string;
  description: string;
  assessment: number;
  category: string;
  instructor: string;
  course_image_url: File | null;
  trailer_video_url: File | null;
  modules: ThemeCardFormData[];
};

const InitialCourseFormData: CourseState = {
  name: "",
  description: "",
  assessment: 0,
  category: "",
  instructor: "",
  course_image_url: null,
  trailer_video_url: null,
  modules: [],
};

const FormCourse = () => {
  const [user, setUser] = useState<Instructor>({
    email: "",
    name: "",
    lastname: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  //const [course, setCourse] = useState<CourseState>(InitialCourseFormData);
  const [classes, setClasses] = useState(0);

  const [themeCards, setThemeCards] = useState<BannerThemeCardProps[]>([]);

  const [themeCardFormData, setThemeCardFormData] = useState<ThemeCardFormData>(
    {
      title: "",
      description: "",
      cuantity: 0,
      duration: 0,
      content: [],
      action: "add",      
    }
  );

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    if (files.length > 0) {
      // Assuming you want to handle only the first dropped file
      const droppedFile = files[0];
      setFormData({
        ...formData,
        trailer_video_url: droppedFile,
      });
    }
    setIsDragOver(false);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setFormData({
      ...formData,
      course_image_url: file,
    });
    };
  
  const handleClasses = (event: ChangeEvent<HTMLInputElement>) => {
    event.target.name = event.target.value;
    const inputValue = parseInt(event.target.value, 10);
    const newValue = isNaN(inputValue) ? 0 : Math.max(0, inputValue);
    setClasses(newValue);
  }


  // Open and close the modal
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleAddThemeCard = () => {
    if (themeCardFormData.action === "add") {
      const newThemeCard: ThemeCardFormData = {
        title: themeCardFormData.title,
        description: themeCardFormData.description,
        cuantity: themeCardFormData.cuantity,
        duration: themeCardFormData.duration,
        content: Array.from({ length: classes }, (_, i) => ({
          title: `Tema ${i + 1}`,
          video_url: "",
        })),
        action: "add",
      };

      setThemeCards((prevThemeCards) => [
        ...prevThemeCards, 
        newThemeCard
      ]);

      setFormData((prevFormData) => {
        const updatedModules = [...prevFormData.modules, newThemeCard];
        return { ...prevFormData, modules: updatedModules };
      });
    } else if (themeCardFormData.action === "edit" && editingIndex !== null) {
    
      const updatedThemeCards = [...themeCards];
      
      let updatedContent: { title: string; video_url: string }[] = [];

      if (themeCardFormData.content?.length === classes) {
        updatedContent = themeCardFormData.content;
      } else if (themeCardFormData.content && themeCardFormData.content.length > classes) {
        updatedContent = themeCardFormData.content?.slice(0, classes) || [];
      } else {
        updatedContent = [...(themeCardFormData.content ?? [])];
        for (let i = 0; i < classes - (themeCardFormData.content?.length || 0); i++) {
          updatedContent.push({
            title: `Tema ${(themeCardFormData.content?.length ?? 0) + i + 1}`,
            video_url: "",
          });
        }
      }
    
      updatedThemeCards[editingIndex] = {
        title: themeCardFormData.title,
        description: themeCardFormData.description,
        cuantity: themeCardFormData.cuantity,
        duration: themeCardFormData.duration,
        content: updatedContent,
        action: "edit",
      };
    
      setThemeCards(updatedThemeCards);
    
      setFormData((prevFormData) => {
        const updatedModules = [...prevFormData.modules];
        updatedModules[editingIndex] = {
          ...updatedModules[editingIndex],
          ...updatedThemeCards[editingIndex],
        };
    
        return { ...prevFormData, modules: updatedModules };
      });
    }
    
    
    setEditingIndex(null);
    handleCloseModal();
    handleEraseThemeCardForm();
  };

  const handleEditThemeCard = (index: number) => {
    const selectedThemeCard = themeCards[index];
    setThemeCardFormData({
      ...selectedThemeCard,
      action: "edit",
    });
    setEditingIndex(index);
    setClasses(selectedThemeCard.content?.length ?? 0);
    handleOpenModal();
  };

  const handleEraseThemeCardForm = () => {
    setClasses(0);
    setThemeCardFormData({
      title: "",
      description: "",
      cuantity: 0,
      duration: 0,
      content: [],
      action: "add",
    });
  };

  const handleRemoveThemeCard = (index: number) => {
    setThemeCards((prevThemeCards) =>
      prevThemeCards.filter((_, i) => i !== index)
    );
  };

  const handleThemeCardFormChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setThemeCardFormData({
      ...themeCardFormData,
      [event.target.name]: event.target.value,
    });
  };

  const [formData, setFormData] = useState<CourseState>({
    name: "",
    description: "",
    assessment: 0,
    category: "",
    instructor: user.name + " " + user.lastname,
    course_image_url: null,
    trailer_video_url: null,
    modules: Array.isArray(themeCards) ? themeCards : [],
  });

  useEffect(() => {
    // Load user data from session storage when the component mounts
    //verify user state
    async function fetchData() {
      try {
        const sessionToken = JSON.parse(localStorage.getItem("token") ?? "");
        const storedUser = await crud_user.getUser(sessionToken || "");
        setUser(storedUser);
        setFormData({
          ...formData,
          instructor: storedUser.name + " " + storedUser.lastname,
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    fetchData();
  }, []);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-0 lg:grid-cols-5 lg:gap-2 w-full p-6 md:px-20 md:py-10"
    >
      <div className="col-span-5 lg:col-span-3 self-center rounded-[25px] flex items-center justify-center w-full">
        <label
          htmlFor={`dropzone-file-${formData.name}`}
          className={`flex flex-col items-center justify-center w-full h-[450px] rounded-[25px] border-2 border-[--medium-gray] text-[--principal-red] font-bold border-dashed cursor-pointer bg-[--high-gray] ${
            isDragOver
              ? "hover:bg-[--medium-gray] hover:border-[--principal-blue] hover:text-[--principal-blue]"
              : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleFileDrop}
        >
          {formData.course_image_url === null ? (
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
              <p className="text-xs text-[--principal-red]">
                {formData.course_image_url.name}
              </p>
            </div>
          )}
          <input
            id={`dropzone-file-${formData.name}`}
            type="file"
            name="course_image_url"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
      <div className="col-span-5 lg:col-span-2 px-4 lg:flex lg:flex-col justify-between items-center sm:items-start w-full">
        <div className="flex flex-col md:items-start">
          <div className="pt-6 md:pt-0">
            <div className={`flex items-center justify-between w-full py-2`}>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
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
                value={formData.instructor}
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
                value={formData.category}
                className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[60%]"
              >
                <option value="Fundamentos de programación">
                  Fundamentos de programación
                </option>
                <option value="Inteligencia Artificial">
                  Inteligencia Artificial
                </option>
                <option value="Bases de datos">Bases de datos</option>
                <option value="Seguridad informática">
                  Seguridad informática
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
                <option value="Testing y Q/A">Testing y Q/A </option>
              </select>
            </div>
            <div
              className={`flex flex-wrap items-start justify-between w-full py-2`}
            >
              <p className="font-bold">Descripción:</p>
              <textarea
                onChange={handleChange}
                value={formData.description}
                name="description"
                rows={7}
                className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-full"
                required
              />
            </div>
            <div className={`flex items-center justify-between w-full py-2`}>
              <p className="font-bold">Imagen para curso:</p>
              <input
                onChange={handleFileChange}
                type="file"
                name="course_image_url"
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
      <div className="col-span-5 py-10">
        <h3 className="text-[32px] text-start py-4">Temario del curso:</h3>
        {themeCards.map((themeCard, index) => (
          <div key={index} className="mb-4 relative">
            <BannerThemeCard {...themeCard} action="edit" />
            <div className="absolute top-0 right-0 m-2 p-2 flex space-x-2 cursor-pointer">
              <button type="button" onClick={() => handleEditThemeCard(index)}>
                <div className="w-[50px] h-[50px] rounded-2xl bg-[--principal-blue] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-blue-500/50">
                  <FontAwesomeIcon
                    icon={icons.faPenToSquare}
                    className={`text-[--white] transform`}
                  />
                </div>
              </button>
              <button
                type="button"
                onClick={() => handleRemoveThemeCard(index)}
              >
                <div className="w-[50px] h-[50px] rounded-2xl bg-[--principal-red] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-red-500/50">
                  <FontAwesomeIcon
                    icon={icons.faCircleXmark}
                    className={`text-[--white] transform`}
                  />
                </div>
              </button>
            </div>
          </div>
        ))}
        <Button
          text="Agregar tema"
          icon={icons.faPlus}
          color="blue"
          type="small"
          onClick={handleOpenModal}
        />
      </div>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <div className="col-span-4 md:col-span-2 w-[100%] rounded-[10px] bg-[--light] shadow-md shadow-gray-500/50 p-5 flex flex-col justify-center items-center">
          {themeCardFormData.action === "add" && (
            <h1 className="text-[38px] mb-5 text-center">
              Agregar un módulo nuevo
            </h1>
          )}
          {themeCardFormData.action === "edit" && (
            <h1 className="text-[38px] mb-5 text-center">
              Editar un módulo existente
            </h1>
          )}
          <div className="flex flex-col w-full">
            <input
              type="text"
              name="title"
              onChange={handleThemeCardFormChange}
              value={themeCardFormData.title}
              className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 w-full mb-2"
              placeholder="Título del módulo"
              required
            />
            <p>Descripción:</p>
            <textarea
              onChange={handleThemeCardFormChange}
              value={themeCardFormData.description}
              name="description"
              rows={4}
              className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 mb-2 text-sm w-full"
              placeholder="Descripción del módulo"
              required
            />
            <div className="flex justify-between items-center">
              <p>Cantidad de clases:</p>
              <input 
              type="number" 
              name="classes"
              onChange={handleClasses}
              value={classes}
              className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 mb-4 text-sm w-[55%]"
              required />
            </div>
          </div>
          {themeCardFormData.action === "add" ? (
            <Button
              text="Agregar"
              icon={icons.faPlus}
              color="blue"
              type="small"
              onClick={handleAddThemeCard}
            />
          ) : (
            <Button
              text="Actualizar"
              icon={icons.faRotateRight}
              color="blue"
              type="small"
              onClick={handleAddThemeCard}
            />
          )}
        </div>
      </Modal>
      
      <div className="col-span-5 justify-items-center">
        <Button
          text="Crear curso"
          icon={icons.faCircleUp}
          color="red"
          type="big"
        />
      </div>
    </form>
  );
};

export default FormCourse;
