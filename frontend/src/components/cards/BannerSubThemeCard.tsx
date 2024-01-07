"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../icons/icons";
import { ChangeEvent, useState } from "react";
import Button from "../buttons/Button";

interface BannerSubThemeCardProps {
  title: string;
  duration: number;
  parentId: string;
  action: "add" | "edit" | "read" | "delete";
}

const BannerSubThemeCard: React.FC<BannerSubThemeCardProps> = ({
  title,
  duration,
  parentId,
  action,
}) => {

  const [individualContent, setIndividualContent] = useState({
    title: title,
    duration: 0,
    parentId: parentId,
    video_url: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [flagEditContent, setFlagEditContent] = useState(false);

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

  const handleFlagEditContent = () => {
    setFlagEditContent(!flagEditContent);
  };
  const handleDeleteContent = (title: string) => () => {
    console.log(`Eliminando contenido: ${title}`);
  };
  const handleChange = (e: any) => {
    setIndividualContent({
      ...individualContent,
      [e.target.name]: e.target.value,
    });
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file);
    console.log("file: ", file);
  };
  const handleUploadFileClick = () => {
    document.getElementById("dropzone-file")?.click();
  };
  const handleUpdateContentCard = () => {
    console.log(individualContent);
    handleFlagEditContent();
  }
  return (
    <div className="flex justify-between items-center bg-[--white] rounded-[24px] p-3 mx-8 my-1 border border-[--high-gray]">
      {!flagEditContent ? (
        <>
          <div className="w-[50px] h-[50px] rounded-xl bg-[--principal-blue] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-blue-500/50">
            <FontAwesomeIcon icon={icons.faTv} className="p-2 text-[--white]" />
          </div>
          <div className="text-start grow mx-2">
            <p className="text-base font-bold">{individualContent.title}</p>
            <p className="text-sm text-[--medium-gray]">{individualContent.parentId}</p>
          </div>
          {action === "read" ? (
            <div>
              <p className="text-base font-bold">{individualContent.duration} minutos</p>
            </div>
          ) : (
            <div className="top-0 right-0 flex space-x-2 cursor-pointer">
              <button type="button" onClick={handleFlagEditContent}>
                <div className="w-[50px] h-[50px] rounded-2xl bg-[--gray] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-gray-500/50">
                  <FontAwesomeIcon
                    icon={icons.faPenToSquare}
                    className={`text-[--white] transform`}
                  />
                </div>
              </button>
              <button type="button" onClick={handleDeleteContent(title)}>
                <div className="w-[50px] h-[50px] rounded-2xl bg-[--principal-red] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-red-500/50">
                  <FontAwesomeIcon
                    icon={icons.faCircleXmark}
                    className={`text-[--white] transform`}
                  />
                </div>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col w-full p-5">
          <div className={`flex items-center justify-around w-full`}>
            <p className="font-bold">Título de la sesión:</p>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={individualContent.title}
              className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[60%]"
              required
            />
          </div>
          <p className="font-bold">Video de este subtema:</p>
          <label
            htmlFor={`dropzone-file-${individualContent.title}`}
            className={`flex flex-col items-center justify-center w-full h-[450px] rounded-[25px] border-2 border-[--medium-gray] text-[--principal-red] font-bold border-dashed cursor-pointer bg-[--high-gray] ${
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
                  Da click y escoge el video de esta sesión o arrastralo aquí.
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
                  {selectedFile.name}
                </p>
              </div>
            )}
            <input id={`dropzone-file-${individualContent.title}`} type="file" onChange={handleFileChange} className="hidden" />
          </label>
          <div className="flex justify-center space-x-2 pt-5">
            <Button
              text="Actualizar"
              icon={icons.faRotateRight}
              color="blue"
              type="small"
              onClick={handleUpdateContentCard}
            />
            <Button
              text="Cancelar"
              icon={icons.faCircleXmark}
              color="red"
              type="small"
              onClick={handleFlagEditContent}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerSubThemeCard;
