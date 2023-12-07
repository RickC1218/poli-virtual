"use client";

import { ChangeEvent, useEffect, useState } from "react";

import { useRouter, useParams } from "next/navigation";

import crud_user from "@/app/api/crud_user"

interface FormProfileProps {
  type: "be-instructor" | "profile" | "profile-instructor";
}

const FormProfile: React.FC<FormProfileProps> = ({ type }) => {

  const email = "ricardo.erazo@epn.edu.ec";
  const params = useParams();
  
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    semester: "",
    approve_teacher: "",
    approve_teacher_email: "",
    user_description: "",
    //profilePhoto: ""
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement) {
      setUser({
        ...user,
        [event.target.name]: event.target.value
      })
    }
  }

  useEffect(() => {
    console.log(params);
    const fetchUser = async () => {
      try {
        const userData = await crud_user.getUser(email);
        console.log(userData);
        setUser({
          ...user,
          name: userData.name,
          lastname: userData.lastname,
          email: userData.email,
          semester: userData.semester,
          approve_teacher: userData.approve_teacher,
          approve_teacher_email: userData.approve_teacher_email,
          user_description: userData.user_description,
          // profilePhoto: userData.profilePhoto,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);
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
          name="name"
          onChange={handleChange}
          value={user.name}
          className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          required />
      </div>
      <div className="flex items-center justify-between w-full mx-2 p-2">
        <p className="font-bold">Apellido:</p>
        <input
          type="text"
          name="lastname"
          onChange={handleChange}
          value={user.lastname}
          className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          required />
      </div>
      <div className="flex items-center justify-between w-full mx-2 p-2">
        <p className="font-bold">Correo institucional:</p>
        <input
          type="mail"
          name="mail"
          onChange={handleChange}
          value={user.email}
          className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          required />
      </div>
      <div className="flex items-center justify-between w-full mx-2 p-2">
        <p className="font-bold">Semestre:</p>
        <select onChange={handleChange} value={user.semester} className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]">
          <option value="1ro">1er semestre</option>
          <option value="2do">2do semestre</option>
          <option value="3ro">3er semestre</option>
          <option value="4to">4to semestre</option>
          <option value="5to">5to semestre</option>
          <option value="6to">6to semestre</option>
          <option value="7mo">7mo semestre</option>
          <option value="8vo">8vo semestre</option>
          <option value="9no">9no semestre</option>
        </select>
      </div>
      <div className={`flex items-center justify-between w-full mx-2 p-2 ${type === "be-instructor" || type === "profile-instructor" ? "" : "hidden"}`}>
        <p className="font-bold">Profesor que te aprueba:</p>
        <input
          type="text"
          name="teacherName"
          onChange={handleChange}
          value={user.approve_teacher}
          className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          required />
      </div>
      <div className={`flex items-center justify-between w-full mx-2 p-2 ${type === "be-instructor" || type === "profile-instructor" ? "" : "hidden"}`}>
        <p className="font-bold">Correo del profesor:</p>
        <input
          type="mail"
          name="teacherMail"
          onChange={handleChange}
          value={user.approve_teacher_email}
          className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          required />
      </div>
      <div className={`flex items-center justify-between w-full mx-2 p-2 ${type === "profile-instructor" ? "" : "hidden"}`}>
        <p className="font-bold">Descripción:</p>
        <textarea
          onChange={handleChange}
          value={user.user_description}
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
export default FormProfile;