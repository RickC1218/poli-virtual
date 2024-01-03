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
interface Content{
  title: string;
  video_url: string;
}
interface ThemeCardFormData {
  title: string;
  description: string;
  cuantity: number;
  duration: number;
  contents: Content[] | null;
  action: "add" | "edit" | "read";
}

const FormCourse = () => {
  const [user, setUser] = useState<Instructor>({
    email: "",
    name: "",
    lastname: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [themeCards, setThemeCards] = useState<BannerThemeCardProps[]>([]);

  const [themeCardFormData, setThemeCardFormData] = useState<ThemeCardFormData>(
    {
      title: "",
      description: "",
      cuantity: 0,
      duration: 0,
      contents: [],
      action: "add",
    }
  );

  // Open and close the modal
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  const handleAddThemeCard = () => {
    if (themeCardFormData.action === "add") {
      const newThemeCard = {
        title: themeCardFormData.title,
        description: themeCardFormData.description,
        cuantity: themeCardFormData.cuantity,
        duration: themeCardFormData.duration,
        contents: themeCardFormData.contents,
        onEdit: () => handleEditThemeCard(themeCards.length),
      };

      setThemeCards((prevThemeCards) => [...prevThemeCards, newThemeCard]);

      setFormData((prevFormData) => ({
        ...prevFormData,
        modules: [...prevFormData.modules, newThemeCard],
      }));
    } else if (themeCardFormData.action === "edit" && editingIndex !== null) {
      // Implement logic to update the existing card
      const updatedThemeCards = [...themeCards];
      updatedThemeCards[editingIndex] = {
        title: themeCardFormData.title,
        description: themeCardFormData.description,
        cuantity: themeCardFormData.cuantity,
        duration: themeCardFormData.duration,
        contents: themeCardFormData.contents,
        onEdit: () => handleEditThemeCard(editingIndex),
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
    handleOpenModal();
  };

  const handleEraseThemeCardForm = () => {
    setThemeCardFormData({
      title: "",
      description: "",
      cuantity: 0,
      duration: 0,
      contents: [],
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

    
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    assessment: 0,
    category: "",
    instructor: user.name + " " + user.lastname,
    image: "/frontend/public/course.jpg",
    modules: Array.isArray(themeCards) ? themeCards : [],
  });

  useEffect(() => {
    // Load user data from session storage when the component mounts
    //verify user state
    async function fetchData() {
      const sessionToken = JSON.parse(localStorage.getItem("token") || "");
      const storedUser = await crud_user.getUser(sessionToken || "");
      setUser(storedUser);
      setFormData({
        ...formData,
        instructor: storedUser.name + " " + storedUser.lastname,
      });
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
      <div className="col-span-5 lg:col-span-3 self-center">
        <iframe
          src="https://www.youtube.com/embed/iT4UOkyI09k?si=lY8CphkWJaNdWMhS"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="w-full h-[450px] rounded-[25px]"
        ></iframe>
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
                <option value="Fundamentos de programación">Fundamentos de programación</option>
                <option value="Inteligencia Artificial">Inteligencia Artificial</option>
                <option value="Bases de datos">Bases de datos</option>
                <option value="Seguridad informática">Seguridad informática</option>
                <option value="Arquitectura de computadoras">Arquitectura de computadoras</option>
                <option value="Redes y comunicación de datos">Redes y comunicación de datos</option>
                <option value="Desarrollo Front-End">Desarrollo Front-End</option>
                <option value="Desarrollo Back-End">Desarrollo Back-End</option>
                <option value="Desarrollo móvil">Desarrollo móvil</option>
                <option value="Desarrollo de juegos">Desarrollo de juegos</option>
                <option value="DevOps y automatización">DevOps y automatización</option>
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
                /*onChange={handleFileChange}*/
                /*value={courseFile}*/
                type="file"
                className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[60%]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-5 py-10">
        <h3 className="text-[32px] text-start py-4">Temario del curso:</h3>
        {themeCards.map((themeCard, index) => (
          <div key={index} className="mb-4 relative">
            <BannerThemeCard
              {...themeCard}
              onEdit={() => {
                handleEditThemeCard(index);
              }}
            />
            <button
              type="button"
              onClick={() => handleRemoveThemeCard(index)}
              className="absolute top-0 right-0 m-2 p-2 cursor-pointer"
            >
              <div className="w-[50px] h-[50px] rounded-2xl bg-[--principal-blue] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-blue-500/50">
                <FontAwesomeIcon
                  icon={icons.faCircleXmark}
                  className={`text-[--white] transform`}
                />
              </div>
            </button>
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
          {themeCardFormData.action === "add" ?  
          <h1 className="text-[38px] mb-5 text-center">
            Agregar un tema nuevo
          </h1>
          : <h1 className="text-[38px] mb-5 text-center">
            Editar un tema existente
          </h1>
          }
          <div className="flex flex-col w-full">
            <input
              type="text"
              name="title"
              onChange={handleThemeCardFormChange}
              value={themeCardFormData.title}
              className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 w-full mb-2"
              placeholder="Título del tema"
              required
            />
            <p>Descripción:</p>
            <textarea
              onChange={handleThemeCardFormChange}
              value={themeCardFormData.description}
              name="description"
              rows={4}
              className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 mb-4 text-sm w-full"
              placeholder="Descripción del tema"
              required
            />
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
