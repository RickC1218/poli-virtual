"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../buttons/Button";
import Modal from "../tools/Modal";
import icons from "../icons/icons";
import crud_user from "@/app/api/crud_user";

interface FormProfileProps {
  type: "new-user" | "be-instructor" | "profile" | "profile-instructor";
}

// Define the initial state for a new user
const initialUserState = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  role: "student",
  semester: "",
  approve_teacher: "",
  approve_teacher_email: "",
  user_description: "",
  profilePhoto: "",
  score_teacher: 0,
};

const FormProfile: React.FC<FormProfileProps> = ({ type }) => {
  const router = useRouter();

  const loginlink = {
    href: "/login",
    name: "Iniciar sesión",
    label: "Iniciar sesión",
  };

  //manage the modal
  // State variables
  const [isOpen, setIsOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [verification, setVerification] = useState("");
  const [verificationNew, setVerificationNew] = useState("");
  const [user, setUser] = useState(initialUserState);
  const [emailSent, setEmailSent] = useState(false);
  const [selectedProfilePhoto, setSelectedProfilePhoto] = useState<
    "string" | undefined>(undefined);

  useEffect(() => {
    // Load user data from session storage when the component mounts
    //verify user state
    async function fetchData() {
      if (type !== "new-user") {
        const sessionToken = JSON.parse(localStorage.getItem("token") ?? "");
        const storedUser = await crud_user.getUser(sessionToken || "");
        setUser({ ...initialUserState, ...storedUser });
      }
    }

    fetchData();
  }, [type]);

  // Open and close the modal
  const handleOpenModal = () => setIsOpen(true);
  const handleCloseModal = () => setIsOpen(false);

  // Handle inputs changes
  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    if (event.target.name !== "password_new") {
      setUser({
        ...user,
        [event.target.name]: event.target.value,
      });
    } else {
      setUser({
        ...user,
        password: event.target.value,
      });
    }
  };

  // Onchange for the file input
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({
          ...user,
          profilePhoto: reader.result as string, // Mostrar la vista previa de la imagen
        });
        setSelectedProfilePhoto(file as any);
      };
      reader.readAsDataURL(file);
    }
  };

  // verification of change with input of veify password
  const handleVerification = (event: ChangeEvent<HTMLInputElement>) => {
    if (type === "new-user") {
      setVerification(event.target.value);
    } else {
      setVerificationNew(event.target.value);
    }
  };

  //Validating password
  const validatePassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,15}$/;
    return regex.test(password);
  };

  //Alert message
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
      if (
        user.name &&
        user.lastname &&
        user.email &&
        user.semester &&
        user.password &&
        (verification || verificationNew)
      ) {
        //Validate password
        if (validatePassword(user.password)) {
          if (user.password === verification) {
            //Sign up
            message = "Registro exitoso";
            //send the user to the database
            try {
              //sanitize inputs
              user.name = escapeHTML(user.name);
              user.lastname = escapeHTML(user.lastname);
              user.email = escapeHTML(user.email);
              user.password = escapeHTML(user.password);
              user.semester = escapeHTML(user.semester);
              await crud_user.createUser(user);

              // temporal email
              localStorage.setItem("emailVerify", user.email);

              //redirect to the login page
              router.push("/login");
              router.refresh();
            } catch (error) {
              console.error(error);
            }
          } else {
            //Error
            message = "La contraseña y la verificación no coinciden.";
          }
        } else {
          //password error
          message =
            "Contraseña inválida: La contraseña debe tener entre 8 y 15 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un caracter especial.";
        }
      } else {
        message = "Todos los campos deben estar llenos";
      }
      showAlert(message);
      showAlert("Revisa tu correo electrónico para verificar tu cuenta.");
    } catch (error) {
      showAlert("Error al registrar el usuario");
    }
  };

  //sanitize inputs
  const escapeHTML = (unsafe: string): string => {
    return unsafe.replace(/[&<">']/g, (match) => {
      switch (match) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case '"':
          return "&quot;";
        case "'":
          return "&#x27;";
        case ">":
          return "&gt;";
        default:
          return match;
      }
    });
  };

  //obtain session token
  const getToken = async () => {
    const session_token = await JSON.parse(
      localStorage.getItem("token") ?? "{}"
    );
    return session_token;
  };

  //obtain userData
  const getUserData = () => {
    const userData = {
      name: user.name,
      lastname: user.lastname,
      semester: user.semester,
      email: user.email,
      role: user.role,
      approve_teacher: user.approve_teacher,
      approve_teacher_email: user.approve_teacher_email,
      user_description: user.user_description,
      score_teacher: user.score_teacher || 0,
      profilePhoto: user.profilePhoto
    };
    return userData;
  };

  //manage the be instructor button
  const handleBeInstructor = async (e: FormEvent) => {
    try {
      let message = "";
      e.preventDefault();

      // If the email is already sent, do nothing
      if (emailSent) {
        return;
      }

      // obtain the session token from the user object
      const session_token = await getToken();
      // obtain the user data from the user object
      const userData = getUserData();
      // make sure the session token is available
      if (session_token) {
        // update the user
        const response = await crud_user.sendEmailToBeInstructor(
          userData,
          session_token
        );
        message = response;
        showAlert("Comunicate con el profesor para más información");

        setEmailSent(true);

        //update the user in the session storage
        setTimeout(() => {
          handleUpdateProfile(e);
        }, 3000);
      } else {
        message = "Probablemente no has iniciado sesión.";
        showAlert(message);
      }
    } catch (error) {
      showAlert("Error al actualizar el perfil.");
    }
  };

  //manage the update profile button
  const handleUpdateProfile = async (e: FormEvent) => {
    try {
      let message = "";
      e.preventDefault();
      // obtain the session token from the user object
      const session_token = await getToken();
      const userData = getUserData();
      // make sure the session token is available
      if (session_token) {
        // update the user
        const response = await crud_user.updateUser(userData, session_token);
        message = response;
        // update the user in the local storage with token
        const storedUser = await crud_user.getUser(session_token);
        setUser(storedUser);
        // redirect to the explore page
        showAlert(message);
        setTimeout(() => {
          router.push("/common/profile");
          router.refresh();
        }, 5000);
      } else {
        message = "Probablemente no has iniciado sesión.";
        showAlert(message);
      }
    } catch (error) {
      showAlert("Error al actualizar el perfil.");
    }
  };

  const handleUpdatePassword = async (e: FormEvent) => {
    try {
      let message = "";
      e.preventDefault();
      // obtain the session token from the user object
      const session_token = await getToken();
      //Validate password
      if (validatePassword(user.password)) {
        if (user.password === verificationNew) {
          const userData = {
            password: user.password,
          };
          // make sure the session token is available
          if (session_token) {
            // update the user
            const response = await crud_user.updatePassword(
              userData,
              session_token
            );
            message = response;
            // redirect to the explore page
            showAlert("Contraseña actualizada");

            setTimeout(() => {
              handleCloseModal();
              router.push("/common/profile");
              router.refresh();
            }, 3000);
          } else {
            message = "Probablemente no has iniciado sesión.";
          }
        } else {
          //Error
          message = "La contraseña y la verificación no coinciden.";
        }
        showAlert(message);
      } else {
        //password error
        message =
          "Contraseña inválida: La contraseña debe tener entre 8 y 15 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un caracter especial.";
        showAlert(message);
      }
    } catch (error) {
      showAlert("Error al actualizar la contraseña.");
    }
  };

  //manage the logout button
  const handleLogOut = async (e: FormEvent) => {
    try {
      let message = "";
      e.preventDefault();
      const session_token = await getToken();
      const userData = getUserData();
      // make sure the session token is available
      if (session_token) {
        //Logout
        await crud_user.logout(userData, session_token);
        //Remove the token
        localStorage.removeItem("token");
        //closing the session
        message = "Cerrando sesión...";
        showAlert(message);
        // Introduce a delay using setTimeout
        setTimeout(() => {
          // Redirect to the explore page after the delay
          router.push("/login");
          router.refresh();
        }, 3000);
      } else {
        message = "Probablemente no has iniciado sesión.";
        showAlert(message);
      }
    } catch (error) {
      showAlert("Error al cerrar sesión.");
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className={`${
        type === "new-user"
          ? "col-span-4 md:col-span-2 w-[70%] rounded-[10px] bg-[--light] shadow-md shadow-gray-500/50"
          : "col-span-3 md:col-span-3 w-full "
      } p-3 md:p-5 flex flex-col justify-center items-center`}
    >
      <h1 className={`text-[38px] ${type === "new-user" ? "" : "hidden"}`}>
        Registrarse
      </h1>
      <div
        className={`${
          user.role === "instructor" ? "md:col-span-3" : "md:col-span-2"
        } w-full p-3 flex flex-col justify-center items-center`}
      >
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Nombre:</p>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={user.name}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
            required
            disabled={type === "be-instructor"}
          />
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Apellido:</p>
          <input
            type="text"
            name="lastname"
            onChange={handleChange}
            value={user.lastname}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
            required
            disabled={type === "be-instructor"}
          />
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Correo institucional:</p>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={user.email}
            className={`bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%] ${
              type === "new-user" ? "" : "disabled cursor-not-allowed "
            }`}
            readOnly={type !== "new-user"}
            required
            disabled={type === "be-instructor"}
          />
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Semestre:</p>
          <select
            name="semester"
            onChange={handleChange}
            value={user.semester}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
            disabled={type === "be-instructor"}
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
        <div
          className={`flex items-center justify-between w-full mx-2 p-2 ${
            type === "new-user" ? "" : "hidden"
          }`}
        >
          <p className="font-bold">Contraseña:</p>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={user.password}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
            required={type === "new-user"}
          />
        </div>
        <div
          className={`flex items-center justify-between w-full mx-2 p-2 ${
            type === "new-user" ? "" : "hidden"
          }`}
        >
          <p className="font-bold">Verificación:</p>
          <input
            type="password"
            name="verification"
            onChange={handleVerification}
            value={verification}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
            required={type === "new-user"}
          />
        </div>
        <div
          className={`flex items-center justify-center w-full m-5 p-2 ${
            type === "new-user" ? "" : "hidden"
          }`}
        >
          <Button
            text="Registrarse"
            icon={icons.faRightToBracket}
            color="red"
            type="small"
          />
        </div>
        <p className={`text-base flex ${type === "new-user" ? "" : "hidden"}`}>
          ¿Ya tienes cuenta? &nbsp;
          <Link
            key={loginlink.name}
            href={loginlink.href}
            className="block md:flex-none hover:text-[--principal-blue] hover:drop-shadow"
          >
            {loginlink.name}
          </Link>
        </p>
        {alertMessage && (
          <div className={`${type === "new-user" ? "" : "hidden"}`}>
            <div
              className={`${
                alertMessage.startsWith("Registro exitoso") ||
                alertMessage.startsWith(
                  "Revisa tu correo electrónico para verificar tu cuenta."
                )
                  ? "bg-green-500"
                  : "bg-red-500"
              } z-40 text-[--light] p-2 rounded-md text-center`}
            >
              {alertMessage}
            </div>
          </div>
        )}
        <div
          className={`flex items-center justify-between w-full mx-2 p-2 ${
            type === "be-instructor" || user.role === "instructor"
              ? ""
              : "hidden"
          }`}
        >
          <p className="font-bold">Profesor que te aprueba:</p>
          <input
            type="text"
            name="approve_teacher"
            onChange={handleChange}
            value={user.approve_teacher ? user.approve_teacher : ""}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
            required={type === "be-instructor" || user.role === "instructor"}
          />
        </div>
        <div
          className={`flex items-center justify-between w-full mx-2 p-2 ${
            type === "be-instructor" || user.role === "instructor"
              ? ""
              : "hidden"
          }`}
        >
          <p className="font-bold">Correo del profesor:</p>
          <input
            type="email"
            name="approve_teacher_email"
            onChange={handleChange}
            value={user.approve_teacher_email ? user.approve_teacher_email : ""}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
            required={type === "be-instructor" || user.role === "instructor"}
          />
        </div>
        <div
          className={`py-10 col-span-4 flex items-center justify-center ${
            type === "be-instructor" ? "" : "hidden"
          } space-y-2 md:space-x-8 md:space-y-0`}
        >
          <Link
            key="sendMail"
            href="/common/profile"
            className={`p-2 md:p-0${!emailSent ? "" : "hidden"}`}
            onClick={handleBeInstructor}
          >
            <Button
              text="Enviar correo"
              icon={icons.faChevronRight}
              color="blue"
              type="small"
            />
          </Link>
        </div>
        {alertMessage && (
          <div className={`${type === "be-instructor" ? "" : "hidden"}`}>
            <div
              className={`${
                alertMessage.startsWith(
                  "Comunicate con el profesor para más información"
                )
                  ? "bg-green-500"
                  : "bg-red-500"
              } z-40 text-[--light] p-2 rounded-md text-center`}
            >
              {alertMessage}
            </div>
          </div>
        )}
        <div
          className={`flex items-center justify-between w-full mx-2 p-2 ${
            user.role === "instructor" ? "" : "hidden"
          }`}
        >
          <p className="font-bold">Descripción:</p>
          <textarea
            onChange={handleChange}
            value={user.user_description ? user.user_description : ""}
            name="user_description"
            rows={7}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
            required={user.role === "instructor"}
          />
        </div>
        <div
          className={`flex items-center justify-between w-full mx-2 p-2 ${
            user.role === "instructor" ? "" : "hidden"
          }`}
        >
          <p className="font-bold">Foto de perfil:</p>
          <input
            onChange={handleFileChange}
            type="file"
            accept="image/*"
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
          />
        </div>
      </div>
      {alertMessage && !isOpen && (
        <div
          className={`${
            type === "profile" || "profile-instructor" ? "" : "hidden"
          }`}
        >
          <div
            className={`${
              alertMessage.startsWith("Usuario actualizado") ||
              alertMessage.startsWith("Contraseña actualizada")
                ? "bg-green-500 text-[--light]"
                : "bg-yellow-500 text-[--gray]"
            } z-40 p-2 rounded-md text-center`}
          >
            {alertMessage}
          </div>
        </div>
      )}
      <div
        className={`py-10 col-span-4 flex items-center justify-center flex-wrap md:flex-nowrap md:space-x-8 md:space-y-1 ${
          type !== "new-user" && type !== "be-instructor" ? "" : "hidden"
        }`}
      >
        <Link
          key="SignOut"
          href="/login"
          className={`p-2 md:p-0`}
          onClick={handleLogOut}
        >
          <Button
            text="Cerrar sesión"
            icon={icons.faRightToBracket}
            color="red"
            type="big"
          />
        </Link>
        <Link
          key="Explore"
          href="/common/profile"
          className={`p-2 md:p-0`}
          onClick={handleUpdateProfile}
        >
          <Button
            text="Guardar cambios"
            icon={icons.faFloppyDisk}
            color="blue"
            type="big"
          />
        </Link>
        <Button
          text="Cambiar contraseña"
          icon={icons.faLock}
          color="neutral"
          type="big"
          onClick={handleOpenModal}
        />
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
          <div className="col-span-4 md:col-span-2 w-[100%] rounded-[10px] bg-[--light] shadow-md shadow-gray-500/50 p-5 flex flex-col justify-center items-center">
            <h1 className="text-[38px] mb-5 text-center">
              Cambio de contraseña
            </h1>
            <div className="flex items-center justify-between w-full mx-2 p-2">
              <p className="font-bold">Nueva contraseña:</p>
              <input
                type="password"
                name="password_new"
                onChange={handleChange}
                className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
                required
              />
            </div>
            <div className="flex items-center justify-between w-full mx-2 p-2">
              <p className="font-bold">Verificación:</p>
              <input
                type="password"
                name="verificationNew"
                onChange={handleVerification}
                className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]"
              />
            </div>
            {alertMessage && isOpen && (
              <div
                className={`${
                  type === "profile" || type === "profile-instructor"
                    ? ""
                    : "hidden"
                }`}
              >
                <div
                  className={`${
                    alertMessage.startsWith("Contraseña actualizada")
                      ? "bg-green-500 text-[--light]"
                      : "bg-yellow-500 text-[--gray]"
                  } z-40 p-2 rounded-md text-center`}
                >
                  {alertMessage}
                </div>
              </div>
            )}
            <div className="flex items-center justify-center w-full m-5 p-2">
              <Link onClick={handleUpdatePassword} href="/common/profile">
                <Button
                  text="Cambiar contraseña"
                  icon={icons.faLock}
                  color="red"
                  type="small"
                />
              </Link>
            </div>
          </div>
        </Modal>
      </div>
      <Link
        key="newCourse"
        href="/common/create-course"
        className={`p-2 md:p-0 ${user.role === "instructor" ? "" : "hidden"}`}
      >
        <Button
          text="Crear un curso"
          icon={icons.faBookOpen}
          color="neutral"
          type="big"
        />
      </Link>
    </form>
  );
};
export default FormProfile;
