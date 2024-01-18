import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useEffect, useState } from "react";
import icons from "../icons/icons";
import BannerSubThemeCard, {
  BannerSubThemeCardProps,
} from "./BannerSubThemeCard";
import Button from "../buttons/Button";
import Modal from "../tools/Modal";
import { SubThemeCardFormData } from "../forms/FormCourse";

export interface BannerThemeCardProps {
  title: string;
  description: string;
  cuantity: number;
  duration: number;
  content: SubThemeCardFormData[] | null;
  action: "add" | "edit" | "read" | "delete";
}

const BannerThemeCard: React.FC<
  BannerThemeCardProps & { initialSubThemes: SubThemeCardFormData[] } & { updateSubThemes: (themeId: number, subThemes: BannerSubThemeCardProps[]) => void }
> = ({
  title,
  description,
  cuantity,
  duration,
  content,
  action,
  initialSubThemes,
  updateSubThemes
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const [editingSubIndex, setEditingSubIndex] = useState<number | null>(null);
  const [subThemeCards, setSubThemeCards] = useState<BannerSubThemeCardProps[]>(
    []
  );

  const [subThemeCardFormData, setSubThemeCardFormData] =
    useState<SubThemeCardFormData>({
      title: "",
      duration: 0,
      parentId: "",
      video_url: "",
      action: "add",
    });

  const [formSubData, setFormSubData] = useState<BannerThemeCardProps>({
    title: "",
    description: "",
    cuantity: 0,
    duration: 0,
    content: subThemeCards.map((subThemeCard) => ({
      title: subThemeCard.title,
      duration: subThemeCard.duration,
      parentId: subThemeCard.parentId,
      video_url: subThemeCard.video_url,
      action: "add",
    })),
    action: "add",
  });

  const [isSubOpen, setIsSubOpen] = useState(false);

  const handleOpenModal = () => setIsSubOpen(true);
  const handleCloseModal = () => setIsSubOpen(false);

  const handleAddSubThemeCard = () => {
    if (subThemeCardFormData.action === "add") {
      const newSubThemeCard: SubThemeCardFormData = {
        title: subThemeCardFormData.title,
        duration: subThemeCardFormData.duration,
        parentId: subThemeCardFormData.parentId,
        video_url: subThemeCardFormData.video_url,
        action: "add",
      };

      setSubThemeCards((prevSubThemesCards) => [
        ...prevSubThemesCards,
        newSubThemeCard,
      ]);

      setFormSubData((prevFormSubData) => {
        if (prevFormSubData.content === null) return prevFormSubData;
        const updatedContent = [...prevFormSubData.content, newSubThemeCard];
        return {
          ...prevFormSubData,
          content: updatedContent,
        };
      });
    } else if (
      subThemeCardFormData.action === "edit" &&
      editingSubIndex !== null
    ) {
      const updatedSubThemeCards = [...subThemeCards];
      
      updatedSubThemeCards[editingSubIndex] = {
        title: subThemeCardFormData.title,
        duration: subThemeCardFormData.duration,
        parentId: subThemeCardFormData.parentId,
        video_url: subThemeCardFormData.video_url,
        action: "edit",
      };

      setSubThemeCards(updatedSubThemeCards);

      setFormSubData((prevFormSubData) => {
        if (prevFormSubData.content === null) return prevFormSubData;
        const updatedSubContent = [...prevFormSubData.content];
        updatedSubContent[editingSubIndex] = {
          title: subThemeCardFormData.title,
          duration: subThemeCardFormData.duration,
          parentId: subThemeCardFormData.parentId,
          video_url: subThemeCardFormData.video_url,
          action: "edit",
        };
        updateSubThemes(editingSubIndex, subThemeCards);

        return { ...prevFormSubData, content: updatedSubContent };
      });

      console.log("subThemeCards", subThemeCards[editingSubIndex])
    }
    setEditingSubIndex(null);
    handleCloseModal();
  };

    const handleEditSubThemeCard = (index: number) => {
      const selectedSubThemeCard = subThemeCards[index];
      setSubThemeCardFormData({
        title: selectedSubThemeCard.title,
        duration: selectedSubThemeCard.duration,
        parentId: selectedSubThemeCard.parentId,
        video_url: selectedSubThemeCard.video_url,
        action: "edit",
      });

      updateSubThemes(index, subThemeCards);
      setEditingSubIndex(index);
      handleOpenModal();
    };

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
        setSelectedFile(droppedFile);
      }

      setIsDragOver(false);
    };

    const handleSubThemeCardFormChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      setSubThemeCardFormData({
        ...subThemeCardFormData,
        [e.target.name]: e.target.value,
      });
    };

    const handleRemoveSubThemeCard = (index: number) => () => {
      setSubThemeCards((prevSubThemeCards) =>
        prevSubThemeCards.filter((_, i) => i !== index)
      );
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      setSelectedFile(file);
      console.log("file: ", file);
    };

    const handleUploadFileClick = () => {
      document.getElementById("dropzone-file")?.click();
    };
  

    useEffect(() => {
      async function fetchData() {
        try {
          if (initialSubThemes === null) {
            setSubThemeCards([]);
          } else {
            setSubThemeCards(JSON.parse(JSON.stringify(initialSubThemes)));
          }
          console.log("subThemeCards", subThemeCards);
          setFormSubData({
            ...formSubData,
            content: initialSubThemes.map((subThemeCard) => ({
              title: subThemeCard.title,
              duration: subThemeCard.duration,
              parentId: subThemeCard.parentId,
              video_url: subThemeCard.video_url,
              action: "add",
            })),
          });
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }, []);

    return (
      <>
        <div className="flex items-center bg-[--white] rounded-[32px] p-4 my-1 border-2 border-[--medium-gray]">
          <button type="button" onClick={handleExpand}>
            <div className="w-[50px] h-[50px] rounded-2xl bg-[--principal-red] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-red-500/50">
              <FontAwesomeIcon
                icon={icons.faChevronRight}
                className={`text-[--white] transform ${
                  expanded ? "rotate-90" : "rotate-0"
                }`}
              />
            </div>
          </button>
          <div className="text-start grow justify-self-start mx-2">
            <p className="text-base line-clamp-2">
              <span className="font-bold">{title}:</span> {description}
            </p>
          </div>
          {action === "read" && (
            <div className="pr-16">
              <p className="text-base font-bold">
                {cuantity} clases - {duration} minutos
              </p>
            </div>
          )}
        </div>
        {expanded &&
          content?.map((subthemeCard, index) => (
            <div key={index} className="relative mb-">
              <BannerSubThemeCard {...subthemeCard} action="edit" />
              {action === "edit" && (
                <>
                  <div className="absolute top-3 right-12 flex space-x-2 cursor-pointer">
                    <button
                      type="button"
                      onClick={() => handleEditSubThemeCard(index)}
                    >
                      <div className="w-[50px] h-[50px] rounded-2xl bg-[--gray] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-gray-500/50">
                        <FontAwesomeIcon
                          icon={icons.faPenToSquare}
                          className={`text-[--white] transform`}
                        />
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubThemeCard(index)}
                    >
                      <div className="w-[50px] h-[50px] rounded-2xl bg-[--principal-red] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-red-500/50">
                        <FontAwesomeIcon
                          icon={icons.faCircleXmark}
                          className={`text-[--white] transform`}
                        />
                      </div>
                    </button>
                  </div>
                  <Modal isOpen={isSubOpen} onClose={handleCloseModal}>
                    <div className="col-span-4 md:col-span-2 w-[100%] rounded-[10px] bg-[--light] shadow-md shadow-gray-500/50 flex flex-col justify-center items-center p-3">
                      <div className="flex flex-col w-full p-2">
                        <div
                          className={`flex items-center justify-around w-full`}
                        >
                          <p className="font-bold">Título:</p>
                          <input
                            type="text"
                            name="title"
                            onChange={handleSubThemeCardFormChange}
                            value={subThemeCardFormData.title}
                            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm grow ml-5"
                            required
                          />
                        </div>
                        <p className="font-bold">Video de este subtema:</p>
                        <label
                          htmlFor={`dropzone-file-${subThemeCardFormData.title}`}
                          className={`flex flex-col items-center justify-center w-full h-[200px] rounded-[25px] border-2 border-[--medium-gray] text-[--principal-red] font-bold border-dashed cursor-pointer bg-[--high-gray] ${
                            isDragOver
                              ? "hover:bg-[--medium-gray] hover:border-[--principal-blue] hover:text-[--principal-blue]"
                              : ""
                          }`}
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleFileDrop}
                        >
                          {selectedFile === null ? (
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <FontAwesomeIcon
                                icon={icons.faCloudArrowUp}
                                className="w-[50px] h-[50px] text-[--principal-blue]"
                              />
                              <p className="mb-2 text-sm text-[--principal-blue] ">
                                Da click y escoge el video de esta sesión o
                                arrastralo aquí.
                              </p>
                              <p className="text-xs text-[--gray]">
                                MP4 (Max 100MB)
                              </p>
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
                                {selectedFile.name}
                              </p>
                            </div>
                          )}
                          <input
                            id={`dropzone-file-${subThemeCardFormData.title}`}
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                        <div className="flex justify-center space-x-2 pt-5">
                          <Button
                            text="Actualizar"
                            icon={icons.faRotateRight}
                            color="blue"
                            type="small"
                            onClick={handleAddSubThemeCard}
                          />
                          <Button
                            text="Cancelar"
                            icon={icons.faCircleXmark}
                            color="red"
                            type="small"
                            onClick={handleCloseModal}
                          />
                        </div>
                      </div>
                    </div>
                  </Modal>
                </>
              )}
            </div>
          ))}
      </>
    );
};

export default BannerThemeCard;
