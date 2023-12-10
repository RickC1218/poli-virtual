"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import crud_user from "@/app/api/crud_user"
import Button from "./buttons/Button";
import Link from "next/link";
import icons from "./icons/icons";

interface FormProfileProps {
  type: "new-user" | "be-instructor" | "profile" | "profile-instructor";
}

const FormProfile: React.FC<FormProfileProps> = ({ type }) => {

  const router = useRouter();

  const loginlink = {
    href: "/login",
    name: "Iniciar sesión",
    label: "Iniciar sesión",
  };

  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    role: "student",
    semester: "",
    approve_teacher: "",
    approve_teacher_email: "",
    user_description: "",
    session_token: "",
    //profilePhoto: ""
  });

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("currentUser") ?? "{}");
    setUser({
      ...user,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      role: user.role,
      semester: user.semester,
      approve_teacher: user.approve_teacher,
      approve_teacher_email: user.approve_teacher_email,
      user_description: user.user_description,
      session_token: user.session_token,
      //profilePhoto: user.profilePhoto
    });
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  }

  /*  const handleFileChange = (event: ChangeEvent<HTMLImageElement>) => {
    if (event.target.image && event.target.image[0]) {
      setUser({
        ...user,
        profilePhoto: event.target.files[0]
      });
    }
  }*/

  const [verification, setVerification] = useState("")

  const handleVerification = (event: ChangeEvent<HTMLInputElement>) => {
    setVerification(event.target.value)
  }

  //Validating password
  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).$/;
    return regex.test(password);
  }

  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const showAlert = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000); // close the alert after 3 seconds
  };

  //manage the register button
  const handleRegister = async (e: FormEvent) => {
    try {
      const role = "student";
      user.role = role;
      let message = "";
      e.preventDefault();
      // verify that all fields are filled
      if (user.name && user.lastname && user.email && user.semester && user.password && verification) {
        //Validate password
        if (validatePassword(user.password)) {
          if (user.password === verification) {
            //Sign up
            message = "Registro exitoso";
            //send the user to the database
            try {
              const response = await crud_user.createUser(user);
              console.log(response);
              //Send email verification
              //const resEmail = await crud_user.emailVerification(user.email);
              //console.log(resEmail);
              //localStorage.setItem("email", JSON.stringify(user.email));
              //console.log(localStorage.getItem("email"));
              //redirect to the login page
              router.push("/login");
              router.refresh();
            } catch (error) {
              console.log(error);
            }
          } else {
            //Error
            message = "La contraseña y la verificación no coinciden";
          }
        } else {
          //password error
          message = "Contraseña inválida: La contraseña debe tener entre 8 y 15 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un caracter especial";
        }
      } else {
        message = "Todos los campos deben estar llenos";
      }
      showAlert(message);
    } catch (error) {
      showAlert("Error al registrar el usuario");
    }
  }

  //manage the update profile button
  const handleUpdateProfile = async (e: FormEvent) => {
    try {
      e.preventDefault();
      // obtain the session token from the user object
      const session_token = user.session_token;
      
      // make sure the session token is available
      if (session_token) {
        // update the user
        const response = await crud_user.updateUser(user, session_token);
        console.log(response);
        // update the user in the session storage
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        // redirect to the explore page
        router.push("/common/profile");
        router.refresh();
      } else {
        console.error('No hay token disponible. El usuario probablemente no ha iniciado sesión.');
      }
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  //manage the logout button
  const handleLogOut = async (e: FormEvent) => {
    try {
      e.preventDefault();
      //Logout
      const response = await crud_user.logout(user);
      console.log(response);
      //redirect to the explore page
      router.push("/common/explore");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleRegister} className={`col-span-4 md:col-span-2 ${type === 'new-user' ? 'w-[70%] rounded-[10px] bg-[--light] shadow-md shadow-gray-500/50' : 'w-full'} p-3 md:p-5 flex flex-col justify-center items-center`}>
      <h1 className={`text-[38px] ${type === 'new-user' ? '' : 'hidden'}`}>Registrarse</h1>
      <div className={`${type === "profile-instructor" ? "md:col-span-3" : "md:col-span-2"} w-full p-3 flex flex-col justify-center items-center`}>
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
            type="email"
            name="email"
            onChange={handleChange}
            value={user.email}
            className={`bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%] ${type === 'new-user' ? '' : 'disabled cursor-not-allowed '}`}
            readOnly={type !== 'new-user'}
            required />
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Semestre:</p>
          <select
            name="semester"
            onChange={handleChange}
            value={user.semester}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          >
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
        <div className={`flex items-center justify-between w-full mx-2 p-2 ${type === 'new-user' ? '' : 'hidden'}`}>
          <p className="font-bold">Contraseña:</p>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
            required />
        </div>
        <div className={`flex items-center justify-between w-full mx-2 p-2 ${type === 'new-user' ? '' : 'hidden'}`}>
          <p className="font-bold">Verificación:</p>
          <input
            type="password"
            name="verification"
            onChange={handleVerification}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
            required />
        </div>
        <div className={`flex items-center justify-center w-full m-5 p-2 ${type === 'new-user' ? '' : 'hidden'}`}>
          <Button
            text="Registrarse"
            icon={icons.faRightToBracket}
            color="red"
            type="small"
          />
        </div>
        <p className={`text-base flex ${type === 'new-user' ? '' : 'hidden'}`}>
          ¿Ya tienes cuenta? &nbsp;
          <Link
            key={loginlink.name}
            href={loginlink.href}
            className="block md:flex-none hover:text-[--principal-blue] hover:drop-shadow"
          >
            {loginlink.name}
          </Link>
        </p>
        <div className={`flex items-center justify-between w-full mx-2 p-2 ${type === "be-instructor" || type === "profile-instructor" ? "" : "hidden"}`}>
          <p className="font-bold">Profesor que te aprueba:</p>
          <input
            type="text"
            name="approve_teacher"
            onChange={handleChange}
            value={user.approve_teacher ? user.approve_teacher : ""}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          />
        </div>
        <div className={`flex items-center justify-between w-full mx-2 p-2 ${type === "be-instructor" || type === "profile-instructor" ? "" : "hidden"}`}>
          <p className="font-bold">Correo del profesor:</p>
          <input
            type="email"
            name="approve_teacher_email"
            onChange={handleChange}
            value={user.approve_teacher_email ? user.approve_teacher_email : ""}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          />
        </div>
        <div className={`py-10 col-span-4 flex items-center justify-center ${type === 'be-instructor' ? '' : 'hidden'} space-y-2 md:space-x-8 md:space-y-0`}>
          <Link
            key="sendMail"
            href="/"
          >
            <Button
              text="Enviar correo"
              icon={icons.faChevronRight}
              color="blue"
              type="small"
            />
          </Link>
        </div>
        <div className={`flex items-center justify-between w-full mx-2 p-2 ${type === "profile-instructor" ? "" : "hidden"}`}>
          <p className="font-bold">Descripción:</p>
          <textarea
            onChange={handleChange}
            value={user.user_description ? user.user_description : ""}
            name="user_description"
            rows={7}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          />
        </div>
        <div className={`flex items-center justify-between w-full mx-2 p-2 ${type === "profile-instructor" ? "" : "hidden"}`}>
          <p className="font-bold">Foto de perfil:</p>
          <input
            /*onChange={handleFileChange}*/
            /*value={user.profilePhoto}*/
            type="file"
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          />
        </div>
      </div>
      <div className={`py-10 col-span-4 flex items-center justify-center flex-wrap md:flex-nowrap md:space-x-8 md:space-y-1 ${(type !== 'new-user' && type !== 'be-instructor') ? '' : 'hidden'}`}>
        <Link key="SignOut" href="/common/explore" className={`p-2 md:p-0`} onClick={handleLogOut}>
          <Button
            text="Cerrar sesión"
            icon={icons.faRightToBracket}
            color="red"
            type="big"
          />
        </Link>
        <Link key="Explore" href="/common/profile" className={`p-2 md:p-0`} onClick={handleUpdateProfile}>
          <Button
            text="Guardar cambios"
            icon={icons.faFloppyDisk}
            color="blue"
            type="big"
          />
        </Link>
        <Link key="newCourse" href="/common/categories/category/course" className={`p-2 md:p-0 ${type === "profile-instructor" ? '' : 'hidden'}`}>
          <Button
            text="Crear un curso"
            icon={icons.faBookOpen}
            color="neutral"
            type="big"
          />
        </Link>
      </div>
      {alertMessage && (
        <div className={`${alertMessage.startsWith("Registro exitoso") ? 'bg-green-500' : 'bg-red-500'} z-40 text-[--gray] p-2 rounded-md mb-4`}>
          {alertMessage}
        </div>
      )}
    </form>
  );
};
export default FormProfile;