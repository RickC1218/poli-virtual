import Image from "next/image";
import Link from "next/link";

import Button from "@/components/buttons/Button";
import icons from "@/components/icons/icons";

export default function Page() {
  const text = "Iniciar sesión";
  const color = "blue";
  const size = "small";

  const signinlink = {
    href: "/signin",
    name: "Registrarse",
    label: "Registrarse",
  };

  const forgotlink = {
    href: "/forgot",
    name: "¿Olvidaste tu contraseña?",
    label: "¿Olvidaste tu contraseña?",
  };

  return (
    <div className="h-screen grid grid-cols-4 gap-2 bg-[--white] place-items-center p-10">
      <div className="col-span-2 hidden md:block">
        <Link
          key="Explorar"
          href='/common/explore'
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={300}
            height={212.68}
          />
        </Link>
      </div>
      <div className="col-span-4 md:col-span-2 w-[70%] rounded-[10px] bg-[--light] shadow-md shadow-gray-500/50 p-3 md:p-5 flex flex-col justify-center items-center ">
      <h1 className="text-[38px] mb-5">Inicio de sesión</h1>
          <div className="flex items-center justify-between w-full mx-2 p-2">
            <p className="font-bold">Correo institucional:</p>
            <input
              type="email"
              className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]" />
          </div>
          <div className="flex items-center justify-between w-full mx-2 p-2">
            <p className="font-bold">Contraseña:</p>
            <input
              type="password"
              className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[55%]" />
          </div>
          <Link
            key={forgotlink.name}
            href={forgotlink.href}
            className="flex self-end pr-2 md:flex-none hover:text-[--principal-red] hover:drop-shadow-md"
          >
            {forgotlink.name}
          </Link>
        <div className="flex items-center justify-center w-full m-5 p-2">
          <Link 
            key={text}
            href="/common/explore"
          >
            <Button
              text={text}
              icon={icons.faUser}
              color={color}
              type={size}
            />
          </Link>
        </div>
        <p className="text-base flex">
          ¿Aún no tienes cuenta? &nbsp;
          <Link
            key={signinlink.name}
            href={signinlink.href}
            className="block md:flex-none hover:text-[--principal-blue] hover:drop-shadow"
          >
            {signinlink.name}
          </Link>
        </p>
      </div>
    </div>
  );
}