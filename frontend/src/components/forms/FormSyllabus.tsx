import { ChangeEvent, useState } from "react";
import Button from "../buttons/Button";
import BannerThemeCard from "../cards/BannerThemeCard";
import icons from "../icons/icons";
import { Module, Content } from "./FormCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BannerSubThemeCard from "../cards/BannerSubThemeCard";

interface FormSyllabusProps {
  modules: Module[];
  setModules: React.Dispatch<React.SetStateAction<Module[]>>;
}

const FormSyllabus: React.FC<FormSyllabusProps> = () => {
  /* index para modules */
  const [index, setIndex] = useState<number>(0);
  /* index para contents */
  const [indexContent, setIndexContent] = useState<number>(0);
  const [modules, setModules] = useState<Module[]>([]);
  const [contents, setContents] = useState<Content[]>([]);

  const [module, setModule] = useState<Module>({
    title: "",
    description: "",
    duration: 0,
    cuantity: 0,
    content: contents,
    action: "add",
  });

  const [content, setContent] = useState<Content>({
    title: "",
    duration: 0,
    video_url: null,
    parentId: module.title,
    action: "add",
  });

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  //Alert message
  const showAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000); // close the alert after 3 seconds
  };

  const [isDragOver, setIsDragOver] = useState(false);

  const [expandFormModule, setExpandFormModule] = useState<boolean>(false);
  const [expandFormContent, setExpandFormContent] = useState<boolean[]>(
    Array(modules.length).fill(false)
  );

  /* expand forms */
  const handleExpandFormModule = () => {
    setExpandFormModule(!expandFormModule);
    if (expandFormModule) {
      setModule({
        title: "",
        description: "",
        duration: 0,
        cuantity: 0,
        content: [],
        action: "add",
      });
    }
  };

  const handleExpandFormContent = (id: number) => {
    setExpandFormContent((prevState) => {
      const newExpandStates = [...prevState];
      newExpandStates[id] = !newExpandStates[id];
      return newExpandStates;
    });
    setIndex(id);
    if (!expandFormContent[id]) {
      setContent({
        title: "",
        duration: 0,
        video_url: null,
        parentId: modules[id].title,
        action: "add",
      });
    }
  };

  /* drag and drop files */
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
      const droppedFile = files[files.length - 1];
      setContent({
        ...content,
        video_url: droppedFile,
      });
    }
    setIsDragOver(false);
  };

  const handleVideoDrag = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setContent({
        ...content,
        video_url: file,
      });
    }
  };

  /* handle change module */
  const handleChangeModule = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setModule({
      ...module,
      [e.target.name]: e.target.value,
    });
  };

  /* crud modules */
  const handleAddModule = () => {
    if (module.title === "" || module.description === "") {
      showAlert("Por favor, completa todos los campos.");
      return;
    }
    if (module.action === "add") {
      setModules([
        ...modules,
        {
          title: module.title,
          description: module.description,
          duration: module.duration,
          cuantity: module.cuantity,
          content: module.content,
          action: "add",
        },
      ]);
    } else {
      setModules((prevModules) => {
        const newModules = [...prevModules];
        newModules[index] = {
          title: module.title,
          description: module.description,
          duration: module.duration,
          cuantity: module.cuantity,
          content: module.content.map((content) => ({
            title: content.title,
            duration: content.duration,
            video_url: content.video_url,
            parentId: module.title,
            action: "add",
          })),
          action: "add",
        };
        return newModules;
      });
    }
    setExpandFormModule(false);
    setModule({
      title: "",
      description: "",
      duration: 0,
      cuantity: 0,
      content: [],
      action: "add",
    });
  };

  const handleEditModule = (id: number) => {
    setIndex(id);
    setModule({
      title: modules[id].title,
      description: modules[id].description,
      duration: modules[id].duration,
      cuantity: modules[id].cuantity,
      content: modules[id].content,
      action: "edit",
    });
    setExpandFormModule(true);
  };

  const handleRemoveModule = (id: number) => {
    setModules(modules.filter((module, index) => index !== id));
  };

  /* handle change content */
  const handleChangeContent = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setContent({
      ...content,
      [e.target.name]: e.target.value,
    });
  };

  /* crud contents */
  const handleAddContent = () => {
    if (content.title === "" || content.video_url === null) {
      showAlert("Por favor, completa todos los campos.");
      return;
    }
    if (content.action === "add") {
      modules[index].content.push({
        title: content.title,
        duration: content.duration,
        video_url: content.video_url,
        parentId: modules[index].title,
        action: "add",
      });
    } else {
      modules[index].content[indexContent] = {
        title: content.title,
        duration: content.duration,
        video_url: content.video_url,
        parentId: modules[index].title,
        action: "add",
      };
      setContent(modules[index].content[indexContent]);
    }
    setExpandFormContent(
      expandFormContent.map((_, i) => (i === index ? false : _))
    );
    setContent({
      title: "",
      duration: 0,
      video_url: null,
      parentId: modules[index].title,
      action: "add",
    });
  };

  const handleEditContent = (idModule: number, idContent: number) => {
    setIndexContent(idContent);
    console.log(modules[idModule].content[idContent]);
    setContent({
      title: modules[idModule].content[idContent].title,
      duration: modules[idModule].content[idContent].duration,
      video_url: modules[idModule].content[idContent].video_url,
      parentId: modules[idModule].content[idContent].parentId,
      action: "edit",
    });
    setModules(
      modules.map((module, index) =>
        index === idModule
          ? {
              ...module,
              content: module.content.map((content, index) => ({
                title: content.title,
                duration: content.duration,
                video_url: content.video_url,
                parentId: module.title,
                action: "add",
              })),
            }
          : module
      )
    );
    setExpandFormContent(
      expandFormContent.map((_, i) => (i === idModule ? true : _))
    );
  };

  const handleRemoveContent = (idModule: number, idContent: number) => {
    setContents(
      modules[idModule].content.filter((content, index) => index !== idContent)
    );
    setModules(
      modules.map((module, index) =>
        index === idModule
          ? {
              ...module,
              content: module.content.filter(
                (content, index) => index !== idContent
              ),
            }
          : module
      )
    );
  };

  /* confirm syllabus */
  const handleConfirmSyllabus = (modules: Module[]) => {
    if (modules.length === 0) {
      showAlert("Por favor, agrega al menos un módulo.");
      return;
    }
    setModules(modules);
    console.log(modules);
  };

  return (
    <section className="col-span-5 pt-10 mb-5">
      <h3 className="text-[32px] text-start">Temario del curso:</h3>
      <p className="text-start">
        <FontAwesomeIcon
          icon={icons.faChevronRight}
          className="mx-3 text-[--principal-red]"
        />
        Crea módulos para tu curso.
        <button type="button" onClick={handleExpandFormModule}>
          <div className="mx-5 w-[50px] h-[50px] rounded-2xl bg-[--principal-blue] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-blue-500/50">
            <FontAwesomeIcon
              icon={icons.faPlus}
              className={`text-[--white] transform ${
                expandFormModule ? "rotate-45" : "rotate-0"
              }`}
            />
          </div>
        </button>
      </p>
      {expandFormModule && (
        <div className="my-5 w-[100%] lg:w-[50%] rounded-[10px] bg-[--light] shadow-md shadow-gray-500/50 p-5 flex flex-col justify-center items-center border-2 border-[--principal-blue]">
          {module.action === "add" && (
            <h1 className="text-[32px] mb-5 text-center">
              Agregar un módulo nuevo
            </h1>
          )}
          {module.action === "edit" && (
            <h1 className="text-[32px] mb-5 text-center">
              Editar un módulo existente
            </h1>
          )}
          <div className="flex flex-col w-full">
            <input
              type="text"
              name="title"
              onChange={handleChangeModule}
              value={module.title}
              className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 w-full mb-2"
              placeholder="Título del módulo"
              required
            />
            <p>Descripción:</p>
            <textarea
              onChange={handleChangeModule}
              value={module.description}
              name="description"
              rows={4}
              className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 mb-2 text-sm w-full"
              placeholder="Descripción del tema"
              required
            />
          </div>
          <div className="flex space-x-2">
            {module.action === "add" ? (
              <Button
                text="Agregar módulo"
                icon={icons.faPlus}
                color="blue"
                type="small"
                onClick={handleAddModule}
              />
            ) : (
              <Button
                text="Actualizar módulo"
                icon={icons.faRotateRight}
                color="blue"
                type="small"
                onClick={handleAddModule}
              />
            )}
            <Button
              text="Cancelar"
              icon={icons.faCircleXmark}
              color="red"
              type="small"
              onClick={handleExpandFormModule}
            />
          </div>
          {alertMessage && (
            <p className="text-red-500 text-sm">{alertMessage}</p>
          )}
        </div>
      )}
      {modules?.map((module, id) => (
        <div key={id} className="mb-4 relative">
          <BannerThemeCard
            title={module.title}
            description={module.description}
            cuantity={10}
            duration={120}
            content={module.content}
            action={module.action}
          />
          <div className="absolute top-[1.5px] right-[1.8px] m-2 p-2 flex space-x-2 cursor-pointer">
            <button type="button" onClick={() => handleEditModule(id)}>
              <div className="w-[50px] h-[50px] rounded-2xl bg-[--principal-blue] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-blue-500/50">
                <FontAwesomeIcon
                  icon={icons.faPenToSquare}
                  className={`text-[--white] transform`}
                />
              </div>
            </button>
            <button type="button" onClick={() => handleRemoveModule(id)}>
              <div className="w-[50px] h-[50px] rounded-2xl bg-[--principal-red] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-red-500/50">
                <FontAwesomeIcon
                  icon={icons.faCircleXmark}
                  className={`text-[--white] transform`}
                />
              </div>
            </button>
          </div>
          {modules[id].content?.map((content, index) => (
            <div key={index} className="relative mb-1">
              <BannerSubThemeCard {...content} action="edit" />
              <div className="absolute top-[5px] right-[37px] p-2 flex space-x-2 cursor-pointer">
                <button
                  type="button"
                  onClick={() => handleEditContent(id, index)}
                >
                  <div className="w-[50px] h-[50px] rounded-xl bg-[--gray] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-blue-500/50">
                    <FontAwesomeIcon
                      icon={icons.faPenToSquare}
                      className={`text-[--white] transform`}
                    />
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => handleRemoveContent(id, index)}
                >
                  <div className="w-[50px] h-[50px] rounded-xl bg-[--principal-red] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-red-500/50">
                    <FontAwesomeIcon
                      icon={icons.faCircleXmark}
                      className={`text-[--white] transform`}
                    />
                  </div>
                </button>
              </div>
            </div>
          ))}
          <div>
            <p className="px-12 text-start">
              <FontAwesomeIcon
                icon={icons.faChevronRight}
                className="mx-3 text-[--principal-red]"
              />
              Crea clases para este módulo.
              <button type="button" onClick={() => handleExpandFormContent(id)}>
                <div className="mx-5 w-[50px] h-[50px] rounded-2xl bg-[--gray] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-gray-500/50">
                  <FontAwesomeIcon
                    icon={icons.faPlus}
                    className={`text-[--white] transform ${
                      expandFormContent[id] ? "rotate-45" : "rotate-0"
                    }`}
                  />
                </div>
              </button>
            </p>
            {expandFormContent[id] && (
              <div className="my-5 w-[100%] lg:w-[50%] rounded-[10px] bg-[--light] shadow-md shadow-gray-500/50 p-5 flex flex-col justify-center items-center border-2 border-[--medium-gray]">
                {content.action === "add" && (
                  <h1 className="text-[32px] mb-5 text-center">
                    Agregar una clase nueva
                  </h1>
                )}
                {content.action === "edit" && (
                  <h1 className="text-[32px] mb-5 text-center">
                    Editar una clase existente
                  </h1>
                )}
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    name="title"
                    onChange={handleChangeContent}
                    value={content.title}
                    className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 w-full mb-2"
                    placeholder="Título del tema"
                    required
                  />
                  <label
                    htmlFor={`dropzone-file-content-${content.title}-${content.video_url}`}
                    className={`flex flex-col items-center justify-center w-full h-[200px] rounded-[25px] border-2 border-[--medium-gray] text-[--principal-red] font-bold border-dashed cursor-pointer bg-[--high-gray] mb-4 
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
                    {content.video_url === null ? (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FontAwesomeIcon
                          icon={icons.faCloudArrowUp}
                          className="w-[50px] h-[50px] text-[--principal-blue]"
                        />
                        <p className="mb-2 text-sm text-[--principal-blue] ">
                          Da click y escoge el video de tu clase o arrastralo
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
                          {content.video_url.name}
                        </p>
                      </div>
                    )}
                    <input
                      id={`dropzone-file-content-${content.title}-${content.video_url}`}
                      type="file"
                      name="dragVideoContent"
                      className="hidden"
                      onChange={handleVideoDrag}
                    />
                  </label>
                </div>
                <div className="flex space-x-2">
                  {content.action === "add" ? (
                    <Button
                      text="Agregar clase"
                      icon={icons.faPlus}
                      color="blue"
                      type="small"
                      onClick={handleAddContent}
                    />
                  ) : (
                    <Button
                      text="Actualizar clase"
                      icon={icons.faRotateRight}
                      color="blue"
                      type="small"
                      onClick={handleAddContent}
                    />
                  )}
                  <Button
                    text="Cancelar"
                    icon={icons.faCircleXmark}
                    color="red"
                    type="small"
                    onClick={() => handleExpandFormContent(index)}
                  />
                </div>
                {alertMessage && (
                  <p className="text-red-500 text-sm">{alertMessage}</p>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="flex w-full justify-center py-5">
        <Button
          text="Confirmar temario"
          icon={icons.faCheck}
          color="blue"
          type="small"
          onClick={() => handleConfirmSyllabus(modules)}
        />
      </div>
    </section>
  );
};

export default FormSyllabus;
