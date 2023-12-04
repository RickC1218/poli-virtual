"use client";

import { ChangeEvent, useState } from "react";

interface FormProfileProps {
  type: "be-instructor" | "profile" | "profile-instructor";
}

const FormProfile: React.FC<FormProfileProps> = ({ type }) => {

  const [user, setUser] = useState({
    userName: "",
    userLastName: "",
    mail: "",
    semester: "1er semestre",
    teacherName: "",
    teacherMail: "",
    description: "",
    profilePhoto: null
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement) {
      setUser({
        ...user,
        [event.target.name]: event.target.value
      })
    }
  }

/*  const handleFileChange = (event: ChangeEvent<HTMLImageElement>) => {
    if (event.target.image && event.target.image[0]) {
      setUser({
        ...user,
        profilePhoto: event.target.files[0]
      });
    }
  }*/

  return (
    <div className={`col-span-4 ${type === "profile-instructor" ? "md:col-span-3" : "md:col-span-2"} w-[70%] p-3 md:p-5 flex flex-col justify-center items-center`}>
      <div className="flex items-center justify-between w-full mx-2 p-2">
        <p className="font-bold">Nombre:</p>
        <input
          type="text"
          name="userName"
          onChange={handleChange}
          value={user.userName}
          className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          required />
      </div>
      <div className="flex items-center justify-between w-full mx-2 p-2">
        <p className="font-bold">Apellido:</p>
        <input
          type="text"
          name="userLastName"
          onChange={handleChange}
          value={user.userLastName}
          className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          required />
      </div>
      <div className="flex items-center justify-between w-full mx-2 p-2">
        <p className="font-bold">Correo institucional:</p>
        <input
          type="mail"
          name="mail"
          onChange={handleChange}
          value={user.mail}
          className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          required />
      </div>
      <div className="flex items-center justify-between w-full mx-2 p-2">
        <p className="font-bold">Semestre:</p>
        <select onChange={handleChange} value={user.semester} className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]">
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
          name="teacherName"
          onChange={handleChange}
          value={user.teacherName}
          className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          required />
      </div>
      <div className={`flex items-center justify-between w-full mx-2 p-2 ${type === "be-instructor" || type === "profile-instructor" ? "" : "hidden"}`}>
        <p className="font-bold">Correo del profesor:</p>
        <input
          type="mail"
          name="teacherMail"
          onChange={handleChange}
          value={user.teacherMail}
          className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          required />
      </div>
      <div className={`flex items-center justify-between w-full mx-2 p-2 ${type === "profile-instructor" ? "" : "hidden"}`}>
        <p className="font-bold">Descripción:</p>
        <textarea
          onChange={handleChange}
          value={user.description}
          name="description"
          rows={7}
          className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          required />
      </div>
      <div className={`flex items-center justify-between w-full mx-2 p-2 ${type === "profile-instructor" ? "" : "hidden"}`}>
        <p className="font-bold">Foto de perfil:</p>
        <input
          /*onChange={handleFileChange}*/
          /*value={user.profilePhoto}*/
          type="file"
          className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          required />
      </div>
    </div>
  );
};
export default FormProfile