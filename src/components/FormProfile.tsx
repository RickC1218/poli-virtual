
"use client";
import { ChangeEvent, useState } from "react";

interface FormProfileProps {
  type: "be-instructor" | "profile" | "profile-instructor";
}

const FormProfile: React.FC<FormProfileProps> = ({ type }) => {

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [mail, setMail] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("1er semestre");
  const [teacherName, setTeacherName] = useState<string>("");
  const [teacherMail, setTeacherMail] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [profilePhoto, setProfilePhoto] = useState<string>("");

  //Manejo del campo de nombre
  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  //Manejo del campo de apellido
  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  //Manejo del campo de correo
  const handleMailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMail(event.target.value);
  };

  //Manejo del cambio de semestre
  const handleSemesterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(event.target.value);
  };

  //Manejo del nombre del profesor
  const handleTeacherChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTeacherName(event.target.value);
  };

  //Manejo del correo del profesor
  const handleMailTeacherChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTeacherMail(event.target.value);
  };

  //Manejo de la descripción
  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  //Manejo de las redes sociales
  const handleProfilePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setProfilePhoto(event.target.value);
  };

  return (
    <div className={`col-span-4 ${type === "profile-instructor" ? "md:col-span-3" : "md:col-span-2" }  w-[70%] p-3 md:p-5 flex flex-col justify-center items-center`}>
      <div className="flex items-center justify-between w-full mx-2 p-2">
        <p className="font-bold">Nombre:</p>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          required />
      </div>
      <div className="flex items-center justify-between w-full mx-2 p-2">
        <p className="font-bold">Apellido:</p>
        <input
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
          className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          required />
      </div>
      <div className="flex items-center justify-between w-full mx-2 p-2">
        <p className="font-bold">Correo institucional:</p>
        <input
          type="mail"
          value={mail}
          onChange={handleMailChange}
          className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          required />
      </div>
      <div className="flex items-center justify-between w-full mx-2 p-2">
        <p className="font-bold">Semestre:</p>
        <select value={selectedSemester} onChange={handleSemesterChange} className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]">
          <option value="1">1er semestre</option>
          <option value="2">2do semestre</option>
          <option value="3">3er semestre</option>
          <option value="4">4to semestre</option>
          <option value="5">5to semestre</option>
          <option value="6">6to semestre</option>
          <option value="7">7mo semestre</option>
          <option value="8">8vo semestre</option>
          <option value="9">9no semestre</option>
        </select>
      </div>
      <div className={`flex items-center justify-between w-full mx-2 p-2 ${type === "be-instructor" || type === "profile-instructor" ? "" : "hidden"}`}>
        <p className="font-bold">Profesor que te aprueba:</p>
        <input
          type="text"
          value={teacherName}
          onChange={handleTeacherChange}
          className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          required />
      </div>
      <div className={`flex items-center justify-between w-full mx-2 p-2 ${type === "be-instructor" || type === "profile-instructor" ? "" : "hidden"}`}>
        <p className="font-bold">Correo del profesor:</p>
        <input
          type="mail"
          value={teacherMail}
          onChange={handleMailTeacherChange}
          className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          required />
      </div>
      <div className={`flex items-center justify-between w-full mx-2 p-2 ${type === "profile-instructor" ? "" : "hidden"}`}>
        <p className="font-bold">Descripción:</p>
        <textarea
          onChange={handleDescriptionChange}
          value={description}
          rows={7}
          className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          required />
      </div>
      <div className={`flex items-center justify-between w-full mx-2 p-2 ${type === "profile-instructor" ? "" : "hidden"}`}>
        <p className="font-bold">Foto de perfil:</p>
        <input
          onChange={handleProfilePhotoChange}
          value={profilePhoto}
          type="file"
          className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          required />
      </div>
    </div>
  );
};
export default FormProfile