import Image from "next/image";
import Link from "next/link";

import Button from "@/components/buttons/buttons";
import icons from "@/components/icons/icons";

export default function Page() {
  const text = "Iniciar sesión";
  const color = "blue";
  const size = "small";

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
              type="text"
              className="bg-[--white] border border-[--light-gray] rounded-[10px] p-2 text-sm w-[55%]" />
          </div>
          <div className="flex items-center justify-between w-full mx-2 p-2">
            <p className="font-bold">Contraseña:</p>
            <input
              type="password"
              className="bg-[--white] border border-[--light-gray] rounded-[10px] p-2 text-sm w-[55%]" />
          </div>
        <div className="flex items-center justify-center w-full m-5 p-2">
          <Button
            text={text}
            icon={icons.faUser}
            color={color}
            type={size}
          />
        </div>
      </div>
    </div>
  );
}